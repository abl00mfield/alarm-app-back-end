const express = require("express");
const router = express.Router();

const Tone = require("../models/tone.js");

//GET index route /tones/
//returns all default tones in the database
//not protected, any user checking out the app
//can see the default toness

router.get("/", async (req, res) => {
  try {
    const tones = await Tone.find({ isDefault: true });
    res.status(200).json(tones);
  } catch (error) {
    console.error("Error fetching default tones");
    res.status(500).json({ message: "Server error while fetching tones" });
  }
});

module.exports = router;
