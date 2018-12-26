const adminRouter = require('koa-router')();
const redirectRouter = require('koa-router')();
const {readFileSync} = require('fs');
const {join} = require('path');

let template = null;

async function fuc (ctx, next) {
    if (!template) {
        template = readFileSync(join(ctx._dir_path, 'public/blog-admin', 'index.html')).toString();
    }
    ctx.type = 'html';
    ctx.body = template.replace('${CSRF}', ctx.csrf);
}

adminRouter.get('**', fuc);
redirectRouter.get('**', fuc);

module.exports = {admin: adminRouter, redirect: redirectRouter};