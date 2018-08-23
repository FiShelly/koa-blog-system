const router = require('koa-router')();
const commentController = require('../../controllers/commentController');

router.get('/all', async function (ctx, next) {
    ctx.body = await commentController.findAll(ctx);
});

router.get('/:id/all', async function (ctx, next) {
    ctx.body = await commentController.findAllByArticle(ctx);
});

router.get('/', async function (ctx, next) {
    ctx.body = await commentController.findAllByPage(ctx);
});

router.get('/:id', async function (ctx, next) {
    ctx.body = await commentController.findOneById(ctx);
});

router.put('/:id', async function (ctx, next) {
    ctx.body = await commentController.update(ctx);
});

router.delete('/:id', async function (ctx, next) {
    ctx.body = await commentController.remove(ctx);
});

module.exports = router;