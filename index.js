const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const { sequelize, connectDb } = require("./dbConnection");
const app = express();
const routes = require("./routes");
const errorHandler = require("./middleware/error.middleware");
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", routes);
app.use(errorHandler);
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
 