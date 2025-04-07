const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const Alarm = require("../models/alarm");
const router = express.Router();



// add routes here
 router.post("/", verifyToken, async (req, res) => {
    try {
        req.body.author = req.user._id;
      const alarm = await Alarm.create(req.body);
      alarm._doc.author = req.user;
      res.status(201).json(alarm);
    } catch (error) {
       res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
