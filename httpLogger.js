const morgan = require('morgan')
const json = require('morgan-json')
const format = json({
  method: ':method',
  url: ':url',
  status: ':status',
  contentLength: ':res[content-length]',
  responseTime: ':response-time'
})

const logger = require('./logger')
const httpLogger = morgan(format, {
  stream: {
    write: (message) => {
      const {
        method,
        url,
        status,
        contentLength,
        responseTime
      } = JSON.parse(message)

      // Remove newline char from Morgan logs
      message = message.slice(0, -1);

      logger.info('HTTP Access Log', {
        message,
       /*  timestamp: new Date(),
        method,
        url,
        status: Number(status),
        contentLength,
        responseTime: Number(responseTime) */
      })
    }
  }
})

module.exports = httpLogger