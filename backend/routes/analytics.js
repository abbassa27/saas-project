// NEW FEATURE START - ANALYTICS

const express = require("express");
const router = express.Router();

let stats = {
  views: 0,
  clicks: 0,
  leads: 0,
};

router.post("/view", (req, res) => {
  stats.views++;
  res.json(stats);
});

router.post("/click", (req, res) => {
  stats.clicks++;
  res.json(stats);
});

router.post("/lead", (req, res) => {
  stats.leads++;
  res.json(stats);
});

router.get("/", (req, res) => {
  res.json(stats);
});

module.exports = router;

// NEW FEATURE END