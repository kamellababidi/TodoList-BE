const sequelize = require('../config/db');
const Sequelize = require('sequelize');

const Task = sequelize.define(
  'task',
  {
    // attributes
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
  },
  {}
);

Task.sync();


module.exports = Task;
