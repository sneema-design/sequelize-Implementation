const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");
dotenv.config();
const sequelize = new Sequelize("demodb", "postgres", process.env.DB_PASS, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
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
