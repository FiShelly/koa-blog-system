const router = require('koa-router')();
const categoryTagController = require('../../controllers/categoryTagController');

router.get('/list/:type', async function (ctx, next) {
    ctx.body = await categoryTagController.findAllByType(ctx);
});

router.post('/', async function (ctx, next) {
    ctx.body = await categoryTagController.create(ctx);
});

router.delete('/:id', async function (ctx, next) {
    ctx.body = await categoryTagController.remove(ctx);
});

router.get('/:id', async function (ctx, next) {
    ctx.body = await categoryTagController.findOneById(ctx);
});

router.put('/:id', async function (ctx, next) {
    ctx.body = await categoryTagController.update(ctx);
});

router.put('/increment/:id', async function (ctx, next) {
    ctx.body = await categoryTagController.increment(ctx);
});

module.exports = router;