const mongoose = require("mongoose");
const Tone = require("../models/tone.js"); // path to your model
require("dotenv").config();

const fixTone = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const updatedTone = await Tone.findByIdAndUpdate(
      "67f063e0e4cc4da493222d53",
      { toneName: "Old Telephone" },

      { new: true } // return the updated document
    );

    if (updatedTone) {
      console.log("✅ Tone updated:", updatedTone);
    } else {
      console.log("⚠️ Tone not found.");
    }

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Error updating tone:", err.message);
    await mongoose.disconnect();
  }
};

fixTone();
