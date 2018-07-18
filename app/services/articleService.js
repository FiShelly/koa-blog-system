const articleModel = require('../models/article');
const articleService = {
    create: function (model) {
        return articleModel.create(model);
    },
    findAll: function (opt) {
        opt = {where: opt};
        return articleModel.findAll(opt);
    },
    findOne: function (opt) {
        opt = {where: opt};
        return articleModel.findOne(opt);
    },
    update: function (val, con) {
        con = {where: con};
        return articleModel.update(val, con);
    },
    delete: function (opt) {
        opt = {where: opt};
        return articleModel.destroy(opt);
    }
};

module.exports = articleService;