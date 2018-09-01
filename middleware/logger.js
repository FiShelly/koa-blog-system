const config = require('../config/server.config');
const log4js = require('koa-log4');
log4js.configure(config.log);
module.exports = log4js;