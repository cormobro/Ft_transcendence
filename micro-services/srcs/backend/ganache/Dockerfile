FROM node:18

RUN npm install -g ganache

# EXPOSE 7545

# Lancer ganache pour ensuite compiler le smart contract et le déployer sur la blockchain locale
ENTRYPOINT ["ganache", "-h", "0.0.0.0", "-p", "7545"]
