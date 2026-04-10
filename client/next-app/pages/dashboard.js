// NEW FEATURE START: NEXTJS DASHBOARD

import React, { useEffect, useState } from "react";

// NEW FEATURE START
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from "recharts";
// NEW FEATURE END

export default function Dashboard() {

  const [data, setData] = useState(null);

  // NEW FEATURE START
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);
  // NEW FEATURE END

  // NEW FEATURE START (AI + ADVANCED ANALYTICS STATE)
  const [aiResult, setAiResult] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [advancedAnalytics, setAdvancedAnalytics] = useState(null);
  // NEW FEATURE END

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:5000/api/dashboard", {
        headers: { Authorization: token }
      })
        .then(res => {
          if (!res.ok) throw new Error("Dashboard fetch failed");
          return res.json();
        })
        .then(d => {
          setData(d);

          // NEW FEATURE START: BUILD ANALYTICS DATA
          const stats = [
            { name: "Leads", value: d.stats.totalLeads },
            { name: "Posts", value: d.stats.totalPosts }
          ];
          setChartData(stats);
          // NEW FEATURE END

          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });

      // NEW FEATURE START (FETCH ADVANCED ANALYTICS)
      fetch("http://localhost:5000/api/dashboard/analytics", {
        headers: { Authorization: token }
      })
        .then(res => res.json())
        .then(setAdvancedAnalytics)
        .catch(()=>{});
      // NEW FEATURE END

    } else {
      setLoading(false);
    }
  }, []);

  // NEW FEATURE START: LOGIN
  const login = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ email: "admin@test.com" })
    });

    const d = await res.json();
    localStorage.setItem("token", d.token);
    window.location.reload();
  };
  // NEW FEATURE END

  // NEW FEATURE START (AI GENERATOR FUNCTION)
  const handleGenerateAI = async () => {
    setLoadingAI(true);

    const res = await fetch("http://localhost:5000/api/ai/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: "Write SEO content about book cover design",
        type: "blog",
      }),
    });

    const d = await res.json();
    setAiResult(d.result);
    setLoadingAI(false);
  };
  // NEW FEATURE END

  if(!localStorage.getItem("token")){
    return (
      <div style={{padding:40}}>
        <h2>Login Required</h2>
        <button onClick={login}>Login</button>
      </div>
    );
  }

  // NEW FEATURE START
  if(loading) return <p style={{padding:40}}>Loading...</p>;
  if(error) return <p style={{color:"red"}}>{error}</p>;
  // NEW FEATURE END

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>

      <h1>Dashboard</h1>

      {/* NEW FEATURE START: AI GENERATOR */}
      <div style={{marginBottom:20}}>
        <button onClick={handleGenerateAI} style={{
          background:"gold",
          padding:"10px 20px",
          borderRadius:10,
          fontWeight:"bold"
        }}>
          {loadingAI ? "Generating..." : "🔥 Generate AI Content"}
        </button>

        {aiResult && (
          <div style={{marginTop:10,background:"#111",padding:15}}>
            {aiResult}
          </div>
        )}
      </div>
      {/* NEW FEATURE END */}

      {/* NEW FEATURE START: STATS CARDS */}
      <div style={{display:"flex",gap:20,marginBottom:20}}>
        <motion.div whileHover={{scale:1.05}} style={{padding:20,border:"1px solid #333"}}>
          Leads: {data.stats.totalLeads}
        </motion.div>

        <motion.div whileHover={{scale:1.05}} style={{padding:20,border:"1px solid #333"}}>
          Posts: {data.stats.totalPosts}
        </motion.div>
      </div>
      {/* NEW FEATURE END */}

      {/* NEW FEATURE START: ADVANCED ANALYTICS */}
      {advancedAnalytics && (
        <div style={{marginBottom:20}}>
          <h3>Advanced Analytics</h3>
          <p>Visitors: {advancedAnalytics.visitors}</p>
          <p>Conversions: {advancedAnalytics.conversions}</p>
        </div>
      )}
      {/* NEW FEATURE END */}

      {/* NEW FEATURE START: CHARTS */}
      <h2 style={{marginTop:30}}>Analytics</h2>

      <div style={{display:"flex",gap:40,flexWrap:"wrap"}}>

        <LineChart width={400} height={300} data={chartData}>
          <CartesianGrid stroke="#444" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>

        <BarChart width={400} height={300} data={chartData}>
          <CartesianGrid stroke="#444" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>

      </div>
      {/* NEW FEATURE END */}

      {/* NEW FEATURE START: LIST */}
      <h3>Latest Leads</h3>
      {data.latest?.leads?.map((l,i)=>(
        <div key={i} style={{border:"1px solid #333",marginTop:10,padding:10}}>
          {l.email}
        </div>
      ))}

      <h3 style={{marginTop:20}}>Latest Posts</h3>
      {data.latest?.posts?.map((p,i)=>(
        <div key={i} style={{border:"1px solid #333",marginTop:10,padding:10}}>
          {p.title}
        </div>
      ))}
      {/* NEW FEATURE END */}

    </div>
  );
}

// NEW FEATURE END