from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from .models import Player, Tournament
from django.views.decorators.csrf import csrf_protect
import requests
import os

@csrf_protect
def home(request):
	return render(request, 'polls/index.html')

@csrf_protect
def manage_42_api_step1(request):
	client_id = os.getenv('API_CLIENT_ID')
	redirect_uri = 'https%3A%2F%2Flocalhost%3A8000%2Fapi_42'
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

	if code:
		return manage_42_api_step3(code)
	else:
		return JsonResponse({'error': 'No code returned'}, status=400)

def manage_42_api_step3(code):
	client_id = os.getenv('API_CLIENT_ID')
	client_secret = os.getenv('API_CLIENT_SECRET')
	state = os.getenv('API_PROTECTION_STRING')
	redirect_uri = "https://127.0.0.1:8000"
	grant_type = "authorization_code"

	data = {
		'grant_type': grant_type,
		'client_id': client_id,
		'client_secret': client_secret,
		'code': code,
		'redirect_uri': redirect_uri,
	}

	response = requests.post("https://api.intra.42.fr/oauth/token", data=data)

	if response.status_code == 200:
		token_data = response.json()
		access_token = token_data.get('access_token')
		return use_access_token(access_token)
	else:
		return JsonResponse({'error': 'Failed to retrieve access token'}, status=response.status_code)

def use_access_token(access_token):
	api_url = "https://api.intra.42.fr/v2/me"
	headers = {
		'Authorization' : f'Bearer {access_token}',
	}	

	response = requests.get(api_url, headers=headers)

	if response.status_code == 200:
		user_data = response.json()
		display_name = user_data.get('displayname')
		return HttpResponse(f"Got the displayname it is {display_name}")
	else:
		return HttpResponse(f"ERROR")


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