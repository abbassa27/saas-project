// NEW FEATURE START: V116 CLEAN BACKEND FULL

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= LOGGER =================
app.use((req,res,next)=>{
  console.log(`📡 ${req.method} ${req.url}`);
  next();
});

// ================= ROUTES =================

// Root
app.get("/", (req, res) => {
  res.send("🚀 SaaS Backend CLEAN V116");
});

// CTA
app.get("/cta", (req, res) => {
  res.redirect(process.env.UPWORK_URL || "https://upwork.com");
});

// ================= AUTH =================
const jwt = require("jsonwebtoken");

app.post("/api/auth/login", (req, res) => {
  const { email } = req.body;

  const token = jwt.sign({ email }, process.env.JWT_SECRET || "secret", {
    expiresIn: "7d",
  });

  res.json({ token });
});

// ================= MONGODB =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ================= MODELS =================
const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
  })
);

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
  } catch (err) {
    console.error(err);
  }
}, 60000);

// ================= API =================

// Blog
app.get("/api/blog", async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  res.json(posts);
});

// Pipeline
app.post("/api/pipeline/run", (req, res) => {
  const { keyword } = req.body;

  res.json({
    data: {
      title: `Best ${keyword} Services`,
      content: `AI content for ${keyword}`,
      funnel: {
        link: process.env.UPWORK_URL || "https://www.upwork.com",
      },
    },
  });
});

// ================= LEADS =================
app.post("/api/lead", async (req, res) => {
  const lead = new Lead(req.body);
  await lead.save();
  res.json({ success: true });
});

// ================= DASHBOARD =================
const dashboardRoute = require("./routes/dashboard");
app.use("/api/dashboard", dashboardRoute);

// ================= AI =================
app.post("/api/ai/generate", async (req, res) => {
  const { prompt } = req.body;
  res.json({ result: `AI Generated: ${prompt}` });
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// NEW FEATURE END