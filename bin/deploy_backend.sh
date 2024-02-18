#!/bin/bash

source  C:/users/henrique/projects/oddfood_ddd/backend/.conf/server/.env

echo "[DEPLOY_BACKEND]: Selected Host: $HOSTNAME"

# Build backend
rm -rf  C:/users/henrique/projects/oddfood_ddd/backend/dist
npm run --silent build --prefix  C:/users/henrique/projects/oddfood_ddd/backend

echo "[DEPLOY_BACKEND]: Typescript compiled"

# Copy necessary files to instance

ssh $USER@$HOSTNAME -i $IDENTITYFILE 'rm -rf app && mkdir app'

scp  -q -i $IDENTITYFILE -r C:/users/henrique/projects/oddfood_ddd/bin/remote $USER@$HOSTNAME:~/. # Copy scripts
scp  -q -i $IDENTITYFILE -r C:/users/henrique/projects/oddfood_ddd/backend/.conf/nginx $USER@$HOSTNAME:~/. # Copy scripts
scp  -q -i $IDENTITYFILE -r C:/users/henrique/projects/oddfood_ddd/backend/dist $USER@$HOSTNAME:~/app # Copy build
scp  -q -i $IDENTITYFILE -r C:/users/henrique/projects/oddfood_ddd/backend/static $USER@$HOSTNAME:~/app # Copy static
scp  -q -i $IDENTITYFILE -r C:/users/henrique/projects/oddfood_ddd/backend/package*.json $USER@$HOSTNAME:~/app # Copy package*
scp  -q -i $IDENTITYFILE -r C:/users/henrique/projects/oddfood_ddd/backend/pm2.json $USER@$HOSTNAME:~/app # Copy pm2 configs

echo "[DEPLOY_BACKEND]: Copied source code to host machine."
# todo: copy build

ssh $USER@$HOSTNAME -i $IDENTITYFILE 'sudo chmod +x ~/remote/startup.sh && ./remote/startup.sh '
