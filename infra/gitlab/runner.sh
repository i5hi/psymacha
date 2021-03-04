#!/bin/bash

curl -L "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh" | sudo bash
export GITLAB_RUNNER_DISABLE_SKEL=true
sudo apt-get update
sudo apt-get install gitlab-runner

# DOCKER

docker pull gitlab/gitlab-runner:latest

docker run -d --name gitlab-runner --restart always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /mnt/s5persistence/gitlab-runner/config:/etc/gitlab-runner \
  gitlab/gitlab-runner:latest