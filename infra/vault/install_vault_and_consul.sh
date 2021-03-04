#!/bin/bash

wget https://releases.hashicorp.com/vault/1.3.2/vault_1.3.2_linux_amd64.zip
unzip vault_1.3.2_linux_amd64.zip
chmod 700 vault
sudo mv vault /usr/bin/

# vault

# vault -autocomplete-install

wget https://releases.hashicorp.com/consul/1.7.1/consul_1.7.1_linux_amd64.zip
unzip consul_1.7.1_linux_amd64.zip
chmod 700 consul
sudo mv consul /usr/bin/
consul -autocomplete-install
complete -C /usr/local/bin/consul consul

# sudo useradd --system --home /etc/consul.d --shell /bin/false consul
# sudo passwd consul
# sudo mkdir --parents /opt/consul
# sudo chown --recursive consul:consul /opt/consul
# sudo touch /etc/systemd/system/consul.service
# echo "use consul.service from api.sats.cc/infra/vault"
# sudo nano /etc/systemd/system/consul.service

