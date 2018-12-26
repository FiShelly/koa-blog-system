const router = require('koa-router')();
const userController = require('../../controllers/userController');

router.get('/', async function (ctx, next) {
    ctx.body = await userController.findUserByLoginId(ctx);
});

router.post('/login', async function (ctx, next) {
    ctx.body = await userController.login(ctx);
});

router.get('/oauth/login', async function (ctx, next) {
    const data = await userController.oauthLogin(ctx);
    ctx.status = data.status;
    if (ctx.status > 400) {

    } else {
        ctx.redirect(data.url);
    }
});

router.get('/info', async function (ctx, next) {
    ctx.body = await userController.userInfo(ctx);
});

router.put('/', async function (ctx, next) {
    ctx.body = await userController.updateUser(ctx);
});

router.put('/updatepwd', async function (ctx, next) {
    ctx.body = await userController.updatePwd(ctx);
});

router.get('/logout', async function (ctx, next) {
    ctx.body = await userController.logout(ctx);
});

module.exports = router;