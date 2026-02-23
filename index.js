const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const path = require("path");
const { sequelize, connectDb } = require("./dbConnection");

const app = express();

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const routes = require("./routes");
app.use("/api", routes);

async function startServer() {
  try {
    await connectDb();
    console.log("pass:", process.env.DB_PASS);

    app.listen(8080, () => {
      console.log("server is running");
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();