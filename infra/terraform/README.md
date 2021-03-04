# First time setup requires getting some ID's from DO using doctl

```bash
doctl auth init -t <token>
doctl compute ssh-key list
doctl projects list
# get ID
doctl projects resources list <ID> 
```

## installation and setup

```
# for linux
./install.bash
cd do/test
terraform init

```
## conftest

```
terraform plan --out tfplan.binary
tfjson tfplan.binary > tfplan.json

```
## ssh config

This is an example .ssh/config, follow the same naming schemes as in hosts file

```
Host swala-t
 Hostname "139.59.72.3"
 User root
 Port 22
 IdentityFile /home/user/.ssh/swala-t
 IdentitiesOnly yes
 
Host swala-m
 Hostname 139.59.4.40
 User sushi
 Port 22909
 IdentityFile /home/user/.ssh/swala-m
 IdentitiesOnly yes

Host swala-v
 Hostname 139.59.64.51
 User sushi
 Port 22909
 IdentityFile /home/user/.ssh/swala-v   
 IdentitiesOnly yes

```

### ENSURE that these three hosts are on top, if you want to use the bash scripts in terraform and ansible. Ensure that you make sure all scripts map to the correct .ssh folder, incase you have momved away from the default `$HOME/.ssh`