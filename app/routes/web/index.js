const router = require('koa-router')();
const user = require('./user');
const categoryTag = require('./categoryTag');
const image = require('./image');
const comment = require('./comment');

router.use('/web/user', user.routes(), user.allowedMethods());
router.use('/web/cattag', categoryTag.routes(), categoryTag.allowedMethods());
router.use('/web/image', image.routes(), image.allowedMethods());
router.use('/web/comment', comment.routes(), comment.allowedMethods());

module.exports = router;