#!/bin/bash

#
#
#

# 

#
#
#

# create folders that moltres depends on
KEY_PATH=$HOME/.keys
NAME=sats_sig

mkdir $KEY_PATH
# mkdir -p $KYC_PATH

# create a key pair to sign moltres outgoing responses @ src/dto/handlers.respond()
openssl genrsa -des3 -out $KEY_PATH/$NAME.pem 2048
openssl rsa -in $KEY_PATH/$NAME.pem -outform PEM -pubout -out $KEY_PATH/$NAME.pub

# ./bitcoin/install.bash 0.20.1
# ./mongo/install.bash 4.2

# cp mongo/init.conf /etc/mongod.conf
# mongod
# mongo init.js
# cp mongo/final.conf /etc/mongod.conf
# mongod

# BASHRC=/home/$ADMIN_USER/.bashrc

# echo 'export NODE_ENV="DEV"' >> $BASHRC
# echo 'export MOLTRES_PORT=2323' >> $BASHRC
# echo 'export DB_IP="127.0.0.1"' >> $BASHRC
# echo 'export DB_PORT="27017"' >> $BASHRC
# echo 'export BITCOIN_IP="127.0.0.1"' >> $BASHRC
# echo 'export BITCOIN_PORT="7777"' >> $BASHRC
# echo 'export VAULT_TOKEN="s.dAO38pySmLHQs7nfYEVRjCOn"' >> $BASHRC
