#!/bin/bash

# # # mail requires user to input new IP from terraform in postfix/hostname


# # # SETUP AS ROOT 
# ansible-playbook init.yaml --ask-vault-pass 
# ansible-playbook store.yaml
# ansible-playbook git.yaml --ask-vault-pass

# # ONLY ONCE EVERYTHING IS VERIABLY SETUP, CHANGE SSH USER
ansible-playbook ssh.yaml


if [ $? -ne 1 ]; then

    REPLACE_USER=" User sushi"
    sed -i "3s/.*/$REPLACE_USER/" $HOME/.ssh/config
    REPLACE_PORT=" Port 22909"
    sed -i "4s/.*/$REPLACE_PORT/" $HOME/.ssh/config

fi

# # COMPOSE
ansible-playbook compose.yaml