const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileController");

// 1. Route for creating a service provider profile
router.post("/profile", profileController.postProfile);

module.exports = router;
