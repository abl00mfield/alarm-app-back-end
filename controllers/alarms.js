const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const Alarm = require("../models/alarm");
const router = express.Router();



// add routes here
 router.post("/", verifyToken, async (req, res) => {
    try {
        req.body.owner = req.user._id;
      const alarm = await Alarm.create(req.body);
      alarm._doc.owner = req.user;
      res.status(201).json(alarm);
    } catch (error) {
       res.status(500).json({ error: error.message });
    }
  });
  router.get("/", verifyToken, async (req, res) => {
    try {
      const alarms = await Alarm.find({})
        .populate("owner")
        .sort({ createdAt: "desc" });
      res.status(200).json(alarms);
    } catch (error) {
        console.log(error);
      res.status(500).json({ err: err.message });
    }
  });

module.exports = router;
