const router = require('koa-router')();
const articleController = require('../../controllers/articleController');

router.get('/list', async function (ctx, next) {
    ctx.body = await articleController.findAllByPage(ctx);
});

router.delete('/:id', async function (ctx, next) {
    ctx.body = await articleController.remove(ctx);
});

router.get('/:id', async function (ctx, next) {
    ctx.body = await articleController.findOneById(ctx);
});

router.get('/all', async function (ctx, next) {
    ctx.body = await articleController.findAll(ctx);
});

router.post('/', async function (ctx, next) {
    ctx.body = await articleController.create(ctx);
});

router.put('/:id', async function (ctx, next) {
    ctx.body = await articleController.update(ctx);
});

module.exports = router;