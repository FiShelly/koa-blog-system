const mysql = require('./db');
const Sequelize = require('sequelize');

const User = mysql.define('blog_user', {
    id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
    account: {type: Sequelize.STRING(256), allowNull: false},
    name: {type: Sequelize.STRING(256), allowNull: false},
    position: {type: Sequelize.STRING(256), allowNull: false},
    signature: {type: Sequelize.STRING(256), allowNull: false},
    label: {type: Sequelize.STRING(256), allowNull: false},
    introduce: {type: Sequelize.TEXT, allowNull: false},
    password: {type: Sequelize.TEXT, allowNull: false},
    headImg: {type: Sequelize.INTEGER, allowNull: false}
}, {
    tableName: 'blog_user',
    timestamps: false,
    freezeTableName: true
});

module.exports = User;