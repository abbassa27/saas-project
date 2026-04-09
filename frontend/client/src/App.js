import React,{useEffect,useState} from "react";
import axios from "axios";
import {LineChart,Line,XAxis,YAxis,Tooltip} from "recharts";

export default function App(){
 const [posts,setPosts]=useState([]);

 // NEW FEATURE START
 const [token,setToken]=useState(localStorage.getItem("token")||"");
 const [dashboard,setDashboard]=useState(null);
 // NEW FEATURE END

 useEffect(()=>{
  axios.get("http://localhost:5000/api/blog").then(r=>setPosts(r.data));
 },[]);

 // NEW FEATURE START
 useEffect(()=>{
  if(token){
    fetch("http://localhost:5000/api/dashboard",{
      headers:{Authorization:token}
    })
    .then(r=>r.json())
    .then(setDashboard);
  }
 },[token]);

 const login=async ()=>{
  const res=await fetch("http://localhost:5000/api/auth/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email:"admin@test.com"})
  });
  const data=await res.json();
  localStorage.setItem("token",data.token);
  setToken(data.token);
 };

 const generateAI=async ()=>{
  const res=await fetch("http://localhost:5000/api/ai/generate",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({prompt:"Generate SEO title"})
  });
  const data=await res.json();
  alert(data.result);
 };
 // NEW FEATURE END

 return(
  <div>

    <div className="hero">
      <h1 className="glow parallax">Abbassa Malik</h1>
      <a href="http://localhost:5000/cta">
        <button className="btn">Start Your Project</button>
      </a>

      {/* NEW FEATURE START */}
      <div style={{marginTop:20}}>
        <a href="/UnifiedDashboard">
          <button className="btn">📊 Open Dashboard</button>
        </a>
      </div>
      {/* NEW FEATURE END */}
    </div>

    <div style={{padding:"80px",textAlign:"center"}}>
      <h2>Dashboard</h2>
      <LineChart width={600} height={300} data={posts}>
        <XAxis dataKey="title"/>
        <YAxis/>
        <Tooltip/>
        <Line dataKey="date"/>
      </LineChart>

      {/* NEW FEATURE START */}
      {!token && <button onClick={login}>Login</button>}

      {dashboard && (
        <div style={{marginTop:40}}>
          <h3>📊 Real Stats</h3>
          <p>Leads: {dashboard.stats.totalLeads}</p>
          <p>Posts: {dashboard.stats.totalPosts}</p>
        </div>
      )}
      {/* NEW FEATURE END */}
    </div>

    <div style={{padding:"80px"}}>
      <h2>Blog</h2>
      {posts.map(p=>(
        <div className="card" key={p._id}>
          <h3>{p.title}</h3>
          <p>{p.content}</p>
        </div>
      ))}
    </div>

    {/* NEW FEATURE START */}
    <div style={{padding:"80px",textAlign:"center"}}>
      <h2>⚡ AI Tools</h2>
      <button onClick={generateAI}>Generate Content</button>
    </div>
    {/* NEW FEATURE END */}

  </div>
 )
}