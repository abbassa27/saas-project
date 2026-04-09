// =====================
// 🚀 NEW FEATURE START: UNIFIED REAL DASHBOARD V116 FIXED
// =====================
import React, { useEffect, useState } from "react";

export default function UnifiedDashboard(){
    const [data,setData]=useState(null);
    const [token,setToken]=useState("");

    useEffect(()=>{
        const savedToken = localStorage.getItem("token");
        if(savedToken){
            setToken(savedToken);

            fetch("http://localhost:5000/api/dashboard",{
                headers:{Authorization:savedToken}
            })
            .then(r=>r.json())
            .then(setData);
        }
    },[]);

    const login = async ()=>{
        const res = await fetch("http://localhost:5000/api/auth/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email:"admin@test.com"})
        });

        const data = await res.json();
        localStorage.setItem("token",data.token);
        setToken(data.token);
        window.location.reload();
    };

    if(!token){
        return(
            <div style={{padding:40,textAlign:"center"}}>
                <h2>🔐 Dashboard Login</h2>
                <button onClick={login}>Login</button>
            </div>
        );
    }

    if(!data) return <p style={{textAlign:"center"}}>Loading...</p>;

    return(
        <div style={{padding:40}}>
            <h1>📊 Real Dashboard</h1>

            {/* NEW FEATURE START */}
            <h3>Stats</h3>
            <p>Total Leads: {data.stats.totalLeads}</p>
            <p>Total Posts: {data.stats.totalPosts}</p>

            <h3>Latest Leads</h3>
            {data.latest.leads.map((l,i)=>(
                <div key={i}>{l.email}</div>
            ))}

            <h3>Latest Posts</h3>
            {data.latest.posts.map((p,i)=>(
                <div key={i}>{p.title}</div>
            ))}
            {/* NEW FEATURE END */}
        </div>
    )
}
// =====================
// 🚀 NEW FEATURE END
// =====================