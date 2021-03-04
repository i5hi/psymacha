#!/bin/bash

COMPOSE="/usr/local/bin/docker-compose --no-ansi"
DOCKER="/usr/bin/docker"

cd /home/vaultron/satswala-mono/infra/nginx/
$COMPOSE run certbot renew --dry-run && $COMPOSE kill -s SIGHUP mewtwo
$DOCKER system prune -af