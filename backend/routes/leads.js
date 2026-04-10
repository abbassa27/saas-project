// NEW FEATURE START - FIX LEADS ROUTE

const express = require("express");
const router = express.Router();

// TEST ROUTE
router.get("/", async (req, res) => {
  try {
    // مؤقتاً بدون DB
    res.json({
      success: true,
      leads: [],
    });
  } catch (error) {
    console.log("Leads error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch leads",
    });
  }
});

module.exports = router;

// NEW FEATURE END