const router = require('koa-router')();
const categoryTagController = require('../../controllers/categoryTagController');

router.get('/', async function (ctx, next) {
    ctx.body = await categoryTagController.findAll(ctx)
});

module.exports = router;