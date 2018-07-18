const mysql = require('./db');
const Sequelize = require('sequelize');

const Article = mysql.define('blog_article', {
    id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
    title: {type: Sequelize.STRING(512)},
    type: {type: Sequelize.STRING(256)},
    tag: {type: Sequelize.STRING(256)},
    abstract: {type: Sequelize.TEXT},
    date: {type: Sequelize.BIGINT},
    articleHtml: {type: Sequelize.TEXT},
    articleMd: {type: Sequelize.TEXT},
    coverImg: {type: Sequelize.INTEGER},
    status: {type: Sequelize.INTEGER}
}, {
    tableName: 'blog_article',
    timestamps: false,
    freezeTableName: true
});

module.exports = Article;