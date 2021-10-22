# nylas-challenge

This is a simple Node app that will:
* Authenticate an account to make requests to [https://api.nylas.com](https://api.nylas.com)
* Create a `nylas_challenge` label within Gmail
* Send an email to yourself via the Nylas API
* Query the API for the email you sent and change the label to `nylas_challenge`

The app uses express-generator with pug as the templating engine

## To get started:
* Download this repo
* Run `npm install` to get packages
* Run `npm start` to start server
* Go to [http://localhost:3000](http://localhost:3000) to load home page

## Environment variables:
Create an .env file in the root of your app with the following information:
* ACCESS_TOKEN=\<your access token\>
* CLIENT_ID=\<your client id\>