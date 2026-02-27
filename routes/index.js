const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentsRoutes");
const transactionRoutes = require("./transactionRouter");
const likeRoutes=require("./likeRoutes")
const threadRoutes=require("./threadRoutes")
// mount them here
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/transaction", transactionRoutes);
router.use("/like",likeRoutes);
router.use("/thread",threadRoutes)
module.exports = router;