// NEW FEATURE START: NEXTJS MAIN PAGE

import React, { useEffect, useState } from "react";

// NEW FEATURE START
import { motion } from "framer-motion";
// NEW FEATURE END

export default function Home() {

  const [data, setData] = useState(null);

  // NEW FEATURE START
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // NEW FEATURE END

  useEffect(() => {
    fetch("http://localhost:5000/api/blog")
      .then(res => {
        if (!res.ok) throw new Error("Failed to load blog");
        return res.json();
      })
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: 40 }}>

      {/* NEW FEATURE START: NAVBAR */}
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:40}}>
        <h2>Abbassa SaaS</h2>
        <a href="/dashboard">
          <button>Dashboard</button>
        </a>
      </div>
      {/* NEW FEATURE END */}

      {/* NEW FEATURE START: HERO */}
      <motion.h1
        initial={{opacity:0,y:-30}}
        animate={{opacity:1,y:0}}
      >
        🚀 SaaS Next.js Version
      </motion.h1>
      {/* NEW FEATURE END */}

      <a href="/dashboard">
        <button>Open Dashboard</button>
      </a>

      <h2>Blog</h2>

      {/* NEW FEATURE START */}
      {loading && <p>Loading...</p>}
      {error && <p style={{color:"red"}}>{error}</p>}
      {/* NEW FEATURE END */}

      {data?.map((post, i) => (
        <motion.div
          key={i}
          whileHover={{scale:1.03}}
          style={{
            border:"1px solid #333",
            padding:15,
            marginTop:10,
            borderRadius:10
          }}
        >
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </motion.div>
      ))}

      {/* NEW FEATURE START: CTA */}
      <div style={{marginTop:40}}>
        <a href="http://localhost:5000/cta">
          <button>Start Your Project</button>
        </a>
      </div>
      {/* NEW FEATURE END */}

    </div>
  );
}

// NEW FEATURE END