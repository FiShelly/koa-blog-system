const router = require('koa-router')();
const articleController = require('../../controllers/articleController');

router.get('/', async function (ctx, next) {
    ctx.body = await articleController.findAllByPage(ctx);
});

router.get('/:id', async function (ctx, next) {
    ctx.body = await articleController.findOneById(ctx);
});

router.put('/:id/increment', async function (ctx, next) {
    ctx.body = await articleController.incrementRead(ctx);
});

module.exports = router;