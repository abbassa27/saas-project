// NEW FEATURE START: MAIN PAGE V116

import React,{useEffect,useState} from "react";
import axios from "axios";
import {LineChart,Line,XAxis,YAxis,Tooltip} from "recharts";

export default function Home(){
 const [posts,setPosts]=useState([]);
 const [token,setToken]=useState("");
 const [dashboard,setDashboard]=useState(null);

 // NEW FEATURE START
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState(null);
 // NEW FEATURE END

 useEffect(()=>{
  axios.get("http://localhost:5000/api/blog")
  .then(r=>setPosts(r.data))
  .catch(()=>{});
 },[]);

 useEffect(()=>{
  const savedToken = localStorage.getItem("token");
  if(savedToken){
    setToken(savedToken);

    fetch("http://localhost:5000/api/dashboard",{
      headers:{Authorization:savedToken}
    })
    .then(r=>{
      if(!r.ok) throw new Error("Dashboard error");
      return r.json();
    })
    .then(data=>{
      setDashboard(data);
      setLoading(false);
    })
    .catch(err=>{
      setError(err.message);
      setLoading(false);
    });
  } else {
    setLoading(false);
  }
 },[]);

 // NEW FEATURE START: AUTO REFRESH
 useEffect(()=>{
  if(!token) return;

  const interval = setInterval(()=>{
    fetch("http://localhost:5000/api/dashboard",{
      headers:{Authorization:token}
    })
    .then(r=>r.json())
    .then(setDashboard)
    .catch(()=>{});
  },10000);

  return ()=>clearInterval(interval);
 },[token]);
 // NEW FEATURE END

 const login=async ()=>{
  const res=await fetch("http://localhost:5000/api/auth/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email:"admin@test.com"})
  });
  const data=await res.json();
  localStorage.setItem("token",data.token);
  window.location.reload();
 };

 // NEW FEATURE START: LOGOUT
 const logout = ()=>{
  localStorage.removeItem("token");
  window.location.reload();
 };
 // NEW FEATURE END

 const generateAI=async ()=>{
  const res=await fetch("http://localhost:5000/api/ai/generate",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({prompt:"Generate SEO title"})
  });
  const data=await res.json();
  alert(data.result);
 };

 return(
  <div>

    <div className="hero">
      <h1>Abbassa Malik</h1>

      <a href="http://localhost:5000/cta">
        <button>Start Your Project</button>
      </a>

      <div style={{marginTop:20}}>
        <a href="/dashboard">
          <button>📊 Open Dashboard</button>
        </a>
      </div>

      {/* NEW FEATURE START */}
      {token && (
        <div style={{marginTop:10}}>
          <button onClick={logout}>Logout</button>
        </div>
      )}
      {/* NEW FEATURE END */}
    </div>

    <div style={{padding:80,textAlign:"center"}}>
      <h2>Stats Preview</h2>

      {/* NEW FEATURE START */}
      {loading && <p>Loading...</p>}
      {error && <p style={{color:"red"}}>{error}</p>}
      {/* NEW FEATURE END */}

      <LineChart width={600} height={300} data={posts}>
        <XAxis dataKey="title"/>
        <YAxis/>
        <Tooltip/>
        <Line dataKey="date"/>
      </LineChart>

      {!token && <button onClick={login}>Login</button>}

      {dashboard && (
        <div>
          <p>Leads: {dashboard.stats.totalLeads}</p>
          <p>Posts: {dashboard.stats.totalPosts}</p>
        </div>
      )}
    </div>

    <div style={{padding:80}}>
      <h2>Blog</h2>
      {posts.map(p=>(
        <div key={p._id}>
          <h3>{p.title}</h3>
          <p>{p.content}</p>
        </div>
      ))}
    </div>

    <div style={{padding:80,textAlign:"center"}}>
      <h2>AI Tool</h2>
      <button onClick={generateAI}>Generate Content</button>
    </div>

    <div style={{padding:80}}>
      <h2>Services</h2>
      <a href="/book-cover-design">Book Cover Design</a><br/>
      <a href="/ebook-formatting">eBook Formatting</a>
    </div>

  </div>
 )
}

// NEW FEATURE END