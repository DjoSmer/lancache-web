#!/bin/bash

FILEPATH=$1;
SAVE_HEADER_PROPERTIES="KEY Date Content-Type Content-Length Content-Range Last-Modified Expires ETag"

GREP_PARAMS='-a -i';
for header_property in $SAVE_HEADER_PROPERTIES; do
    GREP_PARAMS="${GREP_PARAMS} -e ${header_property}"
done

cat $FILEPATH | head -n 30 | grep $GREP_PARAMS | node add_result.js $FILEPATH

