const express = require("express");
const upload = require("../config/multer.config");
const {  createUser,getAllUser, getUserById, updateUser, deleteUser, filterUser, login, getUserByToken } = require("../controller/userController");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", upload.single("image"), createUser);
router.post("/login",login)
router.get("/profile",getUserByToken)
router.get("/all",getAllUser)
router.get("/:id",authMiddleware,getUserById)
router.post("/:id",updateUser)
router.delete("/:id",deleteUser)
router.get("/",filterUser)

module.exports = router;
 