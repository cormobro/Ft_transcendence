from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.core import serializers
from django.contrib import messages
from .models import Player, Tournament, Match
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.hashers import make_password, check_password
from datetime import datetime, timedelta
from django.db import IntegrityError, connection, models
from django.db.models import Count, Q, Sum, Case, When, F


import requests
import json
import os

@csrf_protect
def home(request):
    return render(request, 'polls/index.html')

@csrf_protect
def manage_42_api_step1(request):

    client_id = os.getenv('API_CLIENT_ID')
    redirect_uri = 'http://localhost:8000/api_code'
    state = os.getenv('API_PROTECTION_STRING')
    scope = "public"
    auth_url = (
            f"https://api.intra.42.fr/oauth/authorize"
            f"?client_id={client_id}"
            f"&redirect_uri={redirect_uri}"
            f"&response_type=code"
            f"&scope={scope}"
            f"&state={state}"
            )

    return redirect(auth_url)

@csrf_protect
def manage_42_api_step2(request):
    code = request.GET.get('code')
    state = request.GET.get('state')
    if state != os.getenv('API_PROTECTION_STRING'):
        return JsonResponse({'error': 'Wrong state, third party intrusion'}, status=400)
    elif code:
        return manage_42_api_step3(code, state, request)
    else:
        return JsonResponse({'error': 'No code returned'}, status=400)

def manage_42_api_step3(code, state, request):
    client_id = os.getenv('API_CLIENT_ID')
    client_secret = os.getenv('API_CLIENT_SECRET')
    redirect_uri = 'http://localhost:8000/api_code'
    grant_type = "authorization_code"

    data = {
            'grant_type': grant_type,
            'client_id': client_id,
            'client_secret': client_secret,
            'code': code,
            'redirect_uri': redirect_uri,
            'state': state,
            }

    response = requests.post("https://api.intra.42.fr/oauth/token", data=data)

    request_info = f"""
    Request Method: {response.request.method}
    Request URL: {response.request.url}
    Request Headers: {response.request.headers}
    Request Body: {response.request.body}
    """
    if response.status_code == 302 or response.status_code == 301 or response.status_code == 200:
        token_data = response.json()
        access_token = token_data.get('access_token')
        # return HttpResponse(f"The token is {access_token}")
        return use_access_token(access_token, request)
    else:
        return HttpResponse(response)
        #return HttpResponse(f"Error code : {response.status_code} and code was {code}")

def use_access_token(access_token, request):
    api_url = "https://api.intra.42.fr/v2/me"
    headers = {
        'Authorization': f'Bearer {access_token}',
    }

    response = requests.get(api_url, headers=headers)

    if response.status_code == 200:
        user_data = response.json()
        username_42 = user_data.get('login')
        username = request.session.get('username')
        player = Player.objects.get(username=username)
        player.linked_42_acc = username_42
        try:
            player.save()
            message = "Account linked succesfully"
        except IntegrityError:
            message = "This 42 acc is already linked to another player"
        return render(request, 'polls/index.html', {'message': message})
    else:
        request_info = f"""
        Request Method: {response.request.method}
        Request URL: {response.request.url}
        Request Headers: {response.request.headers}
        Request Body: {response.request.body}
        """
        return HttpResponse(f"ERROR code is {response.status_code}. The request was {request_info}")


@csrf_protect
def manage_request(request):
    return render(request, 'polls/index.html')


@csrf_protect
def create_account(request):
    if request.method == 'POST':
        try:
            data = request.POST
            username = data.get('username')
            password = data.get('password')
            if not username or not password:
                message = "Username and password required"
            else:
                new_player = Player(username=username)
                new_player.set_password(password)
                new_player.logged_in = True
                new_player.matches_won = 0
                new_player.save()
                message = "account created"
                request.session['user_id'] = new_player.id
                request.session['username'] = new_player.username
                # return HttpResponse("3")
        except IntegrityError:
            message = "Ce nom d'utilisateur existe déjà"
    else:
        message = "Wrong request method"

    return render(request, 'polls/index.html', {'message': message})

