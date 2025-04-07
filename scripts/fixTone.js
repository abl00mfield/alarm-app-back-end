const mongoose = require("mongoose");
const Tone = require("../models/tone.js"); // path to your model
require("dotenv").config();

const fixTone = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const updatedTone = await Tone.findOneAndUpdate(
      { toneName: "Toy Telephone" },
      { fileUrl: "/sounds/toy-telephone.wav" }, // ✅ corrected path
      { new: true } // return the updated document
    );

    if (updatedTone) {
      console.log("✅ Tone updated:", updatedTone);
    } else {
      console.log("⚠️ Tone not found.");
    }
    const updatedTone2 = await Tone.findOneAndUpdate(
      { toneName: "Warning alarm" },
      { fileUrl: "/sounds/warning-alarm.wav" }, // ✅ corrected path
      { new: true } // return the updated document
    );

    if (updatedTone2) {
      console.log("✅ Tone updated:", updatedTone2);
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
