// NEW FEATURE START: DASHBOARD PAGE V116

import React,{useEffect,useState} from "react";

export default function Dashboard(){

 const [data,setData]=useState(null);
 const [token,setToken]=useState("");

 // NEW FEATURE START
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState(null);
 // NEW FEATURE END

 useEffect(()=>{
  const savedToken = localStorage.getItem("token");

  if(savedToken){
    setToken(savedToken);

    fetch("http://localhost:5000/api/dashboard",{
      headers:{Authorization:savedToken}
    })
    .then(r=>{
      if(!r.ok) throw new Error("Failed to fetch dashboard");
      return r.json();
    })
    .then(d=>{
      setData(d);
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
    .then(setData)
    .catch(()=>{});
  },10000);

  return ()=>clearInterval(interval);
 },[token]);
 // NEW FEATURE END

 const login = async ()=>{
  const res = await fetch("http://localhost:5000/api/auth/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email:"admin@test.com"})
  });

  const data = await res.json();
  localStorage.setItem("token",data.token);
  window.location.reload();
 };

 // NEW FEATURE START: LOGOUT
 const logout = ()=>{
  localStorage.removeItem("token");
  window.location.reload();
 };
 // NEW FEATURE END

 const generateAI = async ()=>{
  const res = await fetch("http://localhost:5000/api/ai/generate",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({prompt:"Generate dashboard insight"})
  });

  const data = await res.json();
  alert(data.result);
 };

 if(!token){
  return(
    <div style={{padding:40,textAlign:"center"}}>
      <h2>Login Required</h2>
      <button onClick={login}>Login</button>
    </div>
  );
 }

 // NEW FEATURE START: LOADING + ERROR
 if(loading){
  return <p style={{textAlign:"center"}}>Loading Dashboard...</p>;
 }

 if(error){
  return <p style={{color:"red",textAlign:"center"}}>{error}</p>;
 }
 // NEW FEATURE END

 if(!data) return <p>Loading...</p>;

 return(
  <div style={{padding:40}}>
    <h1>Dashboard</h1>

    {/* NEW FEATURE START */}
    <button onClick={logout} style={{marginBottom:20}}>Logout</button>
    {/* NEW FEATURE END */}

    <h3>Stats</h3>
    <p>Leads: {data.stats.totalLeads}</p>
    <p>Posts: {data.stats.totalPosts}</p>

    {/* NEW FEATURE START: QUICK ANALYTICS */}
    <h4>Total Items: {data.latest.leads.length + data.latest.posts.length}</h4>
    {/* NEW FEATURE END */}

    <h3>Latest Leads</h3>
    {data.latest.leads.map((l,i)=>(
      <div key={i}>{l.email}</div>
    ))}

    <h3>Latest Posts</h3>
    {data.latest.posts.map((p,i)=>(
      <div key={i}>{p.title}</div>
    ))}

    <button onClick={generateAI}>AI Insight</button>
  </div>
 );
}

// NEW FEATURE END