FROM python:3.9-slim

RUN apt-get update && apt-get install -y \
	curl

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
	apt-get install -y nodejs

RUN npm install -g ganache-cli truffle

RUN pip install web3

# Créer le dossier de la Dapp
WORKDIR /dapp

# Initialiser un projet truffle
RUN truffle init

# Configurer truffle et créer le smart contract
COPY /conf/truffle-config.js /dapp/truffle-config.js \
	/contracts/TournamentScores.sol /dapp/contracts/ \
	/migrations/1_deploy_contracts.js /dapp/migrations/

EXPOSE 7545

# Lancer ganache pour ensuite compiler le smart contract et le déployer sur la blockchain locale
CMD ["sh", "-c", "ganache-cli -p 7545 -h 127.0.0.1 & sleep 5 && truffle compile && truffle migrate"]
