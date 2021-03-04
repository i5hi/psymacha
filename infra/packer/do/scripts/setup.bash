#!/bin/bash -e
OSSEC_VER=3.6.0
COMPOSE_VER=1.28.2

NGINX_UID=1900
MONGO_UID=1500
VAULT_UID=1200
SUSHI_UID=1100
NODE_UID=1300
BITCOIN_UID=1700

# ADMIN_USER  passed in packer as environment variable
ADMIN_HOME=/home/$ADMIN_USER
useradd -m -c "admin" $ADMIN_USER 
usermod -aG sudo $ADMIN_USER
usermod -s /bin/bash $ADMIN_USER

cd $ADMIN_HOME
echo 'history -c' >> $ADMIN_HOME/.bash_logout
# curl -L "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh" | sudo bash
# export GITLAB_RUNNER_DISABLE_SKEL=true

export DEBIAN_FRONTEND=noninteractive

curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
apt-key fingerprint 0EBFCD88
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"

apt-get update
apt-get install -y \
    docker-ce docker-ce-cli containerd.io



curl -L "https://github.com/docker/compose/releases/download/$COMPOSE_VER/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
usermod -aG docker $ADMIN_USER
chmod 777 /usr/local/bin/docker-compose

# ossec

# wget https://www.atomicorp.com/OSSEC-ARCHIVE-KEY.asc
# gpg --import OSSEC-ARCHIVE-KEY.asc
# 
# wget https://github.com/ossec/ossec-hids/releases/download/${OSSEC_VER}/ossec-hids-${OSSEC_VER}.tar.gz.asc
# wget https://github.com/ossec/ossec-hids/archive/${OSSEC_VER}.tar.gz
# gpg --verify ossec-hids-${OSSEC_VER}.tar.gz.asc ${OSSEC_VER}.tar.gz
# 
# rm -rf ossec-hids-${OSSEC_VER}.tar.gz.asc
# 
# tar -xvf ${OSSEC_VER}.tar.gz && \
# rm -rf ${OSSEC_VER}.tar.gz


#add users with UID based on Dockerfiles for correct permissions

useradd -u $NGINX_UID -U -o -m -c "" nginx
id nginx 
mkdir /home/nginx/certs

useradd -u $BITCOIN_UID -U -o -m -c "" bitcoin
id bitcoin

useradd -u $MONGO_UID -U -o -m -c "" mongodb
id mongodb

useradd -u $VAULT_UID -U -o -m -c "" vault
id vault

useradd -u $NODE_UID -U -o -m -c "" node
id node

cat /etc/hosts
printf "\nCOMPLETED!\n"

exit 0;


