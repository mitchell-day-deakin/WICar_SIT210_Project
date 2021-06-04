#!/bin/bash
sudo mkdir -p /opt/cubic/wifi_car/
sudo chmod -R 775 ./assets
sudo chmod +x ./assets/index.js
sudo cp -r ./assets/* /opt/cubic/wifi_car/
sudo cp ./wificar.service /lib/systemd/system/
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install nodejs
systemctl daemon-reload
sudo systemctl enable wificar.service
sudo service wificar start
sudo service wificar status




