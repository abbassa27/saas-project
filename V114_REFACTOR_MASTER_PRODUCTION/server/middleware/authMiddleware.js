
// =====================
// 🚀 NEW FEATURE START: AUTH MIDDLEWARE (PROTECTION)
// =====================
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "secret";

module.exports = (req,res,next)=>{
    const token = req.headers.authorization;
    if(!token) return res.status(401).json({error:"No token"});
    try{
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    }catch(e){
        return res.status(401).json({error:"Invalid token"});
    }
};
// =====================
// 🚀 NEW FEATURE END
// =====================
