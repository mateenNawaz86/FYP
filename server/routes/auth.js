import express from "express";
const router = express.Router();

// import the user controller
import { signUp, signIn } from "../controllers/authController.js";

// import the middleware for validation
import { validateUser, validate } from "../middleware/validator.js";

// 1. Create a Signup route
router.post("/signup", validateUser, validate, signUp);

// 2. Create a Login route
router.post("/signin", validateUser, validate, signIn);

// Export the router
export default router;
