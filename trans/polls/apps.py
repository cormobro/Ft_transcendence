from django.apps import AppConfig
from django.db import connection

class PollsConfig(AppConfig):
	default_auto_field = 'django.db.models.BigAutoField'
	name = 'polls'
	def ready(self):
		from .models import Player
		if 'polls_player' in connection.introspection.table_names():
			# Mettre à jour tous les utilisateurs pour qu'ils soient déconnectés
			Player.objects.update(logged_in=False)