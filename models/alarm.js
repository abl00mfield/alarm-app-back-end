const mongoose = require("mongoose");

const alarmSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      //the application will contain a drop down list of preloaded tones
      type: String,
      required: true,
    },
    time: {
      //the time the alarm will go off
      type: String,
      required: true,
    },
    tone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tone",
    },
    snoozeOn: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      required: true,
    },
    snoozeTime: {
      type: Number,
      default: 9,
    },
  },

  { timestamps: true }
);

const Alarm = mongoose.model("Alarm", alarmSchema);
module.exports = Alarm;
