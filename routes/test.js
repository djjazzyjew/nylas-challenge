var express = require('express');
const Nylas = require('nylas');
const { client_id, client_secret, access_token} = require('../config');
var router = express.Router();

Nylas.config({
  clientId: client_id,
  clientSecret: client_secret,
});

const nylas = Nylas.with(access_token);

/* GET testing page. */
router.get('/', function(req, res, next) {
  // Make call to Nylas API to make sure everything is setup correctly
  nylas.account.get().then(account => console.log(account));

  res.send('You\'ve hit the testing page!  Looks like the call to the Nylas API succeeded');
});

module.exports = router;
