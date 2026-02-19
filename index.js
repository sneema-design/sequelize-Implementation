const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const { sequelize, connectDb } = require("./dbConnection");
const userRoutes = require("./routes/userRoutes");
const postRoutes=require("./routes/postRoutes")
const app = express();

// ✅ Body parser FIRST
app.use(express.json());

// ✅ Routes SECOND
app.use("/api/users", userRoutes);
app.use("/api/posts",postRoutes)

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
