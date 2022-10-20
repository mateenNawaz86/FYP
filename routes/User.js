import express from "express";
const router = express.Router();
import userController from "../controller/UserController.js";

// Route 1. Create a user
router.post("/user", userController.post);

export { router };
