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
from web3 import Web3

import requests
import json
import os

@csrf_protect
def home(request):
	return render(request, 'app/index.html')

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

	return JsonResponse({'auth_url': auth_url})

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
		return HttpResponse(request_info)
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
			return JsonResponse({'message': 'Account linked successfully'}, status=200)
		except IntegrityError:
			return JsonResponse({'message': 'This 42 acc is already linked to another player'}, status=200)
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
	return render(request, 'app/index.html')


@csrf_protect
def create_account(request):
	if request.method == 'POST':
		try:
			data = json.loads(request.body)
			username = data[0]
			password = data[1]
			if not username or not password:
				return JsonResponse({'error': 'Invalid JSON'}, status=400)
			else:
				new_player = Player(username=username)
				new_player.set_password(password)
				new_player.logged_in = True
				new_player.matches_won = 0
				new_player.save()
				message = "account created"
				request.session['user_id'] = new_player.id
				request.session['username'] = new_player.username
				return JsonResponse({'message': 'Account created'}, status=200)
		except IntegrityError:
			return JsonResponse({'error': 'This username already exists'}, status=200)
		except IndexError as e:
			return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
		except json.JSONDecodeError:
			return JsonResponse({'error': 'Invalid JSON'}, status=400)

	return JsonResponse({'error': 'Unauthorized action'}, status=405)

@csrf_protect
def log_in(request):
	if request.method == 'POST':
		try:
			data = json.loads(request.body)
			username = data[0]
			password = data[1]
			if not username or not password:
				return JsonResponse({'error': 'Invalid JSON'}, status=400)
			elif Player.objects.filter(username=username).exists():
				player = Player.objects.get(username=username)
				if check_password(password, player.password):
					request.session['user_id'] = player.id
					request.session['username'] = player.username
					player.logged_in = True
					player.save()
					return JsonResponse({'message': 'User logged in'}, status=200)
			else:
				return JsonResponse({'error': 'User not registered'}, status=200)

		except IndexError as e:
			return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
		except json.JSONDecodeError:
			return JsonResponse({'error': 'Invalid JSON'}, status=400)

	return JsonResponse({'error': 'Unauthorized action'}, status=405)

@csrf_protect
def logout(request):
	if request.method == 'POST':

		if not request.session.get('user_id'):
			return JsonResponse({'error': 'User is not logged in'}, status=405)
		user_id = request.session.get('user_id')
		player = Player.objects.get(id=user_id)
		player.logged_in = False
		player.save()
		del request.session['user_id']
		del request.session['username']
		return JsonResponse({'message': "User succesfully logged out"}, status=200)
	return JsonResponse({'error': 'Unauthorized action'}, status=405)

@csrf_protect
def tournament_end(request):
	if request.method == 'POST':
		try:
			if not request.session.get('user_id'):
				return JsonResponse({'error': 'Unauthorized action'}, status=405)
			else:
				data = json.loads(request.body)
				winner = data[0]
				match_info = data[1]
				tournament = Tournament(winner=winner)
				tournament.save()
				index = 0
				while index < len(match_info):
					player1 = match_info[index][0]
					player2 = match_info[index][1]
					mode = match_info[index][2]
					_winner = match_info[index][3]
					player1_points = match_info[index][4]
					player2_points = match_info[index][5]
					date = match_info[index][6]
					duration = match_info[index][7]
					index += 1

					match = Match(
							player1=player1,
							player2=player2,
							mode=mode,
							winner=_winner,
							player1_points=player1_points,
							player2_points=player2_points,
							date=date,
							match_time=duration
							)
					match.save()
					tournament.matchs.add(match)
					if player1 == request.session['username'] or player2 == request.session['username']:
						Player.objects.get(username=request.session['username']).matches.add(match)
				tournament.save()
				Player.objects.get(username=request.session['username']).tournaments.add(tournament)
				return JsonResponse({'message': 'Enregistré'}, status=200)
		except IndexError as e:
			return JsonResponse({'error': 'Missing index: ' + str(e)}, status=400)
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
				player1 = request.session.get('username')
				player2 = data[1]
				mode = data[2]
				winner = data[3]
				if winner == "Player 1":
					winner = player1
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
				return JsonResponse({'error': 'User is not logged in'}, status=405)
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
			if not Player.objects.filter(username=player_username).exists():
				return JsonResponse({'error': 'User is not assigned'}, status=405)
			matches = Match.objects.filter(Q(player1=player_username) | Q(player2=player_username))
			wins = matches.filter(winner=player_username).count()
			losses = matches.exclude(winner=player_username).count()
			total_points_won = 0
			total_points_lost = 0
			for match in matches:
				if (match.player1 == player_username):
					total_points_won += match.player1_points
					total_points_lost += match.player2_points
				else:
					total_points_won += match.player2_points
					total_points_lost += match.player1_points

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

