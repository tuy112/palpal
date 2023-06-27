'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class board extends Model {
    static associate(models) {
      // define association here
    }
  }
  board.init({
    image: DataTypes.BLOB,
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'board',
  });
  return board;
};