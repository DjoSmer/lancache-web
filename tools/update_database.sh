#!/bin/bash

CACHE_DIR=cache

date

find $CACHE_DIR -type f -exec bash bin/parsing_file.sh "{}" \;

date