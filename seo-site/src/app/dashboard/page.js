"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lead`)
      .then((res) => res.json())
      .then((data) => setLeads(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main style={container}>
      <h1 style={title}>📊 Leads Dashboard</h1>

      {leads.length === 0 ? (
        <p>No leads yet...</p>
      ) : (
        <div style={grid}>
          {leads.map((lead, index) => (
            <div key={index} style={card}>
              <h3>{lead.name}</h3>
              <p>{lead.email}</p>
              <p style={{ opacity: 0.7 }}>{lead.service}</p>
              <p style={{ fontSize: "12px", opacity: 0.5 }}>
                {new Date(lead.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

// ===== STYLES =====

const container = {
  padding: "40px",
  background: "#0f0f0f",
  minHeight: "100vh",
  color: "#fff",
};

const title = {
  marginBottom: "20px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "20px",
};

const card = {
  background: "#1a1a1a",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid #333",
};