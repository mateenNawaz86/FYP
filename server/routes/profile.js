const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileController");
const authenticate = require("../middleware/authenticate");
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
router.get("/profile-detail/:id", profileController.getProfileDetail);

// 5. Route for search a profile with skill
router.get("/search-profile", profileController.getSearchedProfile);

// 6. Route for GET profile
router.get("/profile-detail", authenticate, profileController.getProfile);

module.exports = router;
