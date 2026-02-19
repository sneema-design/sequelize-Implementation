const express=require("express");
const {createPost,getAllPost}=require("../controller/postController");
const router=express();
router.post("/post",createPost);
router.get("/post",getAllPost);

module.exports=router