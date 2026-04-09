// NEW FEATURE START: AUTH MIDDLEWARE FULL

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Invalid token" });
  }
};

// NEW FEATURE END