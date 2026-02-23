const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const { sequelize, connectDb } = require("./dbConnection");

const app = express();

app.use(express.json());


const routes=require("./routes")
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


app.use("/api", routes);

