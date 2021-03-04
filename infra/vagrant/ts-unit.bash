#!/bin/bash

whoami

printf "\n\n\nSTARTING app/typescript/src/lib UNIT TESTS\n\n\n"

export KEY_PATH="$HOME/.keys"
export NODE_ENV=DEV
export KEY_PATH="$HOME/.keys"
export LOG_FOLDER='$HOME/winston/logs'
export VAULT_ADDR="https://vault.satswala.com/v1/"
export VAULT_TOKEN="s.xGsQ4cO20VOTD755GHjWvURb"


rm -rf $HOME/.keys/*
cd $HOME/satswala-mono/app/typescript/src/lib/crypto
mocha -r ts-node/register crypto.spec.ts --exit
rm -rf $HOME/.keys/*

cd ../errors
mocha -r ts-node/register e.spec.ts --exit

rm -rf $HOME/winston/*
cd ../logger
mocha -r ts-node/register winston.spec.ts --exit
rm -rf $HOME/winston/*

cd ../time
mocha -r ts-node/register time.spec.ts --exit

cd ../uid
mocha -r ts-node/register uid.spec.ts --exit

printf "\n\n\nCOMPLETED app/typescript/src/lib UNIT TESTS\n\n\n"