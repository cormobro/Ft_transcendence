#!/bin/sh

# Attendre pour que le service Postgres soit prêt
sleep 6

# Appliquer les migrations
python manage.py makemigrations
python manage.py migrate

# Créer le super utilisateur si nécessaire
python manage.py createsuperuser --noinput --username admin --email admin@example.com || true

# Démarrer le serveur Django
python manage.py runserver 0.0.0.0:8000
