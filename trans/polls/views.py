from django.shortcuts import render
from django.http import HttpResponse
from .models import Player, Tournament

def home(request):
	return render(request, 'polls/index.html')

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
		print("Hello this is a post request")
		# data =  request.POST
		# username = data.get('username')
		# if username:
		# 	try:
		# 		player 
	return render(request, 'polls/index.html')