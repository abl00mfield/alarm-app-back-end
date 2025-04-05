const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const Alarms = require("../models/user.js");
const router = express.Router();
const alarmsRouter = require('./controllers/alarms.js');

mongoose.connect(process.env.MongoDB_URI);

mongoose.connection.on('connected', ()=> {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
})

// add routes here

module.exports = router;
