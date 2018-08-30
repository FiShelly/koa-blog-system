const Config = require('../../config/database.config');
const Sequelize = require('sequelize');
const mysql = new Sequelize(
    Config.dbname,
    Config.username,
    Config.password, Config.options);

module.exports = mysql;