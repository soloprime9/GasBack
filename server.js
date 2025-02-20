require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Schema for Gas Level History
const GasSchema = new mongoose.Schema({
  image: String, // Store Image URL
  gasLevel: Number,
  date: { type: Date, default: Date.now },
});

const GasData = mongoose.model("GasData", GasSchema);

// API to Save Gas Level
app.post("/save", async (req, res) => {
  try {
    const { image, gasLevel } = req.body;
    const newGasData = new GasData({ image, gasLevel });
    await newGasData.save();
    res.json({ success: true, message: "Data Saved!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API to Fetch Gas History
app.get("/history", async (req, res) => {
  try {
    const history = await GasData.find().sort({ date: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
