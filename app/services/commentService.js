const commentModel = require('../models/comment');
const Op = require('sequelize').Op;

const commentService = {
    create: function (model) {
        return commentModel.create(model);
    },
    findOne: function (opt) {
        opt = {where: opt};
        return commentModel.findOne(opt);
    },
    findAll: function (opt) {
        opt = {where: opt};
        return commentModel.findAll(opt);
    },
    delete: function (opt) {
        opt = {where: opt};
        return commentModel.destroy(opt);
    },
    findAndCountAll: function (limit, offset, opt = {}) {
        if (opt.content) {
            opt.content = {[Op.like]: opt.content};
        }
        return commentModel.findAndCountAll({
            where: opt,
            limit, offset
        });
    },
    update: function (val, con) {
        con = {where: con};
        return commentModel.update(val, con);
    }
};

module.exports = commentService;