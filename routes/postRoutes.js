const express=require("express");
const {createPost,getAllPost, getPostById, deletePostById, getPostByUserId, updatePostById}=require("../controller/postController");
const upload = require("../config/multer.config");
const router=express();
router.post("/",upload.single("image"),createPost);
router.get("/",getAllPost);
router.get("/:id",getPostById)
router.post("/update/:id",upload.single("image"),updatePostById)
router.delete("/:id",deletePostById)
router.get("/user/:id",getPostByUserId)
module.exports=router