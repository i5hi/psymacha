path "swala-m/moltres/node/gsec" {
capabilities = ["read"]
}

path "swala-m/moltres/mongo/tfa_crypt" {
capabilities = ["read"]
}

path "swala-m/moltres/mongo/profile_crypt" {
capabilities = ["read"]
}

path "swala-m/moltres/bitcoind/rpc" {
capabilities = ["read"]
}

path "swala-m/moltres/bitcoind/wallet/*" {
capabilities = ["read"]
}

path "swala-m/moltres/bitcoind/cc_pass" {
capabilities = ["read"]
}

path "swala-m/moltres/firebase/privkey" {
capabilities = ["read"]     
}
