
// =====================
// 🚀 NEW FEATURE START: REAL DASHBOARD API
// =====================
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getState } = require("../core/dataHub");

router.get("/", auth, (req,res)=>{
    res.json(getState());
});

module.exports = router;
// =====================
// 🚀 NEW FEATURE END
// =====================
