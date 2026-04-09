// =====================
// 🚀 NEW FEATURE START: CLEAN DASHBOARD ROUTES
// =====================

const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { getState } = require("../core/dataHub");

// Main dashboard
router.get("/", auth, async (req, res) => {
  const data = await getState();
  res.json(data);
});

// Leads
router.get("/leads", auth, async (req, res) => {
  const mongoose = require("mongoose");
  const Lead = mongoose.model("Lead");

  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json(leads);
});

// Posts
router.get("/posts", auth, async (req, res) => {
  const mongoose = require("mongoose");
  const Post = mongoose.model("Post");

  const posts = await Post.find().sort({ date: -1 });
  res.json(posts);
});

// =====================
// 🚀 NEW FEATURE END
// =====================

module.exports = router;