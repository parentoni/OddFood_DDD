#!/bin/bash


sudo systemctl stop nginx
sudo cp ~/nginx/nginx.conf /etc/nginx/nginx.conf -f
sudo systemctl start nginx
echo "[START_NGINX]: Started NGINX reverse proxy successfuly."
