const express = require("express");
const router = express.Router();

const feedbackController = require("../controllers/feedbackController");
const authMiddleware = require("../middleware/authMiddleware");

// 1. controller for handle the feedback
router.post("/feedback", authMiddleware, feedbackController.postFeedback);

module.exports = router;
