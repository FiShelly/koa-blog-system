const Koa = require('koa');
const app = new Koa();

const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const session = require('koa-session');
const apiRoute = require('./app/routes/api');
const webRoute = require('./app/routes/web');
const loginMiddleware = require('./middleware/loginMiddleware');
const path = require('path');

app.use(cors({
    // origin: function (ctx) {
    //     if (ctx.url.includes('/api/')) {
    //         return '*';
    //     }
    //     return false;
    // },
    origin: '*',
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.keys = ['user logined secret'];
app.use(session({
    key: 'koa:sess', /** cookie的名称，可以不管 */
    maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
}, app));
// app.use(bodyParser());
app.use(loginMiddleware());
app.use(async function (ctx, next) {
    ctx._dir_path = __dirname;
    await next();
});
app.use(koaBody({
    multipart: true,
    'formLimit': '5mb',
    'jsonLimit': '5mb',
    'textLimit': '5mb'
}));
app.use(apiRoute.routes(), apiRoute.allowedMethods());
app.use(webRoute.routes(), webRoute.allowedMethods());

app.on('error', function (err, ctx) {
    console.log('server error', err, ctx);
});

app.listen(3200);