@csrf_protect
def log_in(request):
    if request.method == 'POST':
        data = request.POST
        username = data.get('username')
        password = data.get('password')
        if not username or not password:
            message = "Username and password required"
            # return HttpResponse("1")
        elif Player.objects.filter(username=username).exists():
            player = Player.objects.get(username=username)
            if check_password(password, player.password):
                request.session['user_id'] = player.id
                request.session['username'] = player.username
                player.logged_in = True
                player.save()

                message = "Logged in"
            else:
                message = "Wrong password"
            # return HttpResponse("2")
        else:
            message = "This account does not exist"
    else:
        message = "Wrong request method"
    return render(request, 'polls/index.html', {'message': message})
@csrf_protect
def logout(request):
    user_id = request.session.get('user_id')
    if user_id:
        player = Player.objects.get(id=user_id)
        player.logged_in = False
        player.save()
        del request.session['user_id']
        del request.session['username']
    return render(request, 'polls/index.html', {'message': "Vous avez été déconnecté."})

@csrf_protect
def tournament_end(request):
    if request.method == 'POST':
        try:
            if not request.session.get('user_id'):
                return JsonResponse({'error': 'Unauthorized action'}, status=405)
            else:
                data = json.loads(request.body)
                winner = data[0]
                matches_data = data[1:]
                tournament = Tournament(winner=winner)
                for match_info in matches_data:
                    player1 = match_info[0]
                    player2 = match_info[1]
                    mode = match_info[2]
                    winner = match_info[3]
                    player1_points = match_info[4]
                    player2_points = match_info[5]
                    date = data[6]
                    duration = data[7]

                    match = Match(
                            player1=player1,
                            player2=player2,
                            mode=mode,
                            winner=winner,
                            player1_points=player1_points,
                            player2_points=player2_points,
                            date=date,
                            duration=duration
                            )
                    match.save()
                    tournament.matchs.add(match)
                    if player1 == request.session['username']:
                        Player.objects.get(username=player1).matches.add(match)
                tournament.save()
                Player.objects.get(username=request.session['username']).tournaments.add(tournament)
                return JsonResponse({'message': 'Enregistré'}, status=200)
        except IndexError as e:
            return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'invalid JSON'}, status=400)


    return JsonResponse({'error: Unauthorized action'}, status=405)

# dans cette requete il y aura toute les infos sur les tournois
    # on l'occurence les matchs/leurs données, dans l'ordre dans lequel
    # ils ont été joués
    # ajouter ce tournoi à la liste des tournois du joueur 1

@csrf_protect
def match_end(request):
    if request.method == 'POST':
        try:
            if not request.session.get('user_id'):
                return JsonResponse({'error': 'Unauthorized action'}, status=405)
            else:
                data = json.loads(request.body)
                player1 = data[0]
                player2 = data[1]
                mode = data[2]
                winner = data[3]
                player1_points = data[4]
                player2_points = data[5]
                date = data[6]
                duration = data[7]

                # date = datetime.strptime(date_str, '%Y-%m-%dT%H:%M:%S.%fZ').date()
                # duration = timedelta(seconds=float(duration_numeric))
                match = Match(
                        player1=player1,
                        player2=player2,
                        mode=mode,
                        winner=winner,
                        player1_points=player1_points,
                        player2_points=player2_points,
                        date=date,
                        match_time=duration
                        )	
                match.save()
                Player.objects.get(username=request.session["username"]).matches.add(match)
                if winner == request.session['username']:
                    player = Player.objects.get(username=request.session['username'])
                    player.matches_won += 1
                    player.save()

                return JsonResponse({'message': winner + request.session['username']}, status=200)
        except IndexError as e:
            return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'invalid JSON'}, status=400)
    return JsonResponse({'error': 'Unauthorized action'}, status=405)

@csrf_protect
def get_best_players(request):
    if request.method == 'POST':
        try:
            if not request.session.get('user_id'):
                return JsonResponse({'error': 'Unauthorized action'}, status=405)
            players = Player.objects.annotate(
                matches_won_count=Count('matches', filter=Q(matches__winner=models.F('username')))
            ).order_by('-matches_won_count')[0:10]
            players_data = [{'username': player.username, 'matches_won': player.matches_won_count} for player in players]
            return JsonResponse({'message': players_data}, status=200)
        except IndexError as e:
            return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

    return JsonResponse({'error': 'Unauthorized action'}, status=405)

