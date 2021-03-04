#/bin/bash

cd terraform/do/test
terraform destroy --auto-approve
cd ../../
./run.bash
cd ..
cd ansible/test
./run.bash

