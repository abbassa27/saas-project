// NEW FEATURE START: V116 CLEAN BACKEND FULL

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use((req,res,next)=>{
  console.log(`📡 ${req.method} ${req.url}`);
  next();
});

// ================= ROUTES =================

app.get("/", (req, res) => {
  res.send("🚀 SaaS Backend CLEAN V116");
});

app.get("/cta", async (req, res) => {
  try {
    await Tracking.create({ type: "click", source: "cta" });
  } catch (err) {}
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

// ================= DB =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ================= MODELS =================
const Post = mongoose.model("Post", new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
}));

const Lead = mongoose.model("Lead", new mongoose.Schema({
  name: String,
  email: String,
  service: String,
  source: String,
  createdAt: { type: Date, default: Date.now },
}));

const Tracking = mongoose.model("Tracking", new mongoose.Schema({
  type: String,
  source: String,
  createdAt: { type: Date, default: Date.now },
}));

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

app.get("/api/blog", async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  res.json(posts);
});

app.post("/api/pipeline/run", (req, res) => {
  const { keyword } = req.body;
  res.json({
    data: {
      title: `Best ${keyword} Services`,
      content: `AI content for ${keyword}`,
      funnel: { link: process.env.UPWORK_URL || "https://www.upwork.com" },
    },
  });
});

app.post("/api/lead", async (req, res) => {
  const lead = new Lead(req.body);
  await lead.save();

  try {
    await Tracking.create({
      type: "conversion",
      source: lead.source || "unknown",
    });
  } catch (err) {}

  res.json({ success: true });
});

// ================= DASHBOARD =================
const dashboardRoute = require("./routes/dashboard");
app.use("/api/dashboard", dashboardRoute);

// ================= AI =================

const axios = require("axios");

app.get("/api/ai/generate", async (req, res) => {

  const prompt = "Write SEO blog about book cover design";

  let result;

  try {
    const orRes = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mixtral-8x7b-instruct",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    result = orRes.data.choices[0].message.content;

  } catch (err) {
    result = "AI fallback content";
  }

  res.json({ result });
});

// ================= SEO =================

const slugify = (text) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

const SeoPage = mongoose.model("SeoPage", new mongoose.Schema({
  keyword: String,
  slug: String,
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
}));

app.post("/api/seo/generate", async (req, res) => {
  const { keyword } = req.body;

  const page = await SeoPage.create({
    keyword,
    slug: slugify(keyword),
    title: keyword,
    content: `SEO content for ${keyword}`,
  });

  res.json(page);
});


// ================= AUTO SEO MACHINE =================
// 🔥 IMPORTANT: placed BEFORE slug route

// NEW FEATURE START
app.get("/api/seo/bulk-generate", async (req, res) => {

  const keywords = [
    "book cover design",
    "ebook formatting kdp",
    "kdp cover design",
    "kindle book formatting",
    "amazon kdp publishing",
    "professional book cover",
    "ebook layout design",
    "self publishing services",
    "kdp formatting service",
    "book cover designer freelance"
  ];

  let results = [];

  for (let keyword of keywords) {

    console.log("🚀 Generating:", keyword);

    let content;

    try {
      const aiRes = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "mistralai/mixtral-8x7b-instruct",
          messages: [
            {
              role: "user",
              content: `Write SEO optimized article about ${keyword}`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      content = aiRes.data.choices[0].message.content;

    } catch (err) {
      console.log("⚠️ AI failed → fallback");
      content = `SEO content for ${keyword}`;
    }

    const page = await SeoPage.create({
      keyword,
      slug: slugify(keyword),
      title: keyword,
      content,
    });

    results.push(page);
  }

  res.json({
    success: true,
    generated: results.length,
  });
});
// NEW FEATURE END


// ================= SLUG ROUTE =================
// 🔥 MUST BE LAST

app.get("/api/seo/:slug", async (req, res) => {
  const page = await SeoPage.findOne({ slug: req.params.slug });
  if (!page) return res.status(404).json({ error: "Not found" });
  res.json(page);
});


// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});