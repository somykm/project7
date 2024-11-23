const { Sequelize, DataTypes, Model } = require('sequelize');


const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres' 
});


class User extends Model {}

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'Email address already in use!'
    },
    validate: {
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
}, 
{
  sequelize,
  modelName: 'User',
  tableName: 'users', // Specify table name 
  timestamps: true // Automatically add createdAt and updatedAt fields
});

module.exports = User;
module.exports = sequelize;
