#!/bin/bash

docker stop onix
sudo rm -rf /data/journal
sudo rm -rf /data/db/diagnostics.data
sudo rm /data/db

docker start onix