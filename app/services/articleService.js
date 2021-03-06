const articleModel = require('../models/article');
const Op = require('sequelize').Op;

const articleService = {
    create: function (model) {
        return articleModel.create(model);
    },
    findAll: function (opt, cols) {
        if (opt.tag) {
            opt.tag = {[Op.like]: opt.tag};
        }
        opt = {where: opt, order: [['id', 'desc']]};
        if (!cols) {
            opt.attributes = [`id`, `title`, `type`, `tag`, `abstract`, `date`, `coverImg`, `status`, `readCount`, `commentCount`, `seo`];
        } else {
            opt.attributes = cols;
        }
        return articleModel.findAll(opt);
    },
    findOne: function (opt) {
        opt = {where: opt};
        return articleModel.findOne(opt);
    },
    update: function (val, con) {
        con = {where: con};
        delete val.id;
        return articleModel.update(val, con);
    },
    delete: function (opt) {
        opt = {where: opt};
        return articleModel.destroy(opt);
    },
    findAndCountAll: function (limit, offset, opt) {
        if (opt.title) {
            opt.title = {[Op.like]: opt.title};
        }
        return articleModel.findAndCountAll({
            attributes: [`id`, `title`, `type`, `tag`, `abstract`, `date`, `coverImg`, `status`, `readCount`, `commentCount`, `seo`],
            order: [['id', 'desc']],
            where: opt,
            limit, offset
        });
    }
};

module.exports = articleService;
