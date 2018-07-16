const userModel = require('../models/user');

const userService = {
    create: function (model) {
        return userModel.create(model);
    },
    findAll: function (opt) {
        opt = {where: opt};
        return userModel.findAll(opt);
    },
    findOne: function (opt) {
        opt = {where: opt};
        return userModel.findOne(opt);
    },
    update: function (val, con) {
        con = {where: con};
        return userModel.update(val, con);
    }
};

export default function () {
    return userService;
}