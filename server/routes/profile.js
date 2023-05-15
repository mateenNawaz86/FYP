const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileController");
const { validateUser, validate } = require("../middleware/profileValidator");

// 1. Route for getting the user profile
router.get("/profile", profileController.getProfiles);

// 2. Route for creating a service provider profile
router.post("/profile", validateUser, validate, profileController.postProfile);

// 3. Route for getting the single profile detail
router.get("/profile-detail/:id", profileController.getProfile);

module.exports = router;
