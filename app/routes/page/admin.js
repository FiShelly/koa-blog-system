const router = require('koa-router')();
const {readFileSync} = require('fs');
const {join} = require('path');
const template = readFileSync(join(process.cwd(), 'public/blog-admin', 'index.html')).toString();

router.get('**', async function (ctx, next) {
    ctx.type = 'html';
    ctx.body = template.replace('${CSRF}', ctx.csrf);
});

module.exports = router;