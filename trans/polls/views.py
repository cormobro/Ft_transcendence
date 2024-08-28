from django.shortcuts import render
from django.http import HttpResponse
from .models import Player, Tournament
from django.views.decorators.csrf import csrf_protect

@csrf_protect
def home(request):
	return render(request, 'polls/index.html')

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