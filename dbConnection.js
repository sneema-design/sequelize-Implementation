const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");
dotenv.config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  logging: false,
  port: process.env.DB_PORT || 5432,
});

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
