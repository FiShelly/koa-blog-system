const mysql = require('./db');
const Sequelize = require('sequelize');

const Article = mysql.define('blog_article', {
    id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
    title: {type: Sequelize.STRING(512), allowNull: false},
    type: {type: Sequelize.STRING(256), allowNull: false},
    tag: {type: Sequelize.STRING(256), allowNull: false},
    abstract: {type: Sequelize.TEXT, allowNull: false},
    date: {type: Sequelize.BIGINT, allowNull: false},
    articleHtml: {type: Sequelize.TEXT, allowNull: false},
    articleMd: {type: Sequelize.TEXT, allowNull: false},
    coverImg: {type: Sequelize.INTEGER, allowNull: false},
    status: {type: Sequelize.STRING(10), allowNull: false},
    readCount: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0},
    commentCount: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0},
    seo: {type: Sequelize.STRING(256),allowNull: true}
}, {
    tableName: 'blog_article',
    timestamps: false,
    freezeTableName: true
});

module.exports = Article;