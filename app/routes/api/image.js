const router = require('koa-router')();
const imageController = require('../../controllers/imageController');
const fileUtil = require('../../../utils/file');
const path = require('path');
const fs = require('fs');

router.get('/view/:id', async function (ctx, next) {
    const result = await imageController.findOneById(ctx);
    if (!result.data) {
        ctx.status = 404;
        return;
    }
    const image = result.data;
    const imagePath = path.join(ctx._dir_path, image.path);
    const imageStat = await fileUtil.stat(imagePath);
    if (imageStat.isFile()) {
        ctx.status = result.code;
        ctx.type = image.mime;
        ctx.body = await fileUtil.readImage(imagePath);
    }
});

module.exports = router;