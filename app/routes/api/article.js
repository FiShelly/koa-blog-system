const router = require('koa-router')();
const articleController = require('../../controllers/articleController');

router.get('/list', async function (ctx, next) {
    ctx.body = await articleController.findAllByPage(ctx);
});

router.put('/increment/:id', async function (ctx, next) {
    ctx.body = await articleController.incrementRead(ctx);
});

module.exports = router;