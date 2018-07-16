const mysql = require('./mysql');
const Sequelize = require('sequelize');

this.article = comment.article;
this.content = comment.content;
this.date = comment.date;
this.visitor = comment.visitor;
this.quotes = comment.quotes;

const Comment = mysql.define('blog_comment', {
    id: {type: Sequelize.BIGINT, primaryKey: true},
    article: {type: Sequelize.BIGINT},
    content: {type: Sequelize.Text},
    date: {type: Sequelize.BIGINT},
    visitor: {type: Sequelize.STRING(256)},
    quotes: {type: Sequelize.Text}
}, {
    tableName: 'blog_comment',
    timestamps: false,
    freezeTableName: true
});

export default function () {
    return Comment;
}