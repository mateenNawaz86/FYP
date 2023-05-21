const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileController");
const { validateUser, validate } = require("../middleware/profileValidator");

// 1. Route for getting the user profile
router.get("/profile", profileController.getProfiles);

// 2. Route for creating a service provider profile
router.post(
  "/create-profile",
  validateUser,
  validate,
  profileController.postProfile
);

// 3. Route for sign in seller profile
router.post("/seller-signIn", profileController.signSeller);

// 4. Route for getting the single profile detail
router.get("/profile-detail/:id", profileController.getProfile);

// 5. Route for search a profile with skill
router.get("/search-profile", profileController.getSearchedProfile);

module.exports = router;
