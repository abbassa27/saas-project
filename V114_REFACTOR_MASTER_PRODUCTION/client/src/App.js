import React,{useEffect,useState} from "react";
import axios from "axios";
import {LineChart,Line,XAxis,YAxis,Tooltip} from "recharts";

export default function App(){
 const [posts,setPosts]=useState([]);

 useEffect(()=>{
  axios.get("http://localhost:5000/api/blog").then(r=>setPosts(r.data));
 },[]);

 return(
  <div>

    <div className="hero">
      <h1 className="glow parallax">Abbassa Malik</h1>
      <a href="http://localhost:5000/cta">
        <button className="btn">Start Your Project</button>
      </a>
    </div>

    <div style={{padding:"80px",textAlign:"center"}}>
      <h2>Dashboard</h2>
      <LineChart width={600} height={300} data={posts}>
        <XAxis dataKey="title"/>
        <YAxis/>
        <Tooltip/>
        <Line dataKey="date"/>
      </LineChart>
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

  </div>
 )
}
