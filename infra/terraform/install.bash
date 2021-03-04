#!/bin/bash

VERSION=0.14.6

wget https://releases.hashicorp.com/terraform/${VERSION}/terraform_${VERSION}_linux_amd64.zip

unzip terraform_${VERSION}_linux_amd64.zip && rm -rf terraform_${VERSION}_linux_amd64.zip
sudo mv terraform /bin
terraform -v

exit 0
