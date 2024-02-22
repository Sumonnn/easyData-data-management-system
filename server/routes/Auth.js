const express = require("express");
const router = express.Router();

// Import the required controllers
const { login, signup, sendOTP } = require("../controllers/Auth");


//Route for user login,signup and sendOTP
router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendOTP);



module.exports = router;