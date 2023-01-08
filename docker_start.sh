#!/bin/bash

if [ -z $TAG ]; then
    echo Enter TAG:
    read TAG
fi

export TAG=$TAG

docker compose down -t 0
docker compose up -d --no-build
