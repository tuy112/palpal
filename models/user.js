'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      // define association here
    }
  }
  user.init({
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userDesc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};