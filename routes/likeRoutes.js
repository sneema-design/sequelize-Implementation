const express =require("express");
const {createLike, getAllLikes, getLikeById, getLikeByUserId, getLikeByPostId}=require("../controller/likeController");
const validate = require("../middleware/validate.middleware");
const { createLikeSchema } = require("../validation/likeValidation");

const router=express();
router.post("/",validate(createLikeSchema),createLike)
router.get("/",getAllLikes)
router.get("/:id",getLikeById);
router.get("/user/:id",getLikeByUserId);
router.get("/post/:id",getLikeByPostId)
module.exports=router