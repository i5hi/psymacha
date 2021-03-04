#!/bin/bash
cd do
packer build --var-file=vars.json test.json 

# alternative to manifest method
packer build -machine-readable packer.json | awk -F, '$0 ~/artifact,0,id/ {print $6}'
ID=$(cat manifest.json | jq -r .builds[-1].artifact_id |  cut -d':' -f2)
REPLACE="test_image      = "\"$ID\"""

FILE=$HOME/satswala-mono/infra/terraform/do/test/terraform.tfvars

echo $REPLACE

sed -i "6s/.*/$REPLACE/" "$FILE"

# # 
# packer build --var-file=vars.json  vault.json

# # alternative to manifest method
# # packer build -machine-readable packer.json | awk -F, '$0 ~/artifact,0,id/ {print $6}'
# ID=$(cat manifest.json | jq -r .builds[-1].artifact_id |  cut -d':' -f2)
# REPLACE="vault_image      = "\"$ID\"""

# FILE=$HOME/satswala-mono/infra/terraform/do/vault/terraform.tfvars

# echo $REPLACE

# sed -i "13s/.*/$REPLACE/" "$FILE"
