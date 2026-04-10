// ================= EXISTING IMPORTS =================
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// NEW FEATURE START
require("dotenv").config();
// NEW FEATURE END

const app = express();
app.use(cors());
app.use(express.json());

// ================= EXISTING ROUTES =================
// (كل routes القديمة تبقى كما هي)

// ================= DATABASE =================
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ================= MODELS =================
const SeoPage = require("./models/SeoPage");

// ===================================================
// NEW FEATURE START
// 🔥 NEXT LEVEL SEO ENGINE (V120)
// ===================================================

// ================= 1. KEYWORD ENGINE =================
function generateKeywordVariations(baseKeyword) {
  const intents = [
    "for beginners",
    "for amazon kdp",
    "for authors",
    "cheap",
    "professional",
    "best",
  ];

  const niches = [
    "romance",
    "horror",
    "fantasy",
    "business",
    "self help",
  ];

  const locations = ["usa", "uk", "canada", "australia"];

  let keywords = [];

  intents.forEach((intent) => {
    keywords.push(`${baseKeyword} ${intent}`);
  });

  niches.forEach((niche) => {
    keywords.push(`${baseKeyword} for ${niche}`);
  });

  locations.forEach((loc) => {
    keywords.push(`${baseKeyword} in ${loc}`);
  });

  return [...new Set(keywords)];
}

// ================= 2. INTERNAL LINKING =================
async function generateInternalLinks(currentSlug) {
  try {
    const pages = await SeoPage.find().limit(10);

    return pages
      .filter((p) => p.slug !== currentSlug)
      .map(
        (p) => `<a href="/${p.slug}" style="color:blue">${p.title}</a>`
      )
      .join(" | ");
  } catch (err) {
    return "";
  }
}

// ================= 3. SEO SCHEMA GENERATOR =================
function generateSchema(page) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.content?.slice(0, 150),
    author: {
      "@type": "Person",
      name: "Abbassa Malik",
    },
  };
}

// ================= 4. CONTENT UPGRADE =================
function enhanceContent(content, keyword) {
  return `
    <h1>${keyword}</h1>
    <p>${content}</p>

    <h2>FAQ</h2>
    <p><strong>What is ${keyword}?</strong></p>
    <p>${keyword} is a professional service.</p>

    <h2>Get Started</h2>
    <a href="https://www.upwork.com/" target="_blank">
      Hire me on Upwork
    </a>
  `;
}

// ================= 5. BULK GENERATOR V2 =================
app.post("/api/seo/generate-advanced", async (req, res) => {
  try {
    const { baseKeyword } = req.body;

    const keywords = generateKeywordVariations(baseKeyword);

    let createdPages = [];

    for (let keyword of keywords) {
      const slug = keyword.replace(/\s+/g, "-").toLowerCase();

      const existing = await SeoPage.findOne({ slug });
      if (existing) continue;

      const internalLinks = await generateInternalLinks(slug);

      const content = enhanceContent(
        `This page is about ${keyword}.`,
        keyword
      );

      const newPage = new SeoPage({
        title: keyword,
        slug,
        content: content + `<div>${internalLinks}</div>`,
        keywords: [keyword],
      });

      await newPage.save();

      createdPages.push(newPage);
    }

    res.json({
      success: true,
      count: createdPages.length,
      pages: createdPages,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Generation failed" });
  }
});

// ===================================================
// NEW FEATURE START
// 🧠 SMART MATCHING ENGINE
// ===================================================

async function smartFindPage(slug) {
  try {
    // 1. Exact match
    let page = await SeoPage.findOne({ slug });
    if (page) return page;

    // 2. Partial match (any keyword inside slug)
    const words = slug.split("-");

    page = await SeoPage.findOne({
      slug: { $regex: words.join("|"), $options: "i" },
    });

    if (page) return page;

    // 3. Fallback (first word match)
    page = await SeoPage.findOne({
      slug: { $regex: words[0], $options: "i" },
    });

    return page;
  } catch (err) {
    return null;
  }
}

// ===================================================
// NEW FEATURE END
// ===================================================

// ================= 6. GET PAGE WITH SCHEMA =================
app.get("/api/seo/page/:slug", async (req, res) => {
  try {

// NEW FEATURE START
    const page = await smartFindPage(req.params.slug);
// NEW FEATURE END

    if (!page) {
      return res.status(404).json({ error: "Not found" });
    }

    const schema = generateSchema(page);

    res.json({
      ...page._doc,
      schema,
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching page" });
  }
});

// ================= 7. TEST ROUTE (GET FOR BROWSER) =================
// NEW FEATURE START
app.get("/api/seo/generate-advanced-test", async (req, res) => {
  try {
    const baseKeyword = "book cover design";

    const keywords = generateKeywordVariations(baseKeyword);

    let createdPages = [];

    for (let keyword of keywords) {
      const slug = keyword.replace(/\s+/g, "-").toLowerCase();

      const existing = await SeoPage.findOne({ slug });
      if (existing) continue;

      const internalLinks = await generateInternalLinks(slug);

      const content = enhanceContent(
        `This page is about ${keyword}.`,
        keyword
      );

      const newPage = new SeoPage({
        title: keyword,
        slug,
        content: content + `<div>${internalLinks}</div>`,
        keywords: [keyword],
      });

      await newPage.save();

      createdPages.push(newPage);
    }

    res.json({
      success: true,
      count: createdPages.length,
      pages: createdPages,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Test generation failed" });
  }
});
// NEW FEATURE END

// ===================================================
// NEW FEATURE END
// ===================================================

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});