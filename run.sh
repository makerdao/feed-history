#!/usr/bin/env bash

set -e

feed=$(seth --to-address "$1")
blocks=${2-256}

block=$(seth block latest number)
start=${3-$block}

stop=$(("$start" - "$blocks"))
prevprice=

while [ "$start" -gt "$stop"  ]
do
    changed=
    export ETH_BLOCK=$start
    price=$(seth call "$feed" 'read()(bytes32)')
    price=$(seth --to-fix 18 "$(seth --to-dec "$price")")
    ts=$(seth block "$start" timestamp)
    [[ $prevprice != "$price" ]] && changed="CHANGED"
    echo "$start $ts $price $changed" >> "$feed.txt"
    prevprice=$price
    start=$(("$start" - 1))
done