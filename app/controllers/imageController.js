const packData = require('../../utils/normal').packData;
const validator = require('../../utils/normal').validator;
const imageService = require('../services/imageService');

const create = async function(ctx) {
    const request = ctx.request;
    try {
        const image = await imageService.create(request);
        return packData(200, 'success', image);
    } catch (e) {
        console.log(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const findOneById = async function (ctx) {
    const request = ctx.request;
    const params = ctx.params;
    try {
        const image = await imageService.findOne({id: params.id});
        if (!image) {
            return packData(404, 'error', 'data-not-find')
        }
        return packData(200, 'success', image);
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }
};

const remove = async function(ctx) {
    const request = ctx.request;
    const params = ctx.params;
    try {
        const image = await imageService.delete({id: params.id});
        return packData(200, 'success', image);
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }
};


const findAll = async function (ctx) {
    const request = ctx.request;
    const params = ctx.params;
    try {
        const images = await imageService.findAll();
        return packData(200, 'success', images);
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }
};

const findAllByPage = async function (ctx) {
    const request = ctx.request;
    const params = ctx.params;
    const limit = request.limit;
    const offset = request.offset;
    if (validator.isEmpty(limit) || validator.isEmpty(offset)) {
        return packData(412, 'error', 'input-invalidate-empty')
    }
    try {
        const images = await imageService.findAndCountAll(limit, offset);
        return packData(200, 'success', images);
    } catch (e) {
        console.log(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const update = async function (ctx) {
    const request = ctx.request;
    const params = ctx.params;
    const id = params.id;
    try {
        const image = await imageService.update(request, {id});
        return packData(200, 'success', image);
    } catch (e) {
        console.log(e);
        return packData(500, 'error', 'mysql-error');
    }
};

module.exports = {
    create, findOneById, update, remove, findAll, findAllByPage
};
