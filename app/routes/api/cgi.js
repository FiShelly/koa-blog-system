const router = require('koa-router')();
const cgiController = require('../../controllers/cgiController');

router.get('/time', async function (ctx, next) {
    ctx.body = await cgiController.create(ctx);
});

router.get('/error', async function (ctx, next) {
    ctx.body = await cgiController.create(ctx);
});

module.exports = router;