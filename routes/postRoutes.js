const express=require("express");
const {createPost,getAllPost}=require("../controller/postController");
const router=express();
router.post("/",createPost);
router.get("/",getAllPost);

module.exports=router