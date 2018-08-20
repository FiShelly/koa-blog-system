const router = require('koa-router')();
const admin = require('./admin');
const blog = require('./blog');


router.use('admin', admin.routes(), admin.allowedMethods());
router.use('', blog.routes(), admin.allowedMethods());

module.exports = router;