#@csrf_protect
#def get_global_stats(request):
#    if request.method == 'POST':
#        try:
#            if not request.session.get('user_id'):
#                return JsonResponse({'error': 'Unauthorized action'}, status=405)
#            players = Player.objects.get(username=request.session.get['username']).matches.annotate
#            players = Player.objects.annotate(
#                matches_won_count=Count('matches', filter=Q(matches__winner=models.F('username')))
#            ).order_by('-matches_won_count')[0:10]
#            player_data = [{'username': player.username, 'matches_won': player.matches_won_count} for player in players]
#            return JsonResponse({'message': player_data}, status=200)
#        except IndexError as e:
#            return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
#        except json.JSONDecodeError:
#            return JsonResponse({'error': 'Invalid JSON'}, status=400)
#
#    return JsonResponse({'error': 'Unauthorized action'}, status=405)

@csrf_protect
def get_global_stats(request):
    if request.method == 'POST':
        try:
            # Check if user is logged in
            if not request.session.get('user_id'):  # Assuming 'user_id' is used to track logged-in users
                return JsonResponse({'error': 'User is not logged in'}, status=405)
            data = json.loads(request.body)
            player_username = data[0]
            if not Player.objects.filter(username=player_username).exists()
                return JsonResponse({'error': 'User is not assigned'}, status=405)
            getmatches = Match.objects.filter(Q(player1=player_username))
            wins = matches.filter(winner=player_username).count()
            losses = matches.exclude(winner=player_username).count()
            total_points_won = 0
            total_points_lost = 0
            for match in matches:
                total_points_won += match.player1_points
                total_points_lost += match.player2_points

            player_data = {
                'pointsWon': total_points_won,
                'pointsLost': total_points_lost,
                'pointsPlayed': total_points_won + total_points_lost,
                'matchesWon': wins,
                'matchesLost': losses,
                'matchesPlayed': wins + losses
            }
            return JsonResponse({'message': player_data}, status=200)
        except IndexError as e:
            return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

    return JsonResponse({'error': 'Unauthorized action'}, status=405)

#@csrf_protect
#def get_solo_stats(request):
#    return JsonResponse({'error': 'Unauthorized method'}, status=405)

#@csrf_protect
#def get_duo_stats(request):
#    return JsonResponse({'error': 'Unauthorized method'}, status=405)

#@csrf_protect
#def get_tournament_stats(request):
#    return JsonResponse({'error': 'Unauthorized method'}, status=405)

@csrf_protect
def get_victories(request):
    if request.method == 'POST':
        try:
            # Check if user is logged in
            if not request.session.get('user_id'):  # Assuming 'user_id' is used to track logged-in users
                return JsonResponse({'error': 'User is not logged in'}, status=405)
            data = json.loads(request.body)
            player_username = data[0]
            if not Player.objects.filter(username=player_username).exists()
                return JsonResponse({'error': 'User is not assigned'}, status=405)
            matches = Match.objects.filter(Q(player1=player_username))
            wins = matches.filter(winner=player_username).count()
            player_data = {
                'matchesWon': wins
            }
            return JsonResponse({'message': player_data}, status=200)
        except IndexError as e:
            return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

    return JsonResponse({'error': 'Unauthorized action'}, status=405)

@csrf_protect
def get_defeats(request):
    if request.method == 'POST':
        try:
            # Check if user is logged in
            if not request.session.get('user_id'):  # Assuming 'user_id' is used to track logged-in users
                return JsonResponse({'error': 'User is not logged in'}, status=405)
            data = json.loads(request.body)
            player_username = data[0]
            if not Player.objects.filter(username=player_username).exists()
                return JsonResponse({'error': 'User is not assigned'}, status=405)
            matches = Match.objects.filter(Q(player1=player_username))
            losses = matches.exclude(winner=player_username).count()
            player_data = {
                'matchesLost': losses
            }
            return JsonResponse({'message': player_data}, status=200)
        except IndexError as e:
            return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

    return JsonResponse({'error': 'Unauthorized action'}, status=405)

#@csrf_protect
#def get_victories_mode(request):
#    return JsonResponse({'error': 'Unauthorized method'}, status=405)

#@csrf_protect
#def get_points_by_match(request):
#    return JsonResponse({'error': 'Unauthorized method'}, status=405)

@csrf_protect
def get_match_stats(request):
    if request.method == 'POST':
        try:
            if not request.session.get('user_id'):
                return JsonResponse({'error': 'Unauthorized action'}, status=405)
            else:
                data = json.loads(request.body)
                username = data[0]
                if not username:
                    return JsonResponse({'error': 'Username argument is missing'}, status=200)
                elif Player.objects.filter(username=username).exists():
                    player = Player.objects.filter(username=username)
                    return JsonResponse({'message': serializers.serialize('json', Match.objects.all())}, status=200)
                else:
                    return JsonResponse({'error': 'Unassigned user account'}, status=200)
        except IndexError as e:
            return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)


@csrf_protect
def is_user_signed_in(request):
    if request.method == 'POST':
        try: 
            data = json.loads(request.body)
            username = data[0]
            if not username:
                return JsonResponse({'error': 'Username argument is missing'}, status=200)
            elif Player.objects.filter(username=username).exists():
                player = Player.objects.get(username=username)
                if player.logged_in == True:
                    return JsonResponse({'message': 'True'}, status=200)
                else:
                    return JsonResponse({'message': 'False'}, status=200)
            #else:
             #   return JsonResponse({'error': 'This username is not assigned'}, status=200)
        except IndexError as e:
            return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'invalid JSON'}, status=400)
    return JsonResponse({'error': 'Unauthorized method'}, status=405)
#@csrf_protect
#def get_avatar(request):
#    return JsonResponse({'error': 'Unauthorized method'}, status=405)

#@csrf_protect
#def post_avatar(request):
#    return JsonResponse({'error': 'Unauthorized method'}, status=405)

@csrf_protect
def get_requests(request):
    if request.method == 'POST':
        try:
            if not request.session.get('user_id'):
                return JsonResponse({'error': 'Unauthorized action'}, status=405)
            elif request.session['username']:
                username = request.session['username']
                player = Player.objects.get(username=username)
                return JsonResponse({'message': serializers.serialize('json', player.friends_request.all().values('username'))}, status=200)
            #else:
             #   return JsonResponse({'error': 'Unauthorized action'}, status=200)
        except IndexError as e:
            return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
    return JsonResponse({'error': 'Unauthorized method'}, status=405)

#@csrf_protect
#def post_accept_request(request):
#    return JsonResponse({'error': 'Unauthorized method'}, status=405)

#@csrf_protect
#def post_decline_request(request):
#    return JsonResponse({'error': 'Unauthorized method'}, status=405)

#@csrf_protect
#def post_remove_friend(request):
#    return JsonResponse({'error': 'Unauthorized method'}, status=405)

#@csrf_protect
#def post_add_friend(request):
#    return JsonResponse({'error': 'Unauthorized method'}, status=405)

@csrf_protect
def get_friends_list(request):
    if request.method == 'POST':
        try:
            if not request.session.get('user_id'):
                return JsonResponse({'error': 'Unauthorized action'}, status=405)
            elif request.session['username']:
                username = request.session['username']
                player = Player.objects.get(username=username)
                return JsonResponse({'message': serializers.serialize('json', player.friends.all().values('username'))}, status=200)
        except IndexError as e:
            return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
    return JsonResponse({'error': 'Unauthorized method'}, status=405)

#@csrf_protect
#def post_42api(request):
#    return JsonResponse({'error': 'Unauthorized method'}, status=405)

#@csrf_protect
#def post_username(request):
#    return JsonResponse({'error': 'Unauthorized method'}, status=405)

#@csrf_protect
#def post_password(request):
#    return JsonResponse({'error': 'Unauthorized method'}, status=405)

#@csrf_protect
#def get_block(request):
#    return JsonResponse({'error': 'Unauthorized method'}, status=405)
