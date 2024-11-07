const mongoose = require("mongoose");

const sentimentSchema = new mongoose.Schema({
  text: String,
  sentiment: Object,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Sentiment", sentimentSchema);
