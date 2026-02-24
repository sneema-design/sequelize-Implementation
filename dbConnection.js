const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");
const { sequelize } = require("./models");
dotenv.config();

async function connectDb(params) {
  try {
    await sequelize.authenticate();
    console.log("Db connected");
  } catch (error) {
    console.error("Db connection failed", error);
  }
}

module.exports = {
  sequelize,
  connectDb,
};
