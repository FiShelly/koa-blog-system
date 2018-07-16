const mysql = require('./mysql');
const Sequelize = require('sequelize');

const Article = mysql.define('blog_article', {
    id: {type: Sequelize.BIGINT, primaryKey: true},
    title: {type: Sequelize.STRING},
    type: {type: Sequelize.STRING(256)},
    tag: {type: Sequelize.STRING(256)},
    abstract: {type: Sequelize.TEXT},
    date: {type: Sequelize.BIGINT},
    articleHtml: {type: Sequelize.TEXT},
    articleMd: {type: Sequelize.TEXT},
    coverImg: {type: Sequelize.INTEGER},
    statu: {type: Sequelize.INTEGER}
}, {
    tableName: 'blog_article',
    timestamps: false,
    freezeTableName: true
});

export default function () {
    return Article;
}