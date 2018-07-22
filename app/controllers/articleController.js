const packData = require('../../utils/normal').packData;
const validator = require('../../utils/normal').validator;
const articleService = require('../services/articleService');
const commentService = require('../services/commentService');
const moment = require('moment');
const create = async function (ctx) {
    const request = ctx.request.body;
    try {
        const article = await articleService.create(request);
        return packData(200, 'success', article);
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }
};

const findOneById = async function (ctx) {
    const request = ctx.request.query;
    const params = ctx.params;
    try {
        const article = await articleService.findOne({id: params.id});
        if (!article) {
            return packData(404, 'error', 'data-not-find');
        }
        return packData(200, 'success', article);
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }
};

const remove = async function (ctx) {
    const params = ctx.params;
    try {
        const article = await articleService.delete({id: params.id});
        return packData(200, 'success', article);
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }
};

const findAll = async function (ctx) {
    try {
        const articles = await articleService.findAll();
        return packData(200, 'success', articles);
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }
};

const findAllByPage = async function (ctx) {
    const request = ctx.request.query;
    let limit = request.limit;
    let offset = request.offset;
    if (validator.isEmpty(limit) || validator.isEmpty(offset)) {
        return packData(412, 'error', 'input-invalidate-empty');
    }
    if (!validator.isNumeric(limit) || !validator.isNumeric(offset)) {
        return packData(412, 'error', 'input-invalidate-number');
    }
    limit = Number(limit);
    offset = Number(offset);
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
        return packData(500, 'error', 'mysql-error');
    }
};

const incrementRead = async function (ctx) {
    const params = ctx.params;
    const id = params.id;
    const ip = ctx.ip;
    const cip = ctx.session.cacheIp;
    const curTime = moment().unix();
    let hasId = false;
    let ids = [];
    if (cip) {
        ids = cip.ids || [];
        hasId = ids.includes(id);
        if (curTime - cip.time < 30 && hasId) {
            return packData(403.1, 'error', 'too-frequent');
        }
    }
    if (!hasId) {
        ids.push(id);
    }
    ctx.session.cacheIp = {ip, time: curTime, ids};
    try {
        const article = await articleService.findOne({id});
        if (article) {
            const add = await articleService.update({readCount: article.readCount + 1}, {id});
            return packData(200, 'success', add);
        } else {
            return packData(404, 'error', 'data-not-find');
        }
    } catch (e) {
        console.log(e);
        return packData(500, 'error', 'mysql-error');
    }

};

module.exports = {
    create, findOneById, update, remove, findAll, findAllByPage, incrementRead
};


