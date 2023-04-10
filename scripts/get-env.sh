#!/bin/bash

for repo in 'landing' 'backoffice' 'api'
do 
    echo "Get env repo: $repo"
    curl \
        --header "X-Vault-Token: $1" \
        $2/v1/kv/data/szn/$3-$repo \
    | jq ".data.data" | jq -r 'to_entries|map("\(.key)=\"\(.value|tostring)\"")|.[]' > .env.$3-$repo
    cp .env.$3-$repo apps/$repo/.env
done