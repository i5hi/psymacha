#!/bin/bash

docker stop onix
docker rm onix
m -rf /data/db/journal
rm -rf /data/db/diagnostics.data
rm /data/db/*

