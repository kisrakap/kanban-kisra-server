'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User)
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg: "Title must not empty"
        }
      },
      allowNull: {
        args: false,
        msg: "Title not null"
      }
    },
    detail: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg: "Detail must not empty"
        }
      },
      allowNull: {
        args: false,
        msg: "Detail not null"
      }
    },
    category: {
      type: DataTypes.STRING,
      defaulyValue: "backlog",
      validate:{
        notEmpty:{
          args: true,
          msg: "category must not empty"
        }
      },
      allowNull: {
        args: false,
        msg: "category not null"
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};