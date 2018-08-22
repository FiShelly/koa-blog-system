const categoryTagModel = require('../models/categoryTag');
const Op = require('sequelize').Op;

const categoryTagService = {
    create: function (model) {
        return categoryTagModel.create(model);
    },
    findAll: function (opt) {
        if (opt) {
            opt.name = {[Op.like]: `%${opt.name}%`};
            opt = {
                order: [['id', 'desc']],
                where: opt,
            };
        }
        return categoryTagModel.findAll(opt);
    },
    findOne: function (opt) {
        opt = {where: opt};
        return categoryTagModel.findOne(opt);
    },
    update: function (val, con) {
        con = {where: con};
        delete val.id;
        return categoryTagModel.update(val, con);
    },
    delete: function (opt) {
        opt = {where: opt};
        return categoryTagModel.destroy(opt);
    }
};

module.exports = categoryTagService;