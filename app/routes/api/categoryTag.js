const router = require('koa-router')();
const categoryTagController = require('../../controllers/categoryTagController');

router.get('/:type', async function (ctx, next) {
    ctx.body = await categoryTagController.findAllByType(ctx)
});

module.exports = router;