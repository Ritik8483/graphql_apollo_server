const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('master', 'sa', 'Ri8483@tik', {
  host: 'localhost',
  dialect: 'mssql',
  /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
//   define:{      //defined globally all sequelize instance
//     freezeTableName: true,
//   }
});

module.exports = sequelize