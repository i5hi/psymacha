# hashicorp/packer

Builds a base image for Digital Ocean droplets.

Results are used in terraform for deployment.

```bash
# packer installation for linux
./install.bash

cat example-vars.json > do/vars.json
# request admin for do_token
nano do/vars.json
# ensure that you have jq as required by start.bash
sudo apt-get install jq -y

./start.bash
```
