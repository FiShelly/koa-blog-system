const packData = require('../../utils/normal').packData;
const categoryTagService = require('../services/categoryTagService');
const moment = require('moment');

const create = async function (ctx) {
    const request = ctx.request.body;
    try {
        request.date = moment().unix();
        const categoryTag = await categoryTagService.create(request);
        return packData(200, 'success', categoryTag);
    } catch (e) {
        console.log(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const findOneById = async function (ctx) {
    const request = ctx.request.body;
    const params = ctx.params;
    try {
        const categoryTag = await categoryTagService.findOne({id: params.id});
        if (!categoryTag) {
            return packData(404, 'error', 'data-not-find')
        }
        return packData(200, 'success', categoryTag);
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }
};

const remove = async function (ctx) {
    const request = ctx.request.body;
    const params = ctx.params;
    try {
        const categoryTag = await categoryTagService.delete({id: params.id});
        return packData(200, 'success', categoryTag);
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }
};

const findAllByType = async function (ctx) {
    const params = ctx.params;
    const kw = ctx.request.query.keyword || '';
    try {
        const categoryTag = await categoryTagService.findAll({type: params.type, name: kw});
        return packData(200, 'success', categoryTag);
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }
};

const findAll = async function (ctx) {
    try {
        const categoryTag = await categoryTagService.findAll();
        return packData(200, 'success', categoryTag);
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
        const categoryTag = await categoryTagService.update(request, {id});
        return packData(200, 'success', categoryTag);
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }
};

const increment = async function (ctx) {
    const params = ctx.params;
    const id = params.id;
    try {
        let categoryTag = await categoryTagService.findOne({id});
        if (!categoryTag) {
            return packData(404, 'error', 'data-not-find')
        }
        const count = Number(categoryTag.count) + 1;
        categoryTag = await  categoryTagService.update({count}, {id});
        return packData(200, 'success', categoryTag);
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }
};

module.exports = {
    create, findOneById, update, remove, findAllByType, increment, findAll
};
