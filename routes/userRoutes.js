const express = require("express");
const upload = require("../middleware/upload");
const {  createUser,getAllUser, getUserById, updateUser, deleteUser, filterUser } = require("../controller/userController");

const router = express.Router();

router.post("/", createUser);
router.get("/all",getAllUser)
router.get("/:id",getUserById)
router.post("/:id",updateUser)
router.delete("/:id",deleteUser)
router.get("/",filterUser)
module.exports = router;
