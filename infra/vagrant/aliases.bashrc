alias df="df -Tha --total"

alias ed-env='nano "$HOME"/.bashrc'
alias s-env='source "$HOME"/.bashrc'

alias conf-onix="nano /home/sushi/satswala-mono/infra/mongo/Dockerfile"
alias conf-moltres="nano /home/sushi/satswala-mono/app/typescript/Dockerfile"
alias conf-charmander="nano /home/sushi/satswala-mono/infra/bitcoin/Dockerfile"
alias conf-compose="nano  /home/sushi/satswala-mono/docker-compose.yaml"
alias conf-nginx="nano /home/sushi/satswala-mono/infra/nginx/test/nginx-conf/default.conf"
alias conf-bitcoin="sudo nano /mnt/s5persistence/bitcoin/.bitcoin/bitcoin.conf"
alias conf-oss="sudo nano /var/ossec/etc/ossec.conf"

alias ip-onix="docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' onix"
alias ip-charmander="docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' charmander"
alias ip-moltres="docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' moltres"
alias ip-mew="docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mew"

alias sh-onix="docker exec -it onix bash"
alias sh-moltres="docker exec -it moltres bash"
alias sh-charmander="docker exec -it charmander bash -c 'su bitcoin && bash'"
alias sh-mew="docker exec -it mew sh"

alias log-onix="docker logs -f onix"
alias log-moltres="docker logs -f moltres"
alias log-charmander="docker logs -f charmander"
alias log-mew="docker logs -f mew"
alias log-compose="cd /home/sushi/satswala-mono && docker-compose logs"
alias log-oss="sudo tail -1000 /var/ossec/logs/ossec.log"
alias alerts-oss="sudo tail -1000 /var/ossec/logs/alerts/alerts.log"

alias test-moltres="docker exec moltres bash -c 'bash /home/sushi/satswala-mono/app/typescript/lib-units.bash'"
alias test-onix="docker exec onix bash -c 'mongo'"
alias test-charmander="docker exec  charmander bash -c 'bitcoin-cli -datadir=/home/bitcoin/.bitcoin getblockchaininfo' | jq"
alias test-mew="docker exec mew sh -c 'nginx -t'"

alias cd-compose="cd /home/sushi/satswala-mono"
alias cd-oss="cd /var/ossec/"

alias ps-compose="cd /home/sushi/satswala-mono && docker-compose ps"

alias recompose-onix="docker stop onix ; docker rm onix ; docker-compose up -d --build --force-recreate mongo"
alias recompose-moltres="docker stop moltres ; docker rm moltres ; docker-compose up -d --build --force-recreate node"
alias recompose-charmander="docker stop charmander ; docker rm charmander ; docker-compose up -d --build --force-recreate bitcoin"
alias recompose-mew="docker stop mew ; docker rm mew ; docker-compose up -d --build --force-recreate nginx"

alias testlog-bitcoin="sudo tail -f /mnt/s5persistence/bitcoin/.bitcoin/testnet3/debug.log"
alias mainlog-bitcoin="sudo tail -f /mnt/s5persistence/bitcoin/.bitcoin/debug.log"

alias start-oss="sudo /var/ossec/bin/ossec-control start"
alias stop-oss="sudo /var/ossec/bin/ossec-control stop"