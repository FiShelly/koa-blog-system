const mysql = require('./db');
const Sequelize = require('sequelize');

const Comment = mysql.define('blog_comment', {
    id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
    article: {type: Sequelize.BIGINT, allowNull: false},
    content: {type: Sequelize.TEXT, allowNull: false},
    date: {type: Sequelize.BIGINT, allowNull: false},
    visitor: {type: Sequelize.STRING(256), allowNull: false},
    quotes: {type: Sequelize.TEXT}
}, {
    tableName: 'blog_comment',
    timestamps: false,
    freezeTableName: true
});

module.exports = Comment;