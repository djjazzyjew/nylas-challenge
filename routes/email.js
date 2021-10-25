var express = require('express');
const Nylas = require('nylas');
const { access_token, client_id, client_secret } = require('../config');
const logger = require('../logger');
var router = express.Router();

Nylas.config({
  clientId: client_id,
  clientSecret: client_secret,
});

const nylas = Nylas.with(access_token);

let labelName = 'nylas_challenge';

function checkLabel (label) {
  if (label.displayName == labelName) {
      labelToUpdate = label;
  };
}

function createAndApplyLabel () {
  logger.debug(`-------------------------------`);
  if ( !labelToUpdate ) {
      logger.debug(`Creating New Label: ${labelName}`)
      labelToUpdate = nylas.labels.build({displayName: labelName});
      labelToUpdate.save().then(label => {
          addLabelToMostRecentMessage(label);
      });
  } else {
      logger.debug(`${labelName} already exists!`)
      addLabelToMostRecentMessage(labelToUpdate);
  }
}

function addLabelToMostRecentMessage (label) {
  logger.debug(`-------------------------------`);
  nylas.messages.first().then(msg => {
    msg.labels.push(label);
    logger.debug(`${label.displayName} applied to the most recent email.`)
    msg.save().then(savedMsg => {
      logger.debug(`Subject: ${savedMsg.subject}`);
    })
  })
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('email', { title: 'Working with emails' });
});

router.get('/connect', (req, res, next) => {
  options = {
    redirectURI: 'http://localhost:3000/oauth/callback',
    scopes: ['email.read_only', 'email.send'],
  };
  res.redirect(Nylas.urlForAuthentication(options));
});

router.get('/connect/success', (req, res, next) => {
  res.render('emailconnected', { title: 'Success', message: `You've successfully connected your account!` });
})

router.get('/send', (req, res, next) => {
  const draft = nylas.drafts.build({
    subject: 'The Nylas take home challenge',
    to: [{ name: 'Adam', email: 'nylasadam21@gmail.com' }],
    body: 'Welcome to the Nylas take home challenge.  Do you accept?'
  });

  // Send the draft
  draft.send().then(message => {
    logger.debug(`Email with message id = ${message.id} was sent`);
  });

  res.render('email', { title: 'Email sent', message: `You've successfully sent an email. Check your inbox!`});
})

router.get('/change-label', (req, res, next) => {
  nylas.account.get().then(account => {
    if (account.organizationUnit == 'label') {
      nylas.labels.forEach({}, checkLabel, createAndApplyLabel);
    }
  });

  res.render('email', { title: `Change success`, message: `Label changed to 'nylas_challenge'`});
})

module.exports = router;
