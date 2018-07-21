const packData = require('../../utils/normal').packData;
const validator = require('../../utils/normal').validator;
const articleService = require('../services/articleService');

const create = async function(ctx) {
    const request = ctx.request.body;
    try {
        const article = await articleService.create(request);
        return packData(200, 'success', article);
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }
};

const findOneById = async function (ctx) {
    const request = ctx.request.body;
    const params = ctx.params;
    try {
        const article = await articleService.findOne({id: params.id});
        if (!article) {
            return packData(404, 'error', 'data-not-find')
        }
        return packData(200, 'success', article);
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }
};

const remove = async function(ctx) {
    const request = ctx.request.body;
    const params = ctx.params;
    try {
        const article = await articleService.delete({id: params.id});
        return packData(200, 'success', article);
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }
};

const findAll = async function (ctx) {
    const request = ctx.request.body;
    const params = ctx.params;
    try {
        const articles = await articleService.findAll();
        return packData(200, 'success', articles);
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }
};

const findAllByPage = async function (ctx) {
    const request = ctx.request.body;
    const params = ctx.params;
    const limit = request.limit;
    const offset = request.offset;
    if (validator.isEmpty(limit) || validator.isEmpty(offset)) {
        return packData(412, 'error', 'input-invalidate-empty');
    }
    try {
        const articles = await articleService.findAndCountAll(limit, offset);
        return packData(200, 'success', articles);
    } catch (e) {
        console.log(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const update = async function (ctx) {
    const request = ctx.request.body;
    const params = ctx.params;
    const id = params.id;
    try {
        const article = await articleService.update(request, {id});
        return packData(200, 'success', article);
    } catch (e) {
        console.log(e);
        return packData(500, 'error', 'mysql-error');
    }
};

module.exports = {
    create, findOneById, update, remove, findAll, findAllByPage
};


