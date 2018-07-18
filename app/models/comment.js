const mysql = require('./db');
const Sequelize = require('sequelize');

const Comment = mysql.define('blog_comment', {
    id: {type: Sequelize.BIGINT, primaryKey: true,autoIncrement: true},
    article: {type: Sequelize.BIGINT},
    content: {type: Sequelize.TEXT},
    date: {type: Sequelize.BIGINT},
    visitor: {type: Sequelize.STRING(256)},
    quotes: {type: Sequelize.TEXT}
}, {
    tableName: 'blog_comment',
    timestamps: false,
    freezeTableName: true
});

module.exports = Comment;