const express = require("express");
const router = express.Router();

const feedbackController = require("../controllers/feedbackController");
const auth = require("../middleware/authMiddleware");

// 1. controller for handle the feedback
router.post("/feedback", auth, feedbackController.postFeedback);

module.exports = router;
