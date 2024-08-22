# smartnode_practical
Personalized Greetings &amp; Weather Data System with Location-Based Sunrise/Sunset Tracking.

Working Project Video

Click on below for Gdrive link

https://drive.google.com/file/d/1LjKHWiC0z1TKSw8jWYeqM64Iq6F973vi/view?usp=sharing

## Technologies

- **Node.js**: JavaScript runtime for server-side programming
- **TypeScript**: Superset of JavaScript for static typing
- **MongoDB**: NoSQL database for flexible data storage
- **Serverless Framework**: For managing and deploying serverless functions
- **Jest**: Testing framework for ensuring code quality


## Third Party Weather API Server

- https://www.weatherapi.com/
- Base Url of Weather API : http://api.weatherapi.com/v1
- Ref : https://www.weatherapi.com/docs/
- Used API - 
    - Forecast - /forecast.json
    - Current weather - /current.json

## APIs

- Get Greetings - [GET]  [BaseUrl] /locations 
- Add Locations - [POST] [BaseUrl] /locations/add
- Get 5 Days Data - [GET] [BaseUrl] /locations/data
- Cron Job for Get 5 Day of location - [CronJob] [BaseUrl] /trigger-weather-update


