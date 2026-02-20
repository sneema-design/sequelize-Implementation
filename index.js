const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const { connectDb } = require("./dbConnection");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentsRoutes");
const transactionRoutes=require("./routes/transactionRoutes")
const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/transaction",transactionRoutes)
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
