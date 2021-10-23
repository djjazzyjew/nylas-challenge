var express = require('express');
var router = express.Router();

// Handle OAuth response
router.get('/callback', (req, res, next) => {
  if (req.query.code) {
    Nylas.exchangeCodeForToken(req.query.code).then(token => {
      // save the token to the current session, save it to the user model, etc.
      //req.session.token == token;
      res.redirect('/email');
    });
  } else if (req.query.error) {
    res.render('error', {
      message: req.query.reason,
      error: {
        status:
          'Please try authenticating again or use a different email account.',
        stack: '',
      },
    });
  }
});

module.exports = router;
