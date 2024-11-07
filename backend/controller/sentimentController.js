const axios = require("axios");
const Sentiment = require("../models/sentimentModal");

const getSentiment = (result) => {
  if (result >= 0.9) {
    return "Very Positive Sound 😊";
  } else if (result >= 0.5) {
    return "Positive Sound 🙂";
  } else if (result === 0) {
    return "Neutral Sound 😐";
  } else if (result > 0) {
    return "Not Good but also not bad 😕"; // Result between 0 and 0.5
  } else {
    return "Negative Sound ☹️"; // Result less than 0
  }
};

const analyzeSentiment = async (req, res) => {
  const { text } = req.body;

  try {
    // Send a POST request to the Flask API
    const response = await axios.post(
      "http://127.0.0.1:5001/analyze",
      {
        text,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("Response coming from the Flask API:", response.data);
    const sentimentScore = response.data.compound;
    const sentimentCategory = getSentiment(sentimentScore);

    const newSentiment = new Sentiment({
      text: text,
      sentiment: sentimentCategory,
    });

    // Save the sentiment analysis result to MongoDB
    await newSentiment.save();

    // Send the saved result back to the client
    res.status(200).json(newSentiment);
  } catch (error) {
    console.error("Error analyzing sentiment:", error.message);
    res.status(500).send("Error analyzing sentiment");
  }
};

const getSentimentHistory = async (req, res) => {
  try {
    const history = await Sentiment.find().sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error("Error retrieving history:", error.message);
    res.status(500).send("Error retrieving history");
  }
};

const deleteSentiment = async (req, res) => {
  const { id } = req.params;

  console.log("Id is coming from server: ", id);

  try {
    const history = await Sentiment.findByIdAndDelete(id);

    if (!history) {
      return res.status(404).json({ message: "History not Found" });
    }

    res.status(200).json({ message: "History Deleted Successfully!" });
  } catch (error) {
    console.error(error); // Log the error to the console for debugging
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

module.exports = { analyzeSentiment, getSentimentHistory, deleteSentiment };
