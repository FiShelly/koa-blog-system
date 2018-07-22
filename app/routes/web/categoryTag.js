const router = require('koa-router')();
const categoryTagController = require('../../controllers/categoryTagController');

router.get('/list/:type', async function (ctx, next) {
    ctx.body = await categoryTagController.findAllByType(ctx);
});

router.post('/create', async function (ctx, next) {
    ctx.body = await categoryTagController.create(ctx);
});

router.delete('/remove/:id', async function (ctx, next) {
    ctx.body = await categoryTagController.remove(ctx);
});

router.get('/one/:id', async function (ctx, next) {
    ctx.body = await categoryTagController.findOneById(ctx);
});

router.put('/update/:id', async function (ctx, next) {
    ctx.body = await categoryTagController.update(ctx);
});

router.put('/increment/:id', async function (ctx, next) {
    ctx.body = await categoryTagController.increment(ctx);
});

module.exports = router;