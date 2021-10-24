var express = require('express');
const logger = require('../logger');
var router = express.Router();

/* Message Created Webhook */
// GET to connect webhook with challenge in response
router.get('/created', (req, res, next) => {
  res.send(req.query.challenge);
});

// POST to handle webhook events
router.post('/created', (req, res, next) => {
  logger.info(`-------------------------------`);
  logger.info('Message.Created webhook called');

  const data = req.body.deltas;
  logger.info(JSON.stringify(data, null, 2));
  for (var i = 0; i < data.length; i++) {
    logger.info(
      '%s at %s with id %s',
      data[i].type,
      data[i].date,
      data[i].object_data.id
    );
  }

  return res.status(200).send('success');
});

/* Message Updated Webhook */
// GET to connect webhook with challenge in response
router.get('/updated', (req, res, next) => {
  res.send(req.query.challenge);
});

// POST to handle webhook events
router.post('/updated', (req, res, next) => {
  logger.info(`-------------------------------`);
  logger.info('Message.Updated webhook called');

  const data = req.body.deltas;
  logger.info(JSON.stringify(data, null, 2));
  for (var i = 0; i < data.length; i++) {
    logger.info(
      '%s at %s with id %s',
      data[i].type,
      data[i].date,
      data[i].object_data.id
    );
  }

  return res.status(200).send('success');
});

module.exports = router;
