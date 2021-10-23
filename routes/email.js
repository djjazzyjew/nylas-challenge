var express = require('express');
const Nylas = require('nylas');
const { access_token, client_id, client_secret } = require('../config');
var router = express.Router();

Nylas.config({
  clientId: client_id,
  clientSecret: client_secret,
});

const nylas = Nylas.with(access_token);

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

module.exports = router;
