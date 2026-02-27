const express =require("express")
const { createThread, getAllThread, getThreadById, getThreadByCommentId } = require("../controller/threadController");
const router= express()

router.post("/",createThread),
router.get("/",getAllThread),
router.get("/:id",getThreadById);
router.get("/comment/:id",getThreadByCommentId)


module.exports=router