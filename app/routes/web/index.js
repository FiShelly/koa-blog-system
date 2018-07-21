const router = require('koa-router')();
const user = require('./user');

router.use('/web/user', user.routes(), user.allowedMethods());

module.exports = router;