// NEW FEATURE START

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express(); // ✅ لازم قبل أي use

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Route للتأكد أن السيرفر يعمل
app.get("/", (req, res) => {
  res.send("🚀 SaaS Backend is running");
});

// ✅ الاتصال بـ MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Model بسيط
const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
  })
);

// ✅ Auto content (كل دقيقة)
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

// ✅ API Blog
app.get("/api/blog", async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  res.json(posts);
});

// ✅ Funnel (CTA → Upwork)
app.get("/cta", (req, res) => {
  res.redirect(process.env.UPWORK_URL || "https://upwork.com");
});

// NEW FEATURE END


// NEW FEATURE START: PIPELINE API

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

// NEW FEATURE END


// NEW FEATURE START: SERVER START

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// NEW FEATURE END