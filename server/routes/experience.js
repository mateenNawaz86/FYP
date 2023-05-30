const express = require("express");
const router = express.Router();

const expController = require("../controllers/experienceController");
const { validateDate, validate } = require("../middleware/dateValidator");
const authenticate = require("../middleware/authenticate");

// 1. POST route for experience
router.post(
  "/experience",
  validateDate,
  validate,
  expController.postExperience
);

// 2. GET route for experience
router.get("/experience", authenticate, expController.getExperience);

module.exports = router;
