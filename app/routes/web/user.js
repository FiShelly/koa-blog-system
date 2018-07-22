const router = require('koa-router')();
const userController = require('../../controllers/userController');

router.get('/', async function (ctx, next) {
    ctx.body = await userController.findUserByLoginId(ctx);
});

router.post('/login', async function (ctx, next) {
    ctx.body = await userController.login(ctx);
});

router.put('/update', async function(ctx, next) {
    ctx.body = await userController.updateUser(ctx);
});

router.put('/updatepwd', async function(ctx, next) {
    ctx.body = await userController.updatePwd(ctx);
});

module.exports = router;