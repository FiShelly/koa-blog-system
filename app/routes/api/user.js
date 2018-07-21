const router = require('koa-router')();
const userController = require('../../controllers/userController');

router.get('/:account', async function (ctx, next) {
    ctx.body = await userController.findUserByLoginId(ctx);
});

module.exports = router;