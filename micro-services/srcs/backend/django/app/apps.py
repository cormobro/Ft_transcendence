from django.apps import AppConfig
from django.db import connection


class AppConfig(AppConfig):
	default_auto_field = 'django.db.models.BigAutoField'
	name = 'app'
	def ready(self):
		from .models import Player
		if 'app_player' in connection.introspection.table_names():
			# Mettre à jour tous les utilisateurs pour qu'ils soient déconnectés
			Player.objects.update(logged_in=False)
		if 'django_session' in connection.introspection.table_names():
			from django.contrib.sessions.models import Session
			# Supprimer toutes les sessions pour vider request.session
			Session.objects.all().delete()
