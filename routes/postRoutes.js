const express=require("express");
const {createPost,getAllPost, getPostById, deletePostById, getPostByUserId, updatePostById}=require("../controller/postController");
const upload = require("../config/multer.config");
const validate = require("../middleware/validate.middleware");
const { createPostValidation, updatePostValidation } = require("../validation/postValidation");
const router=express();
router.post("/",upload.single("image"),validate(createPostValidation),createPost);
router.get("/",getAllPost);
router.get("/:id",getPostById)
router.post("/update/:id",upload.single("image"),validate(updatePostValidation),updatePostById)
router.delete("/:id",deletePostById)
router.get("/user/:id",getPostByUserId)
module.exports=router