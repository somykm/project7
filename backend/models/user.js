'use strict';
const {DataTypes, Model} =require('sequelize');
const sequelize = require('../config/database');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email:{
      type:DataTypes.STRING,
      allowNull: false,
      unique:{
        name:'unique_email',
        msg:'Email address already in use!'
      },
      validate:{
        isEmail: {
          msg: 'Must be a valid email address'
        },
        notEmpty: {
          msg: 'Email field cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password field cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};