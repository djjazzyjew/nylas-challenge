var express = require('express');
const Nylas = require('nylas');
const { access_token } = require('../config');
const logger = require('../logger');
var router = express.Router();

const nylas = Nylas.with(access_token);

/* GET testing page. */
router.get('/', function(req, res, next) {
  // Make call to Nylas API to make sure everything is setup correctly
  nylas.account.get().then(account => logger.info(account));

  // Get threads
  nylas.threads.list({}).then(threads => {
    logger.info(`There are ${threads.length} threads.\n`);
  });

  // Return all accounts connected to your Nylas App.
  if(Nylas.accounts) {
    Nylas.accounts.list().then(accounts => {
      for (let account of accounts) {
        logger.info(`Email: ${account.emailAddress} | Billing State: ${account.billingState} | Sync State: ${account.syncState} | ID: ${account.id}`);
      }
    });
  } else { logger.info('no accounts \n')};


  res.render('test', { title: 'Nylas Challenge', message:`You've hit the testing page!  Looks like the call to the Nylas API succeeded.`});
});

module.exports = router;
