const Koa = require('koa');
const compress = require('koa-compress');
const send = require('koa-send');
const views = require('koa-views');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const CSRF = require('koa-csrf');
const session = require('koa-session');
const apiRoute = require('./app/routes/api');
const webRoute = require('./app/routes/web');
const pageRoute = require('./app/routes/page');
const loginMiddleware = require('./middleware/loginMiddleware');
const path = require('path');

const app = new Koa();

app.use(compress({
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
}));

app.use(cors({
    origin: function (ctx) {
        if (ctx.url.includes('/api/')) {
            return '*';
        }
        return false;
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// session middleware
app.keys = ['user logined secret'];
app.use(session({
    key: 'koa:sess', /** cookie的名称，可以不管 */
    maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
}, app));

//login middleware
app.use(loginMiddleware());

// project path;
app.use(async function (ctx, next) {
    ctx._dir_path = __dirname;
    await next();
});

// load static resource
app.use(async (ctx, next) => {
    const path = ctx.request.url;
    if (path.includes('/public/')) {
        await send(ctx, ctx.path, {root: `${__dirname}`});
    } else {
        await next();
    }

});

// view middleware
app.use(views(path.join(__dirname, '/views'), {extension: 'html'}));

// parse http paras
app.use(koaBody({
    multipart: true,
    'formLimit': '5mb',
    'jsonLimit': '5mb',
    'textLimit': '5mb'
}));

app.use(async function (ctx, next) {
    try {
        await next();
    } catch (e) {
        let status = e.status || 500;

        ctx.status = status;
        // 根据 status 渲染不同的页面
        if (status === 403) {
            switch (ctx.accepts('html', 'json')) {
                case 'html':
                    ctx.type = 'html';
                    await ctx.render(`/error/error_403.html`);
                    break;
                case 'json':
                    ctx.status = 200;
                    ctx.body = {
                        code: 403,
                        status: 'error',
                        msg: 'CSRF TOKEN或其他TOKEN不匹配'
                    };
                    break;
                default:
                    ctx.type = 'text';
                    ctx.body = 'CSRF TOKEN或其他TOKEN不匹配';
            }
        }
        if (status === 404) {
            switch (ctx.accepts('html', 'json')) {
                case 'html':
                    ctx.type = 'html';
                    await ctx.render(`/error/error_404.html`);
                    break;
                case 'json':
                    ctx.status = 200;
                    ctx.body = {
                        code: 404,
                        status: 'error',
                        msg: '您访问的页面不存在'
                    };
                    break;
                default:
                    ctx.type = 'text';
                    ctx.body = 'Page Not Found';
            }
        }
        if (status === 500) {
            switch (ctx.accepts('html', 'json')) {
                case 'html':
                    ctx.type = 'html';
                    await ctx.render(`/error/error_500.html`);
                    break;
                case 'json':
                    ctx.status = 200;
                    ctx.body = {
                        code: 500,
                        status: 'error',
                        msg: '服务器出错'
                    };
                    break;
                default:
                    ctx.type = 'text';
                    ctx.body = '服务器出错';
            }
            // 触发 koa 统一错误事件，可以打印出详细的错误堆栈 log
            ctx.app.emit('error', e, ctx);
        }
    }
});
app.use(new CSRF());
// route.
app.use(pageRoute.routes(), pageRoute.allowedMethods());
app.use(apiRoute.routes(), apiRoute.allowedMethods());
app.use(webRoute.routes(), webRoute.allowedMethods());

// app.use(async function pageNotFound (ctx, next) {
//     if (ctx.status === 404) {
//
//     }
// });

app.on('error', async function (err, ctx) {
    console.log('server error', err);

});

app.listen(3200);
