const router = require('koa-router')();
const imageController = require('../../controllers/imageController');
const fileUtil = require('../../../utils/file');
const path = require('path');
const moment = require('moment');
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

router.get('/list', async function (ctx, next) {
    ctx.body = await imageController.findAllByPage(ctx);
});

router.get('/all', async function (ctx, next) {
    ctx.body = await imageController.findAll(ctx);
});

router.post('/', async function (ctx, next) {
    const file = ctx.request.files.file;
    const reader = fs.createReadStream(file.path);
    const nowTime = moment().format('YYYY-MM-DD');
    const lastPath = `uploads/images/${nowTime}`;
    const random = Number.parseInt(Math.random().toString() * 1000000);
    const array = file.name.split('.');
    const ext = array[array.length - 1];
    const unixRandom = `${lastPath}/${moment().unix()}${random}.${ext}`;
    const savePath = path.join(ctx._dir_path, unixRandom);
    fileUtil.mkDirSync(lastPath, ctx._dir_path)();
    const stream = fs.createWriteStream(savePath);
    reader.pipe(stream);
    file.path = unixRandom;
    ctx.body = await imageController.create(ctx, file);
});

router.put('/:id', async function (ctx, next) {
    ctx.body = await imageController.update(ctx);
});

router.delete('/:id', async function (ctx, next) {
    ctx.body = await imageController.remove(ctx);
});

module.exports = router;