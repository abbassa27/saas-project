// NEW FEATURE START: DATA HUB SYSTEM

const mongoose = require("mongoose");

// Reuse existing models بدون تعديل
const Lead = mongoose.model("Lead");
const Post = mongoose.model("Post");

async function getState() {
  try {
    const totalLeads = await Lead.countDocuments();
    const totalPosts = await Post.countDocuments();

    const latestLeads = await Lead.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const latestPosts = await Post.find()
      .sort({ date: -1 })
      .limit(5);

    return {
      stats: {
        totalLeads,
        totalPosts,
      },
      latest: {
        leads: latestLeads,
        posts: latestPosts,
      },
    };
  } catch (err) {
    return {
      error: err.message,
    };
  }
}

module.exports = { getState };

// NEW FEATURE END