const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const chalk = require('chalk');
dotenv.config({ path: '.env.example' });


/**
 * Connect to Mysql DataBase.
 */
const sequelize = new Sequelize(process.env.MYSQL_DB_NAME, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT
  });
  sequelize
    .authenticate()
    .then(() => {
      console.log('%s Connection to DB has been established successfully.', chalk.green('✓'));
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
});



module.exports = sequelize;