const router = require('koa-router')();
const ssrUtil = require('../../../utils/ng-ssr-util');

const methods = ['/', '/index', '/article', '/article/:id', '/typetag', '/about', '/404'];

methods.forEach(val => {
    router.get(val, async function (ctx, next) {
        ctx.status = 200;
        const html = await ssrUtil(ctx, ctx.csrf);
        // console.log(ctx.status);
        if(ctx.status === 200) {
            ctx.body = html;
        } else {
            ctx.throw(ctx.status, 'data not find');
        }
    });
});

router.get('/robots.txt', async function (ctx, next) {
    ctx.type = 'text';
    ctx.body =
        `
        User-agent: *
        Allow: /

        Sitemap: ${ctx._server_config.host}site/map
        `
});

router.get('/login', async function (ctx, next) {
    ctx.response.redirect('/admin');
});

module.exports = router;
