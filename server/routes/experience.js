const express = require("express");
const router = express.Router();

const expController = require("../controllers/experienceController");
const authenticate = require("../middleware/authenticate");
const { validateDate, validate } = require("../middleware/dateValidator");

// 1. POST route for experience
router.post(
  "/experience",
  authenticate,
  validateDate,
  validate,
  expController.postExperience
);

// 2. GET route for experience
router.get("/experience", authenticate, expController.getExperience);

module.exports = router;
