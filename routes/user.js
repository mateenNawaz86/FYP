const express = require("express");
const router = express.Router();

// import the user controller
const userController = require("../controllers/userController");

// import the middleware for validation
const { validateUser, validate } = require("../middleware/validator");

// 1. Create a Signup route
router.post("/signup", validateUser, validate, userController.signUp_user);

// 2. Create a Login route
router.post("/login", validateUser, validate, userController.signIn);

// Export the router
module.exports = router;
