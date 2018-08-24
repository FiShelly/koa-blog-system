const router = require('koa-router')();
const ssrUtil = require('../../../utils/ng-ssr-util');

router.get('/', async function (ctx, next) {
    ctx.body = await ssrUtil(ctx.request.url, ctx.csrf);
});

router.get('/index', async function (ctx, next) {
    ctx.body = await ssrUtil(ctx.request.url, ctx.csrf);
});

router.get('/article', async function (ctx, next) {
    ctx.body = await ssrUtil(ctx.request.url, ctx.csrf);
});

router.get('/article/:id', async function (ctx, next) {
    ctx.body = await ssrUtil(ctx.request.url, ctx.csrf);
});

router.get('/typetag', async function (ctx, next) {
    ctx.body = await ssrUtil(ctx.request.url, ctx.csrf);
});

router.get('/about', async function (ctx, next) {
    ctx.body = await ssrUtil(ctx.request.url, ctx.csrf);
});

module.exports = router;
