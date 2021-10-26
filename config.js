// config.js
const dotenv = require('dotenv');
dotenv.config({ silent: true })

module.exports = {
  access_token: process.env.ACCESS_TOKEN,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  session_secret: process.env.SESSION_SECRET,
};