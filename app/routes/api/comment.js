const router = require('koa-router')();
const commentController = require('../../controllers/commentController');

router.get('/all/:id', async function (ctx, next) {
    ctx.body = await commentController.findAllByArticle(ctx);
});

router.post('/', async function (ctx, next) {
    ctx.body = await commentController.create(ctx);
});

module.exports = router;