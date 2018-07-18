const mysql = require('./db');
const Sequelize = require('sequelize');

const User = mysql.define('blog_user', {
    id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
    account: {type: Sequelize.STRING(256)},
    name: {type: Sequelize.STRING(256)},
    position: {type: Sequelize.STRING(256)},
    signature: {type: Sequelize.STRING(256)},
    label: {type: Sequelize.STRING(256)},
    introduce: {type: Sequelize.TEXT},
    password: {type: Sequelize.TEXT},
    headImg: {type: Sequelize.INTEGER}
}, {
    tableName: 'blog_user',
    timestamps: false,
    freezeTableName: true
});

module.exports = User;