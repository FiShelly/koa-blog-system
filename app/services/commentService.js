const commentModel = require('../models/comment');

const commentService = {
    create: function (model) {
        return commentModel.create(model);
    },
    findOne: function (opt) {
        opt = {where: opt};
        return commentModel.findOne(opt);
    },
    delete: function (opt) {
        opt = {where: opt};
        return categoryTagModel.destroy(opt);
    }
};

module.exports = commentService;