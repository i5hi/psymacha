#!/bin/bash

URL=$1

sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

certbot certonly --nginx

sudo chown -R nginx /etc/letsencrypt/live/stackmate.in/

sudo chmod -R 700 /etc/letsencrypt/live/vault.sats.cc/