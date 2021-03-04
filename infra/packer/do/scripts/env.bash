#!/bin/bash -e

# ADMIN_USER  passed in packer as environment variable
BASHRC=/home/$ADMIN_USER/.bashrc

echo '' >> $BASHRC

echo 'alias edenv="nano /home/'$ADMIN_USER'/.bashrc"' >> $BASHRC
echo 'alias senv="source /home/'$ADMIN_USER'/.bashrc"' >> $BASHRC

echo 'alias gooss="sudo /var/ossec/bin/ossec-control start"' >> $BASHRC
echo 'alias nooss="sudo /var/ossec/bin/ossec-control stop"' >> $BASHRC
echo 'alias flogoss="sudo tail -f /var/ossec/logs/alerts/alerts.log"' >> $BASHRC 
echo 'alias clogoss="sudo tail -909 /var/ossec/logs/alerts/alerts.log"' >> $BASHRC
echo 'alias cdapp="cd /home/$ADMIN_USER/satswala-mono/app/typescript"' >> $BASHRC

echo 'alias entercharm="docker exec -it charmander bash"' >> $BASHRC
echo 'alias entermolt="docker exec -it moltres bash"' >> $BASHRC
echo 'alias enteronyx="docker exec -it onyx bash"' >> $BASHRC

echo 'alias moltip="docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' moltres"' >> $BASHRC
echo 'alias onyxip="docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' onyx"' >> $BASHRC
echo 'alias charmip="docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' charmander"' >> $BASHRC

echo '' >> $BASHRC

source $BASHRC

exit 0;