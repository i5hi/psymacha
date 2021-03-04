#!/bin/bash -e
# VAGRANT SPECIFIC

bash /home/vagrant/basics.bash

# Create temp app and db directories
mkdir /home/vagrant/.keys && mkdir /home/vagrant/winston
mkdir -p /data/db && mkdir /data/configdb

echo 'export VAULT_ADDR=https://vault.satswala.com/v1/' >> /home/vagrant/.bashrc
echo 'export VAULT_TOKEN=s.duUvtdXWzBs1UmZrNjIeOxon' >> /home/vagrant/.bashrc


# Install nodeJS environement
curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -

apt-get update
apt-get install -y nodejs

cd /home/vagrant/satswala-mono/app/typescript
npm install -d
npm install -g typescript ts-node npm@latest mocha


# ADD USERS

NGINX_UID=1900
MONGO_UID=1500
VAULT_UID=1200
SUSHI_UID=1100
NODE_UID=1300
BITCOIN_UID=1700

useradd -u $NGINX_UID -U -o -m -c "" nginx
id nginx 
mkdir /home/nginx/certs

useradd -u $BITCOIN_UID -U -o -m -c "" bitcoin
id bitcoin

useradd -u $MONGO_UID -U -o -m -c "" mongodb
id mongodb

useradd -u $VAULT_UID -U -o -m -c "" vault
id vault

useradd -u $NODE_UID -U -o -m -c "" sushi
id sushi


# SET PERMISSIONS
chown -R sushi:vagrant /home/vagrant/.keys
chmod -R 777 /home/vagrant/.keys
chown -R sushi:vagrant /home/vagrant/winston
chmod -R 777 /home/vagrant/winston
chown -R sushi:vagrant /home/vagrant/satswala-mono/app/
chown -R mongodb:vagrant /home/vagrant/satswala-mono/infra/mongo
chmod -R 777 /home/vagrant/satswala-mono/infra/mongo/docker-entrypoint-initdb.d/
chown -R mongodb /data
chown -R nginx /home/nginx
chown -R bitcoin /home/vagrant/.bitcoin
chmod -R 777 /home/vagrant/.bitcoin
chown -R bitcoin:vagrant /home/vagrant/satswala-mono/infra/bitcoin


# DISABLE PASSWORDS FOR ALL USERS FOR EASY ADMINING
passwd -d nginx
passwd -d sushi
passwd -d mongodb
passwd -d vagrant
passwd -d vault




wget https://golang.org/dl/go1.15.8.linux-amd64.tar.gz
tar -C /usr/local -xzf go1.15.8.linux-amd64.tar.gz && rm -rf *.tar.gz
echo "export PATH=$PATH:/usr/local/go/bin" >> /home/vagrant/.profile
echo "export GOPATH=/home/vagrant/go" >> /home/vagrant/.profile

source /home/vagrant/.profile

printf "\n***remember to celebrate the milestones, as you prepare for the road ahead.***\n"

exit 0;

