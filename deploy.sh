#!/usr/bin/env bash

# ./
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
echo "******************************Install Client**************************"
npm install --registry=https://registry.npm.taobao.org
cd $DIR/mock-server
echo "******************************Install Server**************************"
npm install --registry=https://registry.npm.taobao.org
echo "*****************************Start Server*****************************"
npm start
