const Sequelize = require('sequelize');
const db = require('./db');

module.exports = db.define('user', {
  email: Sequelize.STRING,
  code: Sequelize.STRING,
  token: Sequelize.STRING,
}, {
  freezeTableName: true,
  timestamps: false,
});
