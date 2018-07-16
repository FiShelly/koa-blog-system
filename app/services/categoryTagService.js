const categoryTagModel = require('../models/categoryTag');

const categoryTagService = {
    create: function (model) {
        return categoryTagModel.create(model);
    },
    findAll: function (opt) {
        opt = {where: opt};
        return categoryTagModel.findAll(opt);
    },
    findOne: function (opt) {
        opt = {where: opt};
        return categoryTagModel.findOne(opt);
    },
    update: function (val, con) {
        con = {where: con};
        return categoryTagModel.update(val, con);
    },
    delete: function (opt) {
        opt = {where: opt};
        return categoryTagModel.destroy(opt);
    }
};

export default function () {
    return categoryTagService;
}