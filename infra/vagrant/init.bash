#!/bin/bash -e
# VAGRANT SPECIFIC

# bash /home/vagrant/basics.bash

# Create temp app and db directories


# echo 'export VAULT_ADDR=https://vault.satswala.com/v1/' >> /home/vagrant/.bashrc
# echo 'export VAULT_TOKEN=s.duUvtdXWzBs1UmZrNjIeOxon' >> /home/vagrant/.bashrc





# ADD USERS

NGINX_UID=1900
MONGO_UID=1500
VAULT_UID=1200
SUSHI_UID=1100
NODE_UID=1300
BITCOIN_UID=1700

# useradd -u $NGINX_UID -U -o -m -c "" nginx
# id nginx 
# mkdir /home/nginx/certs

# useradd -u $BITCOIN_UID -U -o -m -c "" bitcoin
# id bitcoin

# useradd -u $MONGO_UID -U -o -m -c "" mongodb
# id mongodb

# useradd -u $VAULT_UID -U -o -m -c "" vault
# id vault

# useradd -u $NODE_UID -U -o -m -c "" sushi
# id sushi


# SET PERMISSIONS

# DISABLE PASSWORDS FOR ALL USERS FOR EASY ADMINING
passwd -d nginx
passwd -d sushi
passwd -d mongodb
passwd -d vagrant
passwd -d vault


source /home/vagrant/.profile

printf "\n***remember to celebrate the milestones, as you prepare for the road ahead.***\n"

exit 0;

