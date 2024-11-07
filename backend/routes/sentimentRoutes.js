const express = require("express");
const {
  analyzeSentiment,
  getSentimentHistory,
  deleteSentiment,
} = require("../controller/sentimentController");
const router = express.Router();

router.post("/", analyzeSentiment);
router.get("/history", getSentimentHistory);
router.delete("/history/:id", deleteSentiment);

module.exports = router;
