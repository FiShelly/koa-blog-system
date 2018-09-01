const mysql = require('./db');
const Sequelize = require('sequelize');

const Cgi = mysql.define('blog_cgi', {
    id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
    content: {type: Sequelize.TEXT, allowNull: false},
    type: {type: Sequelize.STRING(256), allowNull: false},
    ip: {type: Sequelize.STRING(256), allowNull: false},
    date: {type: Sequelize.BIGINT, allowNull: false}
}, {
    tableName: 'blog_cgi',
    timestamps: false,
    freezeTableName: true
});

module.exports = Cgi;