const express=require("express");
const mongoose=require("mongoose");
require("dotenv").config();

const app=express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const Post=require("mongoose").model("Post",new mongoose.Schema({
 title:String,content:String,date:{type:Date,default:Date.now}
}));

setInterval(async ()=>{
 await Post.create({title:"Auto Post",content:"SEO content"});
},60000);

app.get("/api/blog",async(req,res)=>{
 res.json(await Post.find().sort({date:-1}));
});

app.get("/cta",(req,res)=>res.redirect(process.env.UPWORK_URL));

app.listen(5000);


// =====================
// 🚀 NEW FEATURE START: MASTER REFACTOR INTEGRATION
// =====================
try {
  const dashboardRoutes = require("./routes/dashboard");
  const { trackEvent } = require("./core/dataHub");

  app.use("/api/dashboard", dashboardRoutes);

  app.use((req,res,next)=>{
    trackEvent({path:req.path, date:new Date()});
    next();
  });

  console.log("🧠 REFACTOR MASTER ACTIVE");
} catch(e) {}
// =====================
// 🚀 NEW FEATURE END
// =====================
