"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Thread extends Model {
    static associate(models) {
      Thread.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE",
      });

      Thread.belongsTo(models.Comment, {
        foreignKey: "commentId",
        as: "comment",
        onDelete: "CASCADE",
      });
    }
  }

  Thread.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull:false,
      },
      commentId: {
        type:DataTypes.INTEGER,
        allowNull:false
      }
    },
    {
      sequelize,
      modelName: "Thread",
      timestamps: true,
    },
  );

  return Thread;
};
