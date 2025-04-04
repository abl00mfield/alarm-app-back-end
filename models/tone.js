const mongoose = require("mongoose");

const toneSchema = new mongoose.Schema({
  toneName: {
    type: String,
    required: true,
  },
  fileUrl: {
    //path to where the file is located
    type: String,
    required: true,
  },
  uploadedBy: {
    //this will be null at first (default tones) but a stretch goal could allow users to upload their own tones
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  isDefault: {
    //lets you know if this is a system tone or belongs to a specific user
    type: Boolean,
    default: true,
  },
});

const Tone = mongoose.model("Tone", toneSchema);
module.exports = Tone;
