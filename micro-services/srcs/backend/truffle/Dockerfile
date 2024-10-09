# Utiliser Node.js comme image de base
FROM node:18

# Installer Truffle globalement
RUN npm install -g truffle

# Travailler dans le répertoire app
WORKDIR /dapp

# Initialiser un projet truffle
RUN truffle init

# Configurer truffle et créer le smart contract
COPY /conf/truffle-config.js truffle-config.js
COPY /contracts/TournamentScores.sol contracts/
COPY /migrations/1_deploy_contracts.js migrations/

COPY /tools/start.sh ../usr/local/bin/

RUN chmod +x ../usr/local/bin/start.sh

# Exposer aucun port car c'est un conteneur utilitaire
CMD ["/bin/sh", "../usr/local/bin/start.sh"]
