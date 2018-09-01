const packData = require('../../utils/normal').packData;
const validator = require('../../utils/normal').validator;
const imageService = require('../services/imageService');
const moment = require('moment');

const create = async function(ctx, file) {
    const request = ctx.request.body;
    request.path = file.path;
    request.mime = file.type;
    request.name = file.name;
    request.size = file.size;
    request.name = file.name;
    try {
        request.date = moment().unix();
        const image = await imageService.create(request);
        return packData(200, 'success', image);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const findOneById = async function (ctx) {
    const request = ctx.request.body;
    const params = ctx.params;
    try {
        const image = await imageService.findOne({id: params.id});
        if (!image) {
            return packData(404, 'error', 'data-not-find')
        }
        return packData(200, 'success', image);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const remove = async function(ctx) {
    const request = ctx.request.body;
    const params = ctx.params;
    try {
        const image = await imageService.delete({id: params.id});
        return packData(200, 'success', image);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};


const findAll = async function (ctx) {
    const request = ctx.request.body;
    const params = ctx.params;
    try {
        const images = await imageService.findAll();
        const result = packData(200, 'success', images);
        result.data.list = result.data.list.map(v => {
            v.url = `${ctx.origin}/web/image/view/${v.id}` ;
            delete v.path;
            return v;
        });
        return result;
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const findAllByPage = async function (ctx) {
    const request = ctx.request.query;
    let limit = request.limit;
    let offset = request.offset;
    if (validator.isEmpty(limit) || validator.isEmpty(offset)) {
        return packData(412, 'error', 'input-invalidate-empty')
    }
    if (!validator.isNumeric(limit) || !validator.isNumeric(offset)) {
        return packData(412, 'error', 'input-invalidate-number');
    }
    limit = Number(limit);
    offset = Number(offset);
    try {
        const images = await imageService.findAndCountAll(limit, offset,request.keyword);
        const result = packData(200, 'success', images);
        result.data.list = result.data.list.map(v => {
            v.url = `${ctx.origin}/web/image/view/${v.id}` ;
            delete v.path;
            return v;
        });
        return result;
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const update = async function (ctx) {
    const request = ctx.request.body;
    const params = ctx.params;
    const id = params.id;
    try {
        const image = await imageService.update(request, {id});
        return packData(200, 'success', image);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

module.exports = {
    create, findOneById, update, remove, findAll, findAllByPage
};
