const mysql = require('./db');
const Sequelize = require('sequelize');

const CategoryTag = mysql.define('blog_cat_tag', {
    id: {type: Sequelize.BIGINT, primaryKey: true,autoIncrement: true},
    type: {type: Sequelize.STRING(100), allowNull:false},
    name: {type: Sequelize.STRING(256), allowNull:false},
    date: {type: Sequelize.BIGINT, allowNull:false},
    count: {type: Sequelize.INTEGER, allowNull:false, defaultValue: 0}
}, {
    tableName: 'blog_cat_tag',
    timestamps: false,
    freezeTableName: true
});

module.exports = CategoryTag;