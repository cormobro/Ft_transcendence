from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.contrib import messages
from .models import Player, Tournament, Match
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.hashers import make_password, check_password
import requests
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

	# response = requests.get(auth_url, allow_redirects=True)

	# # Récupérez l'URL de redirection (la dernière URL dans la chaîne de redirections)
	# redirect_url = response.url

	# # Retournez l'URL de redirection au navigateur
	# return HttpResponseRedirect(redirect_url)
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
        username = user_data.get('login')
        message = "Player is already logged in"
        if not Player.objects.filter(username=username).exists():
            player = Player(username=username)
            player.save()
            message = "Player added to the db"
        # url = 'https://signin.intra.42.fr/users/sign_out?all=false'

        # headers = {
        #     'Content-Type': 'application/x-www-form-urlencoded',
        #     }
        # response = requests.post(url, headers=headers)
        # return HttpResponse(response)
        return render(request, 'polls/index.html', {'message': message})
    else:
        # Define request_info if needed
        request_info = f"""
        Request Method: {response.request.method}
        Request URL: {response.request.url}
        Request Headers: {response.request.headers}
        Request Body: {response.request.body}
        """
        return HttpResponse(f"ERROR code is {response.status_code}. The request was {request_info}")


@csrf_protect
def manage_request(request):
	if request.method == "GET":
		username = request.GET.get('username')
		if username == 'lol':
			# Vérifier si le joueur existe déjà
			if not Player.objects.filter(username=username).exists():
				# Créer et sauvegarder le joueur
				player = Player(username=username)
				player.save()
				return HttpResponse(f"Query recue, joueur {username} créé et sauvegardé")
			else:
				return HttpResponse(f"Joueur {username} existe déjà")
	elif request.method == "POST":
		# return HttpResponse(f"Ceci etait un post")
		data = request.POST
		username = data.get('player1')
		name = data.get('name')
		if name: 
			return HttpResponse(f"Le nom est {name} !!")
		if username == 'test':
			method = f"Method: {request.method}\n"
			headers = f"Headers: {dict(request.headers)}\n"
			get_params = f"GET parameters: {request.GET}\n"
			post_data = f"POST data: {request.POST}\n"
			body = f"Body: {request.body.decode('utf-8')}\n"
			cookies = f"Cookies: {request.COOKIES}\n"
			
			# Combining all details into a single string
			response_content = method + headers + get_params + post_data + body + cookies
			tournament = Tournament(name='tourney')
			tournament.save()
			# Returning the response
			return HttpResponse(response_content, content_type="text/plain")
		elif username:
				if not Player.objects.filter(username=username).exists():
				# Créer et sauvegarder le joueur
					player = Player(username=username)
					player.save()
					return HttpResponse(f"Query recue, joueur {username} créé et sauvegardé")
				else:
					return HttpResponse(f"Joueur {username} existe déjà")
	return render(request, 'polls/index.html')

@csrf_protect
def create_acc(request):
    if request.method == 'POST':
        data = request.POST
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            message = "Username and password are required."
        elif Player.objects.filter(username=username).exists():
            message = "This username is already taken."
        else:
            new_player = Player(username=username)
            new_player.set_password(password)
            new_player.save()
            message = "Account created successfully."
    else:
        message = "Bad request method"

    return render(request, 'polls/index.html', {'message': message})


@csrf_protect
def manage_connection(request):
	if request.method == 'POST':
		data = request.POST
		username = data.get('username')
		password = data.get('password')
		if not username or not password:
			message = "Username and password required"
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
		else:
			new_player = Player(username=username)
			new_player.set_password(password)
			new_player.logged_in = True
			new_player.save()
			message = "acc created"
			request.session['user_id'] = new_player.id
			request.session['username'] = new_player.username
	else:
		message = "Wrong request method"

	return render(request, 'polls/index.html', {'message': message})


		# on va gérer comme ça pour la distinction
		# si check si le username est dans la db 
		# si pas on renvoie msg (user does not exist)
		# si il l'est on check mdp hashé contre mdp 
		# et on log l'user 
		# on peut potentiellement remplir les différents arrays du front
		# à ce moment là, sinon avoir une variable login avec la session
		# du navigateur

@csrf_protect
def logout(request):
	request.session.flush()
	return render(request, 'polls/index.html', {'message': "Vous avez été déconnecté."})

# @csrf_protect
# def tournament_end(request):
# 	if request.method == 'POST':
# 		tournament = Tournament()
# 		data = request.POST
# 		logged_player = data.get('player1')
# 		if 
		
# 	# dans cette requete il y aura toute les infos sur les tournois
# 	# on l'occurence les matchs/leurs données, dans l'ordre dans lequel
# 	# ils ont été joués
# 	# ajouter ce tournoi à la liste des tournois du joueur 1

@csrf_protect
def match_end(request):
	if request.method == 'POST':
		data = request.POST
		player1 = data.get('player1')
		player2 = data.get('player2')
		mode = data.get('mode')
		result_player1 = data.get('result')
		player1_points = data.get('player1_points')
		player2_points = data.get('player2_points')
		match = Match(player1=player1, player2=player2, 
				mode=mode, result_player1=result_player1, player1_points=player1_points, player2_points=player2_points)
		match.save()
	else:
		message = "Wrong request method"

	return render(request, 'polls/index.html', {'message': message})


	


