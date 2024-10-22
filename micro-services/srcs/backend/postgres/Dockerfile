# Utiliser l'image de base officielle de PostgreSQL
FROM postgres:14

# Copier des scripts d'initialisation dans le répertoire spécifique
COPY tools/postgres.sh /docker-entrypoint-initdb.d/

# Exposer le port PostgreSQL
# EXPOSE 5432

# Commande par défaut à exécuter
CMD ["postgres"]
