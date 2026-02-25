const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const PORT = process.env.PORT || 8080;

const errorHandler = require("./middleware/error.middleware");
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/health", (rew, res) => {
  return res.status(200).json("server is healthy");
});
app.use("/api", routes); 
app.use(errorHandler);
async function startServer() {
  try { 
    // await connectDb();
    // console.log("pass:", process.env.DB_PASS);
 
    app.listen(PORT, () => { 
      console.log("server is running");
    });
  } catch (error) {
    console.error(error);
  } 
}

startServer();
