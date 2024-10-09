#!/bin/sh
set -e

# Compiler et déployer les contrats
truffle compile
truffle migrate --network development

# Garder le conteneur actif
tail -f /dev/null
