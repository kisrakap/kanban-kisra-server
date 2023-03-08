'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task)
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username has been registered"
      },
      validate: {
        notEmpty:{
          args: true,
          msg: "Username required"
        },
        len: {
          args: [5],
          msg: "Minimal 5 karakter"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email has been registered"
      },
      validate: {
        notEmpty:{
          args: true,
          msg: "Email required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          args: true,
          msg: "Password required"
        }
      }
    },
    organization: {
      type: DataTypes.STRING,
      defaultValue: "Hacktiv8"
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate(User){
        User.password = hash(User.password)
      }
    }
  });
  return User;
};