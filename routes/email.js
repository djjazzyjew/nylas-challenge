var express = require('express');
const Nylas = require('nylas');
const { access_token, client_id, client_secret } = require('../config');
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
  if ( !labelToUpdate ) {
      console.log(`Creating New Label: ${labelName}`)
      labelToUpdate = nylas.labels.build({displayName: labelName});
      labelToUpdate.save().then(label => {
          addLabelToMostRecentMessage(label);
      });
  } else {
      console.log(`${labelName} already exists!`)
      addLabelToMostRecentMessage(labelToUpdate);
  }
}

function addLabelToMostRecentMessage (label) {
  nylas.messages.first().then(msg => {
    msg.labels.push(label);
    console.log(`${label.displayName} applied to the most recent email.`)
    msg.save().then(savedMsg => {
      console.log(`Subject: ${savedMsg.subject}`);
      console.log("This email contains the following labels")
      console.log(savedMsg.labels);
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
    subject: 'With Love, from Nylas',
    to: [{ name: 'My Nylas Friend', email: 'nylasadam21@gmail.com' }],
    body: 'This email was sent using the Nylas email API. Visit https://nylas.com for details.'
  });

  // Send the draft
  draft.send().then(message => {
    console.log(`${message.id} was sent`);
  });

  res.render('email', { title: 'Email sent', message: `You've successfully sent an email. Check your inbox!`});
})

router.get('/change-label', (req, res, next) => {

  // List out current labels in account
  nylas.account.get().then(account =>{
    if (account.organizationUnit == 'label') {
        nylas.labels.list({}).then(labels => {
            console.log("This account contains the following labels:")
            for (const label of labels) {
              console.log(`Name: ${label.displayName} | ID: ${label.id}`);
            }
          });
      }
  });

  nylas.account.get().then(account => {
    if (account.organizationUnit == 'label') {
      nylas.labels.forEach({}, checkLabel, createAndApplyLabel);
    }
  });

  res.render('email', { title: `Change success`, message: `Label changed to 'nylas_challenge'`});
})

module.exports = router;
