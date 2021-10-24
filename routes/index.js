var express = require('express');
const logger = require('../logger');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Nylas Challenge' });
});

module.exports = router;
