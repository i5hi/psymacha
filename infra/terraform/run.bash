#!/bin/bash
cd do/test
terraform apply -auto-approve

TEST_IP=$(terraform output | cut -c14- | awk 'NR==1{print $1}')
VAULT_IP=$(terraform output | cut -c14- | awk 'NR==2{print $1}')

TEST_HOSTNAME=" Hostname $TEST_IP"
USER=" User root"
PORT=" Port 22"

FILE=$HOME/.ssh/config

sed -i "2s|.*|$TEST_HOSTNAME|"   $FILE
sed -i "3s|.*|$USER|"           $FILE
sed -i "4s|.*|$PORT|"           $FILE

# API_IP=$(terraform output | cut -c14- | awk 'NR==1{print $1}')
# VAULT_IP=$(terraform output | cut -c14- | awk 'NR==2{print $1}')

# API_HOSTNAME=" Hostname $API_IP"
# VAULT_HOSTNAME=" Hostname $VAULT_IP"

# USER=" User root"
# PORT=" Port 22"

# FILE=$HOME/.ssh/config

# sed -i "9s|.*|$API_HOSTNAME|"   $FILE
# sed -i "10s|.*|$USER|"           $FILE
# sed -i "11s|.*|$PORT|"           $FILE
# sed -i "16s|.*|$VAULT_HOSTNAME|" $FILE
# sed -i "17s|.*|$USER|"          $FILE
# sed -i "18s|.*|$PORT|"           $FILE
