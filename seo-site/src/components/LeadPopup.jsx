"use client";

import { useState, useEffect } from "react";

export default function LeadPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    await fetch("http://127.0.0.1:5000/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        service: form.get("service"),
        source: "seo-popup",
      }),
    });

    setShow(false);
  };

  if (!show) return null;

  return (
    <div style={overlay}>
      <div style={popup}>
        <h2 style={{ marginBottom: 10 }}>🚀 Get Free Book Cover Audit</h2>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Your Name" required style={input} />
          <input name="email" placeholder="Your Email" required style={input} />

          <select name="service" style={input}>
            <option>Book Cover</option>
            <option>eBook Formatting</option>
          </select>

          <button style={button}>Get Free Audit</button>
        </form>
      </div>
    </div>
  );
}

// ===== STYLES =====
const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const popup = {
  background: "rgba(30,30,30,0.9)",
  backdropFilter: "blur(10px)",
  padding: "30px",
  borderRadius: "15px",
  width: "300px",
  color: "#fff",
  textAlign: "center",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "none",
};

const button = {
  width: "100%",
  padding: "12px",
  background: "#d4af37",
  border: "none",
  borderRadius: "8px",
  color: "#000",
  fontWeight: "bold",
  cursor: "pointer",
};