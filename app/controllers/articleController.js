const normal = require('../../utils/normal');
const packData = normal.packData;
const validator = normal.validator;
const articleService = require('../services/articleService');
const categoryTagService = require('../services/categoryTagService');
const moment = require('moment');

const create = async function (ctx) {
    const request = ctx.request.body;
    if (request.tag instanceof Array) {
        request.tag = request.tag.join(',');
    }
    try {
        const article = await articleService.create(request);
        const tagArray = article.tag.split(',').map(val => {
            return {id: val, type: 'tag'};
        });
        request.tag = `,${request.tag},`;
        tagArray.push({id: article.type, type: 'type'});
        let allPromise = tagArray.map(val => categoryTagService.findOne({id: val.id, type: val.type}));
        Promise.all(allPromise).then(results => {
            allPromise = results.map(val => categoryTagService.update({count: val.count + 1}, {id: val.id}));
            return Promise.all(allPromise);
        }).then(data => {
        });
        return packData(200, 'success', article);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const findOneById = async function (ctx) {
    const params = ctx.params;
    try {
        const article = await articleService.findOne({id: params.id});
        if (!article) {
            return packData(404, 'error', 'data-not-find');
        }
        if (article.status !== 'publish') {
            return packData(404, 'error', 'data-not-find');
        }
        article.tag = article.tag.split(',').filter(val => val);
        if (ctx.request.url.includes('/api/')) {
            const allPromise = [];
            allPromise.push(categoryTagService.findOne({id: article.type}));
            article.tag.forEach(val => {
                allPromise.push(categoryTagService.findOne({id: val}));
            });
            const typetags = await Promise.all(allPromise);
            const tags = [];
            typetags.forEach((val, idx) => {
                val = Number(val);
                if (idx === 0) {
                    article.type = val;
                } else {
                    tags.push(val);
                }
            });
            article.tag = tags;
        }
        return packData(200, 'success', article);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const remove = async function (ctx) {
    const params = ctx.params;
    try {
        const article = await articleService.update({status: 'delete'}, {id: params.id});
        return packData(200, 'success', article);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const changeStatus = async function (ctx) {
    const params = ctx.params;
    const status = ctx.request.body.status;
    const statusArray = ['delete', 'publish', 'draft'];
    if (!statusArray.includes(status)) {
        return packData(412, 'error', 'input-invalidate-status');
    }
    try {
        const article = await articleService.update({status: 'publish'}, {id: params.id});
        return packData(200, 'success', article);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const findAll = async function (ctx) {
    try {
        const articles = await articleService.findAll();
        return packData(200, 'success', articles);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const findAllByTypeTag = async function (ctx) {
    const request = ctx.request.query;
    const args = {
        status: 'publish'
    };
    if (!validator.isEmpty(request.type)) {
        args.type = request.type;
    }
    if (!validator.isEmpty(request.tag)) {
        args.tag = `%,${request.tag},%`;
    }
    try {
        const articles = await articleService.findAll(args);
        return packData(200, 'success', articles);
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
    const kw = request.keyword;
    const args = {};
    if (ctx.request.url.includes('/api/')) {
        args.status = 'publish'
    } else {
        const status = request.status || 'all';
        if (!validator.isEmpty(kw)) {
            args.title = `%${kw}%`;
        }
        if (status !== 'all') {
            args.status = status;
        }
    }
    try {
        const articles = await articleService.findAndCountAll(limit, offset, args);
        const rows = articles.rows;
        const allPromise = rows.map(val => {
            if (!validator.isEmpty(val.tag)) {
                val.tag = val.tag.split(',').filter(val => val).join(',');
            }
            return categoryTagService.findOne({id: val.type});
        });
        const typeResult = await Promise.all(allPromise);
        typeResult.forEach((val, idx) => {
            rows[idx].type = val.name;
        });
        return packData(200, 'success', articles);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const update = async function (ctx) {
    const request = ctx.request.body;
    const diff = JSON.parse(request.diff);

    delete request.id;
    delete request.diff;
    if (request.tag instanceof Array) {
        request.tag = request.tag.join(',');
    }

    const params = ctx.params;
    const id = params.id;

    let allPromise = diff.map(val => categoryTagService.findOne({id: val.id, type: val.type}));
    Promise.all(allPromise).then(results => {
        allPromise = results.map((val, idx) => {
            const item = diff[idx];
            let count = item.op === 'subtract' ? val.count - 1 : val.count + 1;
            return categoryTagService.update({count}, {id: val.id});
        });
        return Promise.all(allPromise);
    }).then(data => {
    });

    try {
        if (!validator.isEmpty(request.tag)) {
            request.tag = `,${request.tag},`;
        }
        const article = await articleService.update(request, {id});
        return packData(200, 'success', article);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
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
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }

};

module.exports = {
    create, findOneById, update, remove, findAll, findAllByPage, incrementRead, changeStatus, findAllByTypeTag
};


