const mysql = require('./db');
const Sequelize = require('sequelize');

const Image = mysql.define('blog_image', {
    id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING, allowNull: false},
    ext: {type: Sequelize.STRING, allowNull: false},
    mime: {type: Sequelize.STRING, allowNull: false},
    path: {type: Sequelize.STRING, allowNull: false},
    size: {type: Sequelize.INTEGER, allowNull: false},
    date: {type: Sequelize.BIGINT, allowNull: false}
}, {
    tableName: 'blog_image',
    timestamps: false,
    freezeTableName: true
});

module.exports = Image;