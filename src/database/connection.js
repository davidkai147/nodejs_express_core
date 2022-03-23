const { Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.postgres.database, config.postgres.username, config.postgres.password, {
  host: config.postgres.host,
  dialect: 'postgres',
});

module.exports = sequelize;
