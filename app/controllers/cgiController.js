const normalUtil = require('../../utils/normal');
const packData = normalUtil.packData;
const validator = normalUtil.validator;
const cgiService = require('../services/cgiService');
const moment = require('moment');

const create = async function (ctx) {
    const query = ctx.request.query;
    const host = ctx.headers.host;
    if (!ctx.headers.accept.includes('image/')) {
        return packData(412, 'error', 'must-be-image');
    }
    if (!host.includes('fishelly') ) {
        return packData(412, 'error', 'must-be-local-site');
    }
    if (validator.isEmpty(query.type) || validator.isEmpty(query.report)) {
        return packData(412, 'error', 'input-invalidate-empty');
    }
    const ip = ctx.ip;
    const cip = ctx.session.cacheIp;
    const curTime = moment().unix();
    if (cip) {
        if (curTime - cip.time < 3) {
            return packData(403.1, 'error', 'too-frequent');
        }
    }
    ctx.session.cacheIp = {ip, time: curTime, ids:[]};
    const model = {
        date: moment().unix(),
        type: query.type,
        content: query.report,
        ip: ip
    };
    try {
        await cgiService.create(model);
        return packData(200, 'success', model);
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
        return packData(412, 'error', 'input-invalidate-empty');
    }
    if (!validator.isNumeric(limit) || !validator.isNumeric(offset)) {
        return packData(412, 'error', 'input-invalidate-number');
    }
    limit = Number(limit);
    offset = Number(offset);
    try {
        const cgis = await cgiService.findAndCountAll(limit, offset, {content: request.keyword, ip: request.keyword});
        return packData(200, 'success', cgis);
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
        const image = await cgiService.update(request, {id});
        return packData(200, 'success', image);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const remove = async function (ctx) {
    const request = ctx.request.body;
    const params = ctx.params;
    try {
        const image = await cgiService.delete({id: params.id});
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
        const images = await cgiService.findAll({content: request.keyword, ip: request.keyword});
        return packData(200, 'success', images);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

module.exports = {
    create, findAllByPage, update, findAll, remove
};
