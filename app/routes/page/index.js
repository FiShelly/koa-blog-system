const router = require('koa-router')();
const {admin,redirect} = require('./admin');
const blog = require('./blog');
const site = require('./site');

router.use('/site', site.routes(), site.allowedMethods());
router.use('/admin', admin.routes(), admin.allowedMethods());
router.use('/redirect', redirect.routes(), redirect.allowedMethods());
router.use('', blog.routes(), blog.allowedMethods());

module.exports = router;

