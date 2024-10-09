FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt /app/

RUN apt-get update && apt-get install -y \
	gcc \
	python3-dev \
	build-essential \
	--no-install-recommends && \
	rm -rf /var/lib/apt/lists/*

# Installation web3
RUN pip install web3

RUN pip install -r requirements.txt

COPY . /app

# Copier le script d'entrypoint
COPY /tools/entrypoint.sh ../usr/local/bin/

# Donner les permissions d'exécution au script
RUN chmod +x ../usr/local/bin/entrypoint.sh

EXPOSE 8000

# Lancer le script d'initialisation
ENTRYPOINT ["sh", "../usr/local/bin/entrypoint.sh"]
