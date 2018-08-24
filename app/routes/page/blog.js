const router = require('koa-router')();
const ssrUtil = require('../../../utils/ng-ssr-util');

router.get('/', async function (ctx, next) {
    ctx.body = await ssrUtil(ctx.request.url);
});

router.get('/index', async function (ctx, next) {
    ctx.body = await ssrUtil(ctx.request.url);
});

router.get('/article', async function (ctx, next) {
    ctx.body = await ssrUtil(ctx.request.url);
});

router.get('/article/:id', async function (ctx, next) {
    ctx.body = await ssrUtil(ctx.request.url);
});

router.get('/typetag', async function (ctx, next) {
    ctx.body = await ssrUtil(ctx.request.url);
});

router.get('/about', async function (ctx, next) {
    ctx.body = await ssrUtil(ctx.request.url);
});

module.exports = router;
