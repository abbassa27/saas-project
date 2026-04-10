// NEW FEATURE START - LEAD MODEL

const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  service: String,
  source: String,
  score: Number,
  status: String,
  createdAt: Date,
});

module.exports = mongoose.model("Lead", LeadSchema);

// NEW FEATURE END