// NEW FEATURE START: FULL V115 FINAL APP.JS

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= ROUTES =================

// Root
app.get("/", (req, res) => {
  res.send("🚀 SaaS Backend is running");
});

// CTA → Upwork
app.get("/cta", (req, res) => {
  res.redirect(process.env.UPWORK_URL || "https://upwork.com");
});

// ================= MONGODB =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ================= MODELS =================

// Blog Post Model
const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
  })
);

// Lead Model (NEW)
const Lead = mongoose.model(
  "Lead",
  new mongoose.Schema({
    name: String,
    email: String,
    service: String,
    source: String,
    createdAt: { type: Date, default: Date.now },
  })
);

// ================= AUTO CONTENT =================
setInterval(async () => {
  try {
    await Post.create({
      title: "Auto Post",
      content: "SEO content generated...",
    });
    console.log("📝 New post created");
  } catch (err) {
    console.error(err);
  }
}, 60000);

// ================= API =================

// Blog API
app.get("/api/blog", async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  res.json(posts);
});

// Pipeline API
app.post("/api/pipeline/run", (req, res) => {
  const { keyword } = req.body;

  res.json({
    data: {
      title: `Best ${keyword} Services`,
      content: `This is AI generated content for ${keyword}. We help you get professional results for Amazon KDP and ebook publishing.`,
      funnel: {
        link: process.env.UPWORK_URL || "https://www.upwork.com",
      },
    },
  });
});

// ================= LEAD SYSTEM (V115) =================

// Save Lead
app.post("/api/lead", async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();

    res.json({
      success: true,
      message: "Lead saved successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Get Leads (for dashboard later)
app.get("/api/lead", async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json(leads);
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// NEW FEATURE END