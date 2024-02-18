#!/bin/bash

# Source enviroment secrets
source C:/users/henrique/projects/oddfood_ddd/frontend/.config/.env
export NODE_OPTIONS=--openssl-legacy-provider

# Build the react app
npm run --prefix C:/users/henrique/projects/oddfood_ddd/frontend build --silent
echo "[DEPLOY_FRONTEND] Success building react."

# sync s3 bucket
aws s3 sync C:/users/henrique/projects/oddfood_ddd/frontend/build s3://oddfood-hosting --profile "oddfood-hosting-s3-uploader"
echo "[DEPLOY_FRONTEND] Success copying files to S3 bucket"

#invalidate previous cloud front files
aws cloudfront --profile "oddfood-cloudfront-agent" create-invalidation --distribution-id $AWS_CLOUDFRONT_ID --paths '/*' 
echo "[DEPLOY_FRONTEND] Success creating invalidation job"