@csrf_protect
def get_solo_stats(request):
	if request.method == 'POST':
		try:
			# Check if user is logged in
			if not request.session.get('user_id'):  # Assuming 'user_id' is used to track logged-in users
				return JsonResponse({'error': 'User is not logged in'}, status=405)
			data = json.loads(request.body)
			player_username = data[0]
			if not Player.objects.filter(username=player_username).exists():
				return JsonResponse({'error': 'User is not assigned'}, status=405)
			matches = Match.objects.filter(Q(player1=player_username) | Q(player2=player_username), mode="0")
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

@csrf_protect
def get_duo_stats(request):
	if request.method == 'POST':
		try:
			# Check if user is logged in
			if not request.session.get('user_id'):  # Assuming 'user_id' is used to track logged-in users
				return JsonResponse({'error': 'User is not logged in'}, status=405)
			data = json.loads(request.body)
			player_username = data[0]
			if not Player.objects.filter(username=player_username).exists():
				return JsonResponse({'error': 'User is not assigned'}, status=405)
			matches = Match.objects.filter(Q(player1=player_username) | Q(player2=player_username), mode="1")
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

@csrf_protect
def get_tournament_stats(request):
	if request.method == 'POST':
		try:
			# Check if user is logged in
			if not request.session.get('user_id'):  # Assuming 'user_id' is used to track logged-in users
				return JsonResponse({'error': 'User is not logged in'}, status=405)
			data = json.loads(request.body)
			player_username = data[0]
			if not Player.objects.filter(username=player_username).exists():
				return JsonResponse({'error': 'User is not assigned'}, status=405)
			matches = Match.objects.filter(Q(player1=player_username) | Q(player2=player_username), mode="2")
			matches_won = matches.filter(winner=player_username).count()
			matches_lost = matches.exclude(winner=player_username).count()
			tournaments = Tournament.objects.filter(matchs__player1=player_username).distinct()
			wins = tournaments.filter(winner=player_username).count()
			losses = tournaments.exclude(winner=player_username).count()
			total_points_won = 0
			total_points_lost = 0
			for match in matches:
				if (match.player1 == player_username):
					total_points_won += match.player1_points
					total_points_lost += match.player2_points
				else:
					total_points_won += match.player2_points
					total_points_lost += match.player1_points

			player_data = {
				'pointsWon': total_points_won,
				'pointsLost': total_points_lost,
				'pointsPlayed': total_points_won + total_points_lost,
				'matchesWon': matches_won,
				'matchesLost': matches_lost,
				'matchesPlayed': matches_won + matches_lost,
				'tournamentsWon': wins,
				'tournamentsLost': losses,
				'tournamentsPlayed': wins + losses
			}
			return JsonResponse({'message': player_data}, status=200)
		except IndexError as e:
			return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
		except json.JSONDecodeError:
			return JsonResponse({'error': 'Invalid JSON'}, status=400)
	return JsonResponse({'error': 'Unauthorized action'}, status=405)

@csrf_protect
def get_victories(request):
	if request.method == 'POST':
		try:
			# Check if user is logged in
			if not request.session.get('user_id'):  # Assuming 'user_id' is used to track logged-in users
				return JsonResponse({'error': 'User is not logged in'}, status=405)
			data = json.loads(request.body)
			player_username = data[0]
			if not Player.objects.filter(username=player_username).exists():
				return JsonResponse({'error': 'User is not assigned'}, status=405)
			matches = Match.objects.filter(Q(player1=player_username) | Q(player2=player_username))
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
			if not Player.objects.filter(username=player_username).exists():
				return JsonResponse({'error': 'User is not assigned'}, status=405)
			matches = Match.objects.filter(Q(player1=player_username) | Q(player2=player_username))
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

@csrf_protect
def get_victories_mode(request):
	if request.method == 'POST':
		try:
			# Check if user is logged in
			if not request.session.get('user_id'):  # Assuming 'user_id' is used to track logged-in users
				return JsonResponse({'error': 'User is not logged in'}, status=405)
			data = json.loads(request.body)
			player_username = data[0]
			if not Player.objects.filter(username=player_username).exists():
				return JsonResponse({'error': 'User is not assigned'}, status=405)
			matches = Match.objects.filter(Q(player1=player_username) | Q(player2=player_username))
			soloWins = matches.filter(winner=player_username, mode="0").count()
			duoWins = matches.filter(winner=player_username, mode="1").count()
			tournamentWins = matches.filter(winner=player_username, mode="2").count()
			player_data = {
				'SoloMatchesWins': soloWins,
				'DuoMatchesWins': duoWins,
				'TournamentMatchesWins': tournamentWins
			}
			return JsonResponse({'message': player_data}, status=200)
		except IndexError as e:
			return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
		except json.JSONDecodeError:
			return JsonResponse({'error': 'Invalid JSON'}, status=400)

	return JsonResponse({'error': 'Unauthorized action'}, status=405)

@csrf_protect
def get_points_by_match(request):
	if request.method == 'POST':
		try:
			# Check if user is logged in
			if not request.session.get('user_id'):  # Assuming 'user_id' is used to track logged-in users
				return JsonResponse({'error': 'User is not logged in'}, status=405)
			data = json.loads(request.body)
			player_username = data[0]
			if not Player.objects.filter(username=player_username).exists():
				return JsonResponse({'error': 'User is not assigned'}, status=405)
			matches = Match.objects.filter(Q(player1=player_username) | Q(player2=player_username))
			response = []
			previous_value = 0
			for i in range(len(matches)):
				if i == 0:
					response.append(matches[i].player1_points)
					previous_value = matches[i].player1_points
				else:
					response.append(previous_value + matches[i].player1_points)
					previous_value = previous_value + matches[i].player1_points
			player_data = {
				'matches': response
			}
			return JsonResponse({'message': player_data}, status=200)
		except IndexError as e:
			return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
		except json.JSONDecodeError:
			return JsonResponse({'error': 'Invalid JSON'}, status=400)

	return JsonResponse({'error': 'Unauthorized action'}, status=405)

@csrf_protect
def get_match_stats(request):
	if request.method == 'POST':
		try:
			if not request.session.get('user_id'):
				return JsonResponse({'error': 'User is not logged in'}, status=405)
			else:
				data = json.loads(request.body)
				username = data[0]
				if not username:
					return JsonResponse({'error': 'Username argument is missing'}, status=200)
				elif Player.objects.filter(username=username).exists():
					matches = Player.objects.get(username=username).matches.all()
					return JsonResponse({'message': serializers.serialize('json', matches)}, status=200)
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
				return JsonResponse({'error': 'User is not logged in'}, status=405)
			elif request.session['username']:
				username = request.session['username']
				players = Player.objects.get(username=username).friends_request.all()
				response = []
				for player in players:
					response.append(player.username)
				player_data = {
					'requests': response
				}
				return JsonResponse({'message': player_data}, status=200)
			#else:
			 #   return JsonResponse({'error': 'Unauthorized action'}, status=200)
		except IndexError as e:
			return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
	return JsonResponse({'error': 'Unauthorized action'}, status=405)

@csrf_protect
def post_decline_request(request):
	if request.method == 'POST':
		try:
			if not request.session.get('user_id'):
				return JsonResponse({'error': 'Unauthorized action'}, status=405)
			elif request.session['username']:
				data = json.loads(request.body)
				targetUsername = data[0]
				if not Player.objects.filter(username=targetUsername).exists():
					return JsonResponse({'error': 'The user you\'re looking for is not registered'}, status=200)
				username = request.session['username']
				player = Player.objects.get(username=username)
				if player.friends_request.filter(username=targetUsername).exists():
					player.friends_request.remove(player.friends_request.get(username=targetUsername))
					return JsonResponse({'message': 'You\'ve successfully declined the request'}, status=200)
		except IndexError as e:
			return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
	return JsonResponse({'error': 'Unauthorized action'}, status=405)

@csrf_protect
def post_remove_friend(request):
	if request.method == 'POST':
		try:
			if not request.session.get('user_id'):
				return JsonResponse({'error': 'Unauthorized action'}, status=405)
			elif request.session['username']:
				data = json.loads(request.body)
				targetUsername = data[0]
				if not Player.objects.filter(username=targetUsername).exists():
					return JsonResponse({'error': 'The user you\'re looking for is not registered'}, status=200)
				username = request.session['username']
				player = Player.objects.get(username=username)
				if player.friends.filter(username=targetUsername).exists():
					player.friends.remove(player.friends.get(username=targetUsername))
					return JsonResponse({'message': 'You\'ve successfully deleted this friend'}, status=200)
		except IndexError as e:
			return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
	return JsonResponse({'error': 'Unauthorized action'}, status=405)

@csrf_protect
def post_add_friend(request):
	if request.method == 'POST':
		try:
			if not request.session.get('user_id'):
				return JsonResponse({'error': 'Unauthorized action'}, status=405)
			elif request.session['username']:
				data = json.loads(request.body)
				targetUsername = data[0]
				if not Player.objects.filter(username=targetUsername).exists():
					return JsonResponse({'error': 'The user you\'re looking for is not registered'}, status=405)
				username = request.session['username']
				player = Player.objects.get(username=username)
				if username == targetUsername or player.friends.filter(username=targetUsername).exists():
					return JsonResponse({'error': 'This user is already you\'re friend'}, status=405)
				elif player.friends_request.filter(username=targetUsername).exists():
					player.friends.add(Player.objects.get(username=targetUsername))
					player.friends_request.remove(player.friends_request.get(username=targetUsername))
					Player.objects.get(username=targetUsername).friends.add(player)
					return JsonResponse({'message': 'This user is now your friend'}, status=200)
				else:
					if Player.objects.get(username=targetUsername).friends_request.filter(username=username).exists():
						return JsonResponse({'error': 'This user has already received your friend request'}, status=405)
					Player.objects.get(username=targetUsername).friends_request.add(player)
					return JsonResponse({'message': 'You\'ve sent this user a friend request'}, status=200)
		except IndexError as e:
			return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
	return JsonResponse({'error': 'Unauthorized action'}, status=405)

@csrf_protect
def get_friends_list(request):
	if request.method == 'POST':
		try:
			if not request.session.get('user_id'):
				return JsonResponse({'error': 'User is not logged in'}, status=405)
			elif request.session['username']:
				username = request.session['username']
				players = Player.objects.get(username=username).friends.all()
				response = []
				for player in players:
					response.append(player.username)
				player_data = {
					'friends': response
				}
				return JsonResponse({'message': player_data}, status=200)
		except IndexError as e:
			return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
	return JsonResponse({'error': 'Unauthorized action'}, status=405)
#@csrf_protect
#def post_42api(request):
#    return JsonResponse({'error': 'Unauthorized method'}, status=405)

@csrf_protect
def post_username(request):
	if request.method == 'POST':
		try:
			if not request.session.get('user_id'):
				return JsonResponse({'error': 'Unauthorized action'}, status=405)
			elif request.session['username']:
				data = json.loads(request.body)
				targetUsername = data[0]
				if Player.objects.filter(username=targetUsername).exists():
					return JsonResponse({'error': 'This username is already used'}, status=405)
				else:
					player = Player.objects.get(username=request.session['username'])
					player.username = targetUsername
					player.save()
					request.session['username'] = player.username
					return JsonResponse({'message': 'You\'ve successfully changed your username'}, status=200)
		except IndexError as e:
			return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
	return JsonResponse({'error': 'Unauthorized action'}, status=405)

@csrf_protect
def post_password(request):
	if request.method == 'POST':
		try:
			if not request.session.get('user_id'):
				return JsonResponse({'error': 'Unauthorized action'}, status=405)
			elif request.session['username']:
				data = json.loads(request.body)
				newPassword = data[0]
				player = Player.objects.get(username=request.session['username'])
				player.set_password(newPassword)
				player.save()
				return JsonResponse({'message': 'You\'ve successfully changed your password'}, status=200)
		except IndexError as e:
			return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
	return JsonResponse({'error': 'Unauthorized action'}, status=405)

@csrf_protect
def set_block(request):
	if request.method == 'POST':
		try:
			# Loading JSON
			data = json.loads(request.body)
			# Parse header datas
			node_url = data[0]
			tournament_id = data[1]
			tournament_winner = data[2]
			matches_number = data[3]
			matches_data = data[4]
			#Initialize arrays
			players1 = []
			players2 = []
			matches_winners = []
			players1_points = []
			players2_points = []
			# Get datas from each match
			for match_info in matches_data:
				players1.append(match_info[0])
				players2.append(match_info[1])
				matches_winners.append(match_info[2])
				players1_points.append(match_info[3])
				players2_points.append(match_info[4])
			# Connect with Web3
			web3 = Web3(Web3.HTTPProvider(node_url))

			if web3.is_connected():
				print("Connection Successful")
			else:
				print("Connection Failed")
				return JsonResponse({'error': 'Connection to blockchain failed'}, status=500)
			# Connect to a random account
			web3.eth.defaultAccount = web3.eth.accounts[0]
			compiled_contract_path = '/code/build/contracts/TournamentScores.json'
			# Get json file generated when contract was compiled
			with open(compiled_contract_path) as file:
				contract_json = json.load(file)
				contract_abi = contract_json['abi']
				list_of_dict_keys = list(contract_json['networks'].keys())
				latest_network = sorted(list_of_dict_keys)[-1]
				latest_address = contract_json['networks'][latest_network]['address']
			# Connect with the contract
			contract = web3.eth.contract(address=latest_address, abi=contract_abi)
			# Call a payable function of the smart contract
			txn = contract.functions.setTournamentMatches(
				tournament_id,
				players1,
				players2,
				matches_winners,
				players1_points,
				players2_points,
				tournament_winner,
				matches_number
			).transact({'from': web3.eth.defaultAccount, 'gas': 3000000})

			receipt = web3.eth.wait_for_transaction_receipt(txn)
			if receipt.status == 1:
				print("Transaction receipt: ", receipt)
			else:
				print("La transaction a échoué.")
			return JsonResponse({'message': 'Enregistré'}, status=200)
		except Exception as e:
			return JsonResponse({'error': f'Erreur lors de l\'exécution de la transaction: {str(e)}'}, status=400)
		except IndexError as e:
			return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
		except json.JSONDecodeError:
			return JsonResponse({'error': 'invalid JSON'}, status=400)
	return JsonResponse({'error': 'Unauthorized methdod'}, status=405)

def get_block(request):
	if request.method == 'POST':
		try:
			# Loading JSON
			data = json.loads(request.body)
			# Parse header datas
			node_url = data[0]
			tournament_id = int(data[1])
			# Connect with Web3
			web3 = Web3(Web3.HTTPProvider(node_url))

			if web3.is_connected():
				print("Connection Successful")
			else:
				print("Connection Failed")
				return JsonResponse({'error': 'Connection to blockchain failed'}, status=500)
			# Connect to a random account
			web3.eth.defaultAccount = web3.eth.accounts[0]
			compiled_contract_path = '/code/build/contracts/TournamentScores.json'
			# Get json file generated when contract was compiled
			with open(compiled_contract_path) as file:
				contract_json = json.load(file)
				contract_abi = contract_json['abi']
				list_of_dict_keys = list(contract_json['networks'].keys())
				latest_network = sorted(list_of_dict_keys)[-1]
				latest_address = contract_json['networks'][latest_network]['address']
			# Connect with the contract
			contract = web3.eth.contract(address=latest_address, abi=contract_abi)
			# Call two non payable functions from smart contract
			scores = contract.functions.getTournamentMatches(tournament_id).call()
			winner = contract.functions.getTournamentWinner(tournament_id).call()
			# if (len(scores) < 0 or len(winner) < 0):
			# 	return JsonResponse({'error': 'id not found'}, status=404)
			print("Tournament matches: ", scores)
			print("Tournament winner: ", winner)
			return JsonResponse({'scores': scores, 'winner': winner}, status=200)
		except Exception as e:
			return JsonResponse({'error': f'Erreur lors de l\'exécution de la transaction: {str(e)}'}, status=400)
		except IndexError as e:
			return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
		except json.JSONDecodeError:
			return JsonResponse({'error': 'invalid JSON'}, status=400)
	return JsonResponse({'error': 'Unauthorized methdod'}, status=405)

@csrf_protect
def get_current_user(request):
	if request.method == 'POST':
		try:
			if not request.session.get('user_id'):
				return JsonResponse({'error': 'You\'re not logged in'}, status=405)
			elif request.session['username']:
				return JsonResponse({'message': request.session['username']}, status=200)
		except IndexError as e:
			return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
	return JsonResponse({'error': 'Unauthorized action'}, status=405)
