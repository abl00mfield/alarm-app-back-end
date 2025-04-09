const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const Alarm = require("../models/alarm");
const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    req.body.owner = req.user._id;
    const alarm = await Alarm.create(req.body);
    const popluatedAlarm = await alarm.populate(["tone", "owner"]);
    popluatedAlarm._doc.owner = req.user;

    res.status(201).json(popluatedAlarm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/", verifyToken, async (req, res) => {
  try {
    const alarms = await Alarm.find({ owner: req.user._id })
      .populate(["owner", "tone"])
      .sort({ time: "asc" });
    res.status(200).json(alarms);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: err.message });
  }
});

router.get("/:alarmId", verifyToken, async (req, res) => {
  try {
    const alarm = await Alarm.findById(req.params.alarmId).populate([
      "owner",
      "tone",
    ]);
    res.status(200).json(alarm);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.put("/:alarmId", verifyToken, async (req, res) => {
  try {
    const alarm = await Alarm.findById(req.params.alarmId);
    if (!alarm) {
      return res.status(404).send("Alarm not found");
    }

    if (!alarm.owner || !alarm.owner.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }
    const updatedAlarm = await Alarm.findByIdAndUpdate(
      req.params.alarmId,
      req.body,
      { new: true }
    );
    updatedAlarm._doc.owner = req.user;
    res.status(200).json(updatedAlarm);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

router.delete("/:alarmId", verifyToken, async (req, res) => {
  try {
    const alarm = await Alarm.findById(req.params.alarmId);

    if (!alarm.owner.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    const deletedAlarm = await Alarm.findByIdAndDelete(req.params.alarmId);
    res.status(200).json(deletedAlarm);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
