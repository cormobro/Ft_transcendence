from django.db import models
from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
import datetime
import uuid

# Player class, once set is added to the DB

class Player(models.Model):
	username = models.CharField(max_length=100, unique=True, blank=True)
	password = models.CharField(max_length=120)
	scores = ArrayField(models.IntegerField(), default=list, blank=True)
	tournaments = models.ManyToManyField('Tournament', related_name='players', blank=True)
	logged_in = models.BooleanField(default=False)
	#matches = models.ManyToManyField('Matches', related_name='players')
	# champ demandes d'amis
	# champ amis
	# champ link compte avec 42


	def set_password(self, raw_password):
		self.password = make_password(raw_password)
		self.save()

	def __str__(self):
		return self.username

# Tournament class, once set is added to the DB 

class Tournament(models.Model):
	name = models.CharField(max_length=255)
	winner = models.CharField(max_length=255, blank=False)
	number_of_players = models.IntegerField()
	# stocker les matchs de manières à pouvoir trouver ceux du joueur X
	# donc probablement une fonction qui ira chercher l'id du joueur dans les matchs
	

	def __str__(self):
		return self.name

class Match(models.Model):
	player1 = models.CharField(max_length=255, blank=False)
	player2 = models.CharField(max_length=255, default='Anonymous')
	mode = models.CharField(max_length=255, blank=False)
	result_player1 = models.CharField(max_length=255, blank=False)
	player1_points = models.IntegerField()
	player2_points = models.IntegerField()