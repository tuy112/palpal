// models>userinfos.js

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInfos extends Model {
    static associate(models) {

      this.belongsTo(models.Users, { // UserInfos => Users = 1:1
        targetKey: 'userId', // Users의 userId를
        foreignKey: 'userId', // UserInfos의 userId와 연결합니다.
      });
    }
  }
  UserInfos.init(
    {
      userInfoId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key
        type: DataTypes.INTEGER,
      },
      // ==================================================
      userId: { // Foreign Key
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
        unique: true,
      },
      // ==================================================
      nickname: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
        unique: true,
      },
      userDesc: {
        allowNull: true, // NULL
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'UserInfos',
    }
  );
  return UserInfos;
};
