const express = require("express");
const router = express.Router();

// Import the required controllers
const { createUser, showAllUser, deleteUser, editUser } = require("../controllers/User");
const { auth } = require("../middlewares/auth");


//Route for user create, delete, edit and show
router.post("/createUser", auth, createUser);
router.get("/showAllUser", showAllUser);
router.post("/deleteUser", auth, deleteUser);
router.post("/editUser", auth, editUser);



module.exports = router;