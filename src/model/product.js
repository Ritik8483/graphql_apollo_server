const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../sequelizeFile");

const Product = sequelize.define(
  'Product',
  {
    // Model attributes are defined here
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    //   defaultValue: 'John Doe',         //used to add default value to column
    },
    description: {
      type: DataTypes.TEXT,
      // allowNull defaults to true
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    //    freezeTableName: true,           //Enforcing the table name to be equal to the model name
    //  tableName: 'Employees',
    timestamps: true             //bydefault it's true,
  },
);

module.exports = Product
