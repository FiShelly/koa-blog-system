const router = require('koa-router')();
const user = require('./user');
const categoryTag = require('./categoryTag');
const image = require('./image');
const article = require('./article');
const comment = require('./comment');
const cgi = require('./cgi');

router.use('/web/user', user.routes(), user.allowedMethods());
router.use('/web/cattag', categoryTag.routes(), categoryTag.allowedMethods());
router.use('/web/image', image.routes(), image.allowedMethods());
router.use('/web/comment', comment.routes(), comment.allowedMethods());
router.use('/web/article', article.routes(), article.allowedMethods());
router.use('/web/cgi', cgi.routes(), cgi.allowedMethods());

module.exports = router;