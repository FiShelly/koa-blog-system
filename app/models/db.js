const Sequelize = require('sequelize');
const Config = require('../../config/database.config');

const mysql =  new Sequelize(Config.dbname, Config.username, Config.password, Config.options);

module.exports = function() {
    return mysql;
};