FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt /app/

RUN apt-get update && apt-get install -y \
	gcc \
	python3-dev \
	build-essential \
	--no-install-recommends && \
	rm -rf /var/lib/apt/lists/*

RUN pip install -r requirements.txt

COPY . /app

EXPOSE 8000
