const express =require("express");
const {cashIn, cashOut}=require("../controller/transactionController");
const router=express()
router.post("/cashin",cashIn)
router.post("/cashout",cashOut)
module.exports=router;