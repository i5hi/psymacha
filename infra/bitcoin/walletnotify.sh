#!/bin/bash -e

echo $1 >> $HOME/bitcoin_tx_tracks

CORE_UPDATE_ADDRESS="http://moltres:2323/wallet/bitcoin/notify"

curl -X POST $CORE_UPDATE_ADDRESS -d "txid="$1"&secret=8s9de5kbu32kx9z4qi32vb"


exit 0;