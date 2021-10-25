const winston = require('winston');
const { format } = require('logform');

const alignedWithColorsAndTime = format.combine(
  //format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

const options = {
  file: {
    level: 'debug',
    filename: './logs/app.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: alignedWithColorsAndTime,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
})

module.exports = logger
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};