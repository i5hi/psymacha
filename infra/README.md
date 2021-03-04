# infra

refer to `help` within each subdirectory.

services used in compose:

- nginx
- mongo
- bitcoin

Last updated: Sunday, January 17, 2021 @ 00:49:52 AM (IST)

## terraform

```bash
cat terraform/do/example.tfvars > terraform/do/terraform.tfvars
```

Request credentials for CF and DO from admin and use in terraform.tfvars.
This file is in .gitignore to ensure creds don't get stored in the repo.


### vm@stackmate.in/tech@stackmate.in
