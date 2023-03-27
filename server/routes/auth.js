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

// 3. Create a GET route for forget-password
router.get("/forget-password", authController.getForgetPsw);

// 4. Create a POST route for forget-password
router.post("/forget-password", authController.postForgetPsw);

// 5. Create a GET route for reset-password
router.get("/reset-password/:id/:authToken", authController.getResetPsw);

// 6. Create a POST route for reset-password
router.post("/reset-password/:id/:authToken");

// Export the router
module.exports = router;
