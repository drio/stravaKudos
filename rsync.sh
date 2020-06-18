#!/bin/bash

IP=$1
PEM=$2
REMOTE_USER=$3
rsync -avz -e "ssh -i $PEM" --exclude=.git --exclude=node_modules $PWD $REMOTE_USER@$IP:.
