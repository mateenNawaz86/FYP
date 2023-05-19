const express = require("express");
const router = express.Router();

// 1. import the user controller
const authController = require("../controllers/authController");

// 2. import the middleware for validation
const { validateUser, validate } = require("../middleware/validator");

// 3. Create a Signup route
router.post("/signup", validateUser, validate, authController.signUp);

// 4. Create a Login route
router.post("/signin", authController.signIn);

// 5. Create a POST route for reset-password email sending
router.post("/reset-password", authController.forgotPassword);

// 6. Create a POST route for chaning psw through link
router.post("/reset-password/:token", authController.postResetPsw);

// Export the router
module.exports = router;
