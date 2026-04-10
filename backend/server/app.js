// NEW FEATURE START - ENV FIX + SAFE DB CONNECT

require("dotenv").config({ path: __dirname + "/.env" }); // 🔥 FIX

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== DEBUG ENV =====
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Loaded" : "❌ Missing");

// ===== DB =====
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err.message));

// ===== ROUTES =====
const leadsRoute = require("../routes/leads");
app.use("/api/leads", leadsRoute);

// (اختياري)
try {
  const analyticsRoute = require("../routes/analytics");
  app.use("/api/analytics", analyticsRoute);
} catch {
  console.log("No analytics route");
}

try {
  const seoRoute = require("../routes/seo");
  app.use("/api/seo", seoRoute);
} catch {
  console.log("No SEO route");
}

// ===== TEST =====
app.get("/", (req, res) => {
  res.send("🚀 API RUNNING");
});

// ===== START =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});

// NEW FEATURE END