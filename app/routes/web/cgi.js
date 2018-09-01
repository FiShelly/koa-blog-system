const router = require('koa-router')();
const cgiController = require('../../controllers/cgiController');

router.get('/', async function (ctx, next) {
    ctx.body = await cgiController.findAllByPage(ctx);
});


router.delete('/:id', async function (ctx, next) {
    ctx.body = await cgiController.remove(ctx);
});

module.exports = router;