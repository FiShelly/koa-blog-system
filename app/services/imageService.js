const imageModel = require('../models/image');

const imageService = {
    create: function (model) {
        return imageModel.create(model);
    },
    findOne: function (opt) {
        opt = {where: opt};
        return imageModel.findOne(opt);
    },
    findAll: function (opt) {
        opt = {where: opt};
        return imageModel.findAll(opt);
    },
    delete: function (opt) {
        opt = {where: opt};
        return imageModel.destroy(opt);
    },
    findAndCountAll: function (limit, offset, opt) {
        return imageModel.findAndCountAll({
            where: opt,
            limit, offset
        })
    },
    update: function (val, con) {
        con = {where: con};
        delete val.id;
        return imageModel.update(val, con);
    }
};

module.exports = imageService;