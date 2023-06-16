#!/bin/bash

for repo in 'landing'
do 
    echo "Get env repo: $repo"
    curl \
        --header "X-Vault-Token: $1" \
        $2/v1/kv/data/fleamint/$repo-$3 \
    | jq ".data.data" | jq -r 'to_entries|map("\(.key)=\(.value|tostring)")|.[]' > .env.$repo-$3
    cp .env.$repo-$3 apps/$repo/.env
    rm .env.$repo-$3
done