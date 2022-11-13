const express = require("express");
const router = express.Router();

// import the user controller
const userController = require("../controllers/userController");

// import the middleware for validation
const { validateUser, validate } = require("../middleware/validator");

// 1. Create a Signup route
router.post("/signup", validateUser, validate, userController.signUp_user);

// Export the router
module.exports = router;
