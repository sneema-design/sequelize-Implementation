"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    }
    static findByEmail(email) {
      return this.findOne({ where: { email } });
    }
    async comparePassword(plainPassword) {
      return await bcrypt.compare(plainPassword, this.password);
    }
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: "userId",
        as: "posts",
      });
      User.hasMany(models.Comment, {
        foreignKey: "userId",
        as: "comment",
      });
      User.hasMany(models.Transaction, {
        foreignKey: "userId",
        as: "transactions",
      });
      User.hasMany(models.Like,{
        foreignKey:"userId",
        as:"likes"
      });

    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        defaultValue: 18,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"",
      },
      refreshToken:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue:""
      }
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (User) => {
          const salt = await bcrypt.genSalt(10);
          User.password = await bcrypt.hash(User.password, salt);
        },
        afterCreate: async (User) => {
          console.log(User.email);
        },
      },
      timestamps: true,
    },
  );
  return User;
};
