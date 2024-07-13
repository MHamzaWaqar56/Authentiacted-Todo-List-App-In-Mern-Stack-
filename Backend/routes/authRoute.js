const express = require("express");
const {
  loginController,
  registerController,
  forgotPasswordController,
} = require("../controllers/userController");
const router = express.Router();

// registration route
router.post("/register", registerController);

// Login route
router.post("/login", loginController);

// Forgot Password route
router.post("/forgotpassword", forgotPasswordController);

module.exports = router;
