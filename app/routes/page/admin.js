const router = require('koa-router')();
const {readFileSync} = require('fs');
const {join} = require('path');

let template = null;

router.get('**', async function (ctx, next) {
    if (!template) {
        template = readFileSync(join(ctx._dir_path, 'public/blog-admin', 'index.html')).toString();
    }
    ctx.type = 'html';
    ctx.body = template.replace('${CSRF}', ctx.csrf);
});

module.exports = router;