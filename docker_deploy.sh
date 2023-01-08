#!/bin/bash

if [ ! -f "config.json" ]; then
    echo "Error: config.json not found"
    exit 0
fi

export TAG=$(date +%Y.%m.%d.%H.%M)

git checkout .
git pull

docker compose up -d --build
