const mysql = require('./mysql');
const Sequelize = require('sequelize');

const User = mysql.define('blog_user', {
    id: {type: Sequelize.BIGINT, primaryKey: true},
    account: {type: Sequelize.STRING(256)},
    name: {type: Sequelize.STRING(256)},
    position: {type: Sequelize.STRING(256)},
    signature: {type: Sequelize.STRING(256)},
    label: {type: Sequelize.STRING(256)},
    introduce: {type: Sequelize.Text},
    password: {type: Sequelize.Text},
    headImg: {type: Sequelize.INTEGER}
}, {
    tableName: 'blog_user',
    timestamps: false,
    freezeTableName: true
});

export default function () {
    return User;
}