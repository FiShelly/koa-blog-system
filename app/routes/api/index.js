const router = require('koa-router')();
const user = require('./user');

router.use('/api/user', user.routes(), user.allowedMethods());

module.exports = router;