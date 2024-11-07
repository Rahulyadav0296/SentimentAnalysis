require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const axios = require("axios");
const connectDB = require("./config/db");
const sentimentRoutes = require("./routes/sentimentRoutes");
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/sentiment", sentimentRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on the PORT: ${PORT}`));
