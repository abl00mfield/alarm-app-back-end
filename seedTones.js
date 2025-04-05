const mongoose = require("mongoose");
const Tone = require("./models/tone.js");
require("dotenv").config();

const seedTones = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongo DB connected");

    const existingDefaultTones = await Tone.countDocuments({ isDefault: true });

    if (existingDefaultTones > 0) {
      console.log("Default tones already exist.  Skipping seeding");
    } else {
      const defaultTones = [
        {
          toneName: "Classic Alarm",
          fileUrl: "/sounds/classic-alarm.wav",
          uploadedBy: null,
          isDefault: true,
        },
        {
          toneName: "Classic Winner",
          fileUrl: "/sounds/classic-winner.wav",
          uploadedBy: null,
          isDefault: true,
        },
        {
          toneName: "Digital Clock",
          fileUrl: "/sounds/digital-clock.wav",
          uploadedBy: null,
          isDefault: true,
        },
        {
          toneName: "Fairy Message",
          fileUrl: "/sounds/fairy-message.wav",
          uploadedBy: null,
          isDefault: true,
        },
        {
          toneName: "Marimba",
          fileUrl: "/sounds/marimba.wav",
          uploadedBy: null,
          isDefault: true,
        },
        {
          toneName: "Morning Alarm",
          fileUrl: "/sounds/morning-alarm.wav",
          uploadedBy: null,
          isDefault: true,
        },
        {
          toneName: "Old Telphone",
          fileUrl: "/sounds/old-telephone.wav",
          uploadedBy: null,
          isDefault: true,
        },
        {
          toneName: "Retro game",
          fileUrl: "/sounds/retro-game.wav",
          uploadedBy: null,
          isDefault: true,
        },
        {
          toneName: "Simple Tone",
          fileUrl: "/sounds/simple-tone.wav",
          uploadedBy: null,
          isDefault: true,
        },
        {
          toneName: "Toy Telephone",
          fileUrl: "/sounds/classic-alarm.wav",
          uploadedBy: null,
          isDefault: true,
        },
        {
          toneName: "Vintage Phone",
          fileUrl: "/sounds/vintage-phone.wav",
          uploadedBy: null,
          isDefault: true,
        },
        {
          toneName: "Warning alarm",
          fileUrl: "/sounds/warming-alarm.wav",
          uploadedBy: null,
          isDefault: true,
        },
      ];

      await Tone.insertMany(defaultTones);
      console.log("Default tones successfully seeded.");
    }
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("Error seeding tones", error.message);
    await mongoose.disconnect();
    console.log("Mongo DB disconnected");
  }
};

seedTones();
