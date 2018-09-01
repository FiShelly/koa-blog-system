const cgiModel = require('../models/cgi');
const Op = require('sequelize').Op;

function createLike (word) {
    word = word || '';
    return `%${word}%`;
}

function setKeyWork (opt) {
    opt.content = {[Op.like]: createLike(opt.content)};
    opt.ip = {[Op.like]: createLike(opt.ip)};
    opt = {
        $or: opt
    };
    return opt;
}

const cgiService = {
    create: function (model) {
        return cgiModel.create(model);
    },
    findAll: function (opt) {
        opt = setKeyWork(opt);
        opt = {
            where: opt,
            order: [['id', 'desc']],
        };
        return cgiModel.findAll(opt);
    },
    findAndCountAll: function (limit, offset, opt) {
        opt = setKeyWork(opt);
        return cgiModel.findAndCountAll({
            order: [['id', 'desc']],
            where: opt,
            limit, offset
        });
    },
    findOne: function (opt) {
        opt = {where: opt};
        return cgiModel.findOne(opt);
    },
    update: function (val, con) {
        con = {where: con};
        delete val.id;
        return cgiModel.update(val, con);
    },
    delete: function (opt) {
        opt = {where: opt};
        return cgiModel.destroy(opt);
    },

};

module.exports = cgiService;
