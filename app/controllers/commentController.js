const packData = require('../../utils/normal').packData;
const validator = require('../../utils/normal').validator;
const commentService = require('../services/commentService');
const articleService = require('../services/articleService');
const moment = require('moment');

const create = async function (ctx) {
    const request = ctx.request.body;
    try {
        request.date = moment().unix();
        const results = await Promise.all([
            commentService.create(request), articleService.findOne({id: request.article})
        ]);
        const comment = results[0];
        const article = results[1];
        articleService.update({commentCount: article.commentCount + 1}, {id: request.article});
        return packData(200, 'success', comment);
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }
};

const findOneById = async function (ctx) {
    const params = ctx.params;
    try {
        const comment = await commentService.findOne({id: params.id});
        if (!comment) {
            return packData(404, 'error', 'data-not-find');
        }
        return packData(200, 'success', comment);
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }
};

const remove = async function (ctx) {
    const request = ctx.request.body;
    const params = ctx.params;
    try {
        const comment = await commentService.delete({id: params.id});
        return packData(200, 'success', comment);
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }
};

const findAll = async function (ctx) {
    const request = ctx.request.body;
    const params = ctx.params;
    try {
        const comments = await commentService.findAll();
        return packData(200, 'success', comments);
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
        const comments = await commentService.findAndCountAll(limit, offset);
        return packData(200, 'success', comments);
    } catch (e) {
        console.log(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const findAllByArticle = async function (ctx) {
    const params = ctx.params;
    const articleId = params.id;
    try {
        const comments = await commentService.findAll({article: articleId});
        return packData(200, 'success', comments);
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
        const comment = await commentService.update(request, {id});
        return packData(200, 'success', comment);
    } catch (e) {
        console.log(e);
        return packData(500, 'error', 'mysql-error');
    }
};

module.exports = {
    create, findOneById, update, remove, findAll, findAllByPage, findAllByArticle
};


