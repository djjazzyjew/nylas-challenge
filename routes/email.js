var express = require('express');
const { rawListeners } = require('../app');
var router = express.Router();

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

module.exports = router;
