#!/bin/sh
ssh root@NODE.SERVER.IP <<EOF
 cd ~/node-app
 git pull
 npm install — production
 pm2 restart all
 exit
EO