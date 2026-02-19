const express = require("express");
const {
  createComments,
  getAllComments,
} = require("../controller/commentController");

const { router } = express();
router.post("/", createComments);
router.get("/", getAllComments);

module.exports = router;
