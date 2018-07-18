const mysql = require('./db');
const Sequelize = require('sequelize');

const CategoryTag = mysql.define('blog_cat_tag', {
    id: {type: Sequelize.BIGINT, primaryKey: true,autoIncrement: true},
    type: {type: Sequelize.INTEGER},
    name: {type: Sequelize.STRING(256)},
    date: {type: Sequelize.BIGINT},
    count: {type: Sequelize.INTEGER}
}, {
    tableName: 'blog_cat_tag',
    timestamps: false,
    freezeTableName: true
});

module.exports = CategoryTag;