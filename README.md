# WinBySynidate Core Engine

Install mysql database and configure the .env with you credentials

## To create Database.

`npm run create:db`

which will create database on mysql.

### To remove database

`npm run drop:db`

## To Migrate and populate all data to db

`npm run migrate`

### To undo all changes 

`npm run migrate:reset`

# Project Setup

First of all, install all the node modules by below command:

`npm install`

and install artillery, it you are using load test

`npm install -g artillery`

and to deploy in producton install pm2

`npm install pm2 -g`


## To Test

`npm run test`

### To Test Code Coverage

`npm run test:coverage`

### To Test Load

`npm run test:load`

## To Run in Develpment

`npm run dev`

## To Deploy in Production

`npm run prod:start`

### To see the log

`npm run prod:log`

### To monitor the System performance

`npm run prod:monitor`

### To Stop

`npm run prod:stop`

