const router = require('koa-router')();
const user = require('./user');
const article = require('./article');
const categoryTag = require('./categoryTag');
const image = require('./image');
const comment = require('./comment');

router.use('/api/user', user.routes(), user.allowedMethods());
router.use('/api/article', article.routes(), article.allowedMethods());
router.use('/api/cattag', categoryTag.routes(), categoryTag.allowedMethods());
router.use('/api/image', image.routes(), image.allowedMethods());
router.use('/api/comment', comment.routes(), comment.allowedMethods());

module.exports = router;