const router = require('koa-router')();
const userController = require('../../controllers/userController');

router.get('/:account', async function (ctx, next) {
    ctx.body = await userController.findUserByLoginId(ctx);
});

router.post('/login', async function (ctx, next) {
    const result = await userController.login(ctx);
    if (result.code === 200) {
        ctx.session.user = result.data.account;
    }
    ctx.body = result;
});

module.exports = router;