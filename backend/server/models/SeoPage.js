const mongoose = require("mongoose");

const SeoPageSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  content: String,
  keywords: [String],
  createdAt: { type: Date, default: Date.now },

  // NEW FEATURE START
  schema: Object,
  internalLinks: String,
  // NEW FEATURE END
});

module.exports = mongoose.model("SeoPage", SeoPageSchema);