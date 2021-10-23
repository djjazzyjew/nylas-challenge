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

  // Get threads
  nylas.threads.list({}).then(threads => {
    console.log(`There are ${threads.length} threads.\n`);
  });

  // Return all accounts connected to your Nylas App.
  if(nylas.accounts) {
    nylas.accounts.list().then(accounts => {
      for (let account of accounts) {
        console.log(
          `Email: ${account.emailAddress} | `,
          `Billing State: ${account.billingState} | `,
          `Sync State: ${account.syncState}`,
          `ID: ${account.id}  | `
        );
      }
    });
  } else { console.log('no accounts \n')};


  res.render('test', { title: 'Nylas Challenge', message:`You've hit the testing page!  Looks like the call to the Nylas API succeeded`});
});

module.exports = router;
