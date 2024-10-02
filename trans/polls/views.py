from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.contrib import messages
from .models import Player, Tournament, Match
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.hashers import make_password, check_password
from datetime import datetime, timedelta
from django.db import IntegrityError
import requests
import json
import os
from web3 import Web3, HTTPProvider

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
				new_player.save()
				message = "acc created"
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
			tournament.save()
			return JsonResponse({'message': 'Enregistré'}, status=200)
		except IndexError as e:
			return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
		except json.JSONDecodeError:
			return JsonResponse({'error': 'invalid JSON'}, status=400)


	return JsonResponse({'error: Unauthorized methdod'}, status=405)

	# dans cette requete il y aura toute les infos sur les tournois
	# on l'occurence les matchs/leurs données, dans l'ordre dans lequel
	# ils ont été joués
	# ajouter ce tournoi à la liste des tournois du joueur 1

@csrf_protect
def match_end(request):
	if request.method == 'POST':
		try:
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
			return JsonResponse({'message': 'Match'}, status=200)
		except IndexError as e:
			return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
		except json.JSONDecodeError:
			return JsonResponse({'error': 'invalid JSON'}, status=400)
	return JsonResponse({'error': 'Unauthorized methdod'}, status=405)

@csrf_protect
def set_block(request):
	print("Set Block Views")
	if request.method == 'POST':
		try:
			print("Loading json")
			data = json.loads(request.body)
			print("Parse header datas")
			node_url = data[0]
			contract_address = data[1]
			tournament_id = data[2]
			tournament_winner = data[3]
			matches_number = data[4]
			matches_data = data[5]
			print("Initialize arrays")
			matches_id = []
			players1 = []
			players2 = []
			matches_winners = []
			players1_points = []
			players2_points = []
			print("Get datas from each match")
			for match_info in matches_data:
				matches_id.append(match_info[0])
				players1.append(match_info[1])
				players2.append(match_info[2])
				matches_winners.append(match_info[3])
				players1_points.append(match_info[4])
				players2_points.append(match_info[5])
			print("Connect with web3")
			web3 = Web3(Web3.HTTPProvider(node_url))

			if web3.is_connected():
				print("-" * 50)
				print("Connection Successful")
				print("-" * 50)
			else:
				print("Connection Failed")
				return JsonResponse({'error': 'Connection to blockchain failed'}, status=500)

			web3.eth.defaultAccount = web3.eth.accounts[0]
			compiled_contract_path = '/dapp/build/contracts/TournamentScores.json'

			with open(compiled_contract_path) as file:
				contract_json = json.load(file)
				contract_abi = contract_json['abi']

			contract = web3.eth.contract(address=contract_address, abi=contract_abi)

			txn = contract.functions.setTournamentMatches(
				tournament_id,
				matches_id,
				players1,
				players2,
				matches_winners,
				players1_points,
				players2_points,
				tournament_winner,
				matches_number
			).transact({'from': w3.eth.defaultAccount, 'gas': 3000000})

			receipt = w3.eth.waitForTransactionReceipt(txn)

			print("Transaction receipt: ", receipt)

			message = contract.functions.getTournamentMatches(tournament_id).call()
			winner = contract.functions.getTournamentWinner(tournament_id).call()
			print("Tournament matches: ", message)
			print("Tournament winner: ", winner)
			return JsonResponse({'message': 'Tournament and matches data sent successfully'}, status=200)
		except IndexError as e:
			return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
		except json.JSONDecodeError:
			return JsonResponse({'error': 'invalid JSON'}, status=400)
	return JsonResponse({'error': 'Unauthorized methdod'}, status=405)

def get_block(request):
	if request.method == 'POST':
		try:
			data = json.loads(request.body)
			contract_address = data[0]
			contract_abi = data[1]
			tournament_id = data[2]

			return JsonResponse({'message': 'Envoyé'}, status=200)
		except IndexError as e:
			return JsonResponse({'error': f'Missing index: {str(e)}'}, status=400)
		except json.JSONDecodeError:
			return JsonResponse({'error': 'invalid JSON'}, status=400)
	return JsonResponse({'error': 'Unauthorized methdod'}, status=405)
