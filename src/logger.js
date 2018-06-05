const winston = require('winston');
const moment = require('moment');
const config = require('./config');

const LogLevel = {
  error: 'error',
  silly: 'silly',
  debug: 'debug',
  warn: 'warn',
  warning: 'warn',
  info: 'info',
  verbose: 'verbose',
  none: -1,
};

module.exports = new winston.Logger({
  transports: [new winston.transports.Console({
    level: LogLevel[config.LOG_LEVEL] || -1,
    formatter(options) {
      return JSON.stringify({
        at: moment().format('YYYY-MM-DD HH:mm:ss.SSS Z'),
        level: options.level,
        message: options.message,
        meta: options.meta,
      });
    },
  })],
});
