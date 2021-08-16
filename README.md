# cron-monitor-services

## What does this project do ?
This project purposed is to cron job from web and notified when the job are not running / or something wrong happen . 

## Who is the project for?
Developer / System Admin

## How to use it ?
User need to create a project . After project created the user can add configuration for each jobs . A url will be provided as endpoint to do health check from cron jobs . It will notified the user if , the job not run between the interval of endpoint health check call . For now we only support for daily notification . 
At the moment , it only support daily check for 24 hour duration of jobs with interval time 3 minute . 

1 . Your cron job should run at 11PM . 
2 . If the next day , at 11:03PM , the check not running , it will send an email notification . 
3 . If everything okay , you just can stay calm and chill . 

## Roadmap 
1 . Add more duration checking instead 24 hour , will add at least per minutes , and every hour . 
2 . Add new notification channel , will ad Slack and twiiter integration . 

## Currently still not ready for production . 

## How to run in local  ?
1 . Install all the dependecies required
```npm install```
2 . Add required env 
3 . ```nodemon index.js```

For client part , it will be in a different repo . You need to use the backend endpoint and put it in client side . Repo to client side - 
[Cron Monitor Client]: https://github.com/killallskywalker/cron-monitor-client

## Folder Strutcure 
src/config 
all configuration file store in here
src/controller
all file related to controller store in here
src/middleware
all file related to middlewate store here ( error handling ,  validation )
src/models
all file related to model store here
src/routes
all file related to routes store here
src/services
all file related to services store in here . Two service currently which is monitor cron and notification . Since this still under development , this service are running without queue .
src/validation
all file related to input validation 