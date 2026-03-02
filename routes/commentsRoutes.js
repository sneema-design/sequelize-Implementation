const express = require("express");
const {
  createComments,
  getAllComments,
  getCommentsById,
  getCommentsByUserId,
  getCommentsByPostId
} = require("../controller/commentController");
const validate = require("../middleware/validate.middleware");
const { createCommentSchema } = require("../validation/commentValidation");

const { router } = express();
router.post("/",validate(createCommentSchema), createComments);
router.get("/", getAllComments);
router.get("/:id",getCommentsById);
router.get("/user/:id",getCommentsByUserId)
router.get("/post/:id",getCommentsByPostId)
module.exports = router;
