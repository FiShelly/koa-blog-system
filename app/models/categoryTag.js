const mysql = require('./mysql');
const Sequelize = require('sequelize');
this.date = typeTag.date;
this.count = typeTag.count;

const CategoryTag = mysql.define('blog_cat_tag', {
    id: {type: Sequelize.BIGINT, primaryKey: true},
    type: {type: Sequelize.INTEGER},
    name: {type: Sequelize.STRING(256)},
    date: {type: Sequelize.BIGINT},
    count: {type: Sequelize.INTEGER}
}, {
    tableName: 'blog_cat_tag',
    timestamps: false,
    freezeTableName: true
});

export default function () {
    return CategoryTag;
}