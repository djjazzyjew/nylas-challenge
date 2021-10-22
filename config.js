// config.js
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  access_token: process.env.ACCESS_TOKEN,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
};