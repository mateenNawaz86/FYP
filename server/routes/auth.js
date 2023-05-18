const express = require("express");
const router = express.Router();

// import the user controller
const authController = require("../controllers/authController");

// import the middleware for validation
const { validateUser, validate } = require("../middleware/validator");

// 1. Create a Signup route
router.post("/signup", validateUser, validate, authController.signUp);

// 2. Create a Login route
router.post("/signin", authController.signIn);

// 4. Create a POST route for forget-password
router.post("/reset-password", authController.resetPassword);

// Export the router
module.exports = router;
