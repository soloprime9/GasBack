require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(cors({
    origin: "*",
}));

// MongoDB Connection
mongoose.connect("mongodb+srv://javapython5750:soloprime9@abdikansh.5ae2w.mongodb.net/?retryWrites=true&w=majority&appName=Abdikansh")



.then((result) => {
    console.log("Connected to Database");
})
.catch((error) => {
    console.log("Not Connected to Database");
})
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

app.get("/", async(req, res)=> {
    res.send("hello Gas Predictor")
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
