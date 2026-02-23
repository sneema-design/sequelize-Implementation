const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentsRoutes");
const transactionRoutes = require("./transactionRouter");

// mount them here
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/transaction", transactionRoutes);

module.exports = router;