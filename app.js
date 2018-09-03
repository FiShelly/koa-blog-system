const Koa = require('koa');
const config = require('./config/server.config');
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
const log4js = require('./middleware/logger');
const path = require('path');

const appLogger = log4js.getLogger('app');
const errorLogger = log4js.getLogger('error');

const app = new Koa();

const DEFAULT_FORMAT = ':remote-addr - -' +
    ' ":method :url HTTP/:http-version"' +
    ' :status :content-length ":referrer"' +
    ' ":user-agent"' +
    ' "time： :response-time"';

app.use(log4js.koaLogger(log4js.getLogger('http'), {
    level: 'auto',
    format: DEFAULT_FORMAT
}));

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
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-CSRF-Token'],
}));

// session middleware
app.keys = ['user logined secret'];
app.use(session({
    key: 'koa:sess',
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
    ctx._server_config = config;
    await next();
});


// load static resource
app.use(async (ctx, next) => {
    const url = ctx.request.url;
    if (url.includes('/public/')) {
        await send(ctx, ctx.path, {
            root: `${__dirname}`,
            maxage: 365 * 24 * 60 * 60 * 1000 * 1000
        });
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

app.use(async (ctx, next) => {
    const start = new Date();
    ctx.logger = log4js;
    await next();
    const ms = new Date() - start;
    appLogger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

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
        await pageNotFound(ctx);
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
app.use(pageNotFound);

app.on('error', async function (err, ctx) {
    errorLogger.error('server error', err);
});

// app.listen(config.prot || 3200);

async function pageNotFound (ctx, next) {
    if (ctx.status === 404) {
        ctx.status = 404;
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
    next && next();
}

module.exports = app;