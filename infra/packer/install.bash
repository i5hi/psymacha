#!/bin/bash

VERSION=1.6.6

wget https://releases.hashicorp.com/packer/${VERSION}/packer_${VERSION}_linux_amd64.zip
unzip packer_${VERSION}_linux_amd64.zip && rm -rf packer_${VERSION}_linux_amd64.zip
sudo mv packer /bin
packer -v

exit 0