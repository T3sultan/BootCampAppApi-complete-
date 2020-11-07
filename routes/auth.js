const express = require("express");
const { register, login, getProfile, editProfile} = require("../controllers/auth");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile",protect,getProfile);
router.put("/profile",protect,editProfile);

module.exports = router;
