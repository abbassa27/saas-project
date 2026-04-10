// NEW FEATURE START - ADVANCED DASHBOARD V3 (SAFE FETCH)

"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({
    views: 0,
    clicks: 0,
    leads: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
    fetchStats();
  }, []);

  // NEW FEATURE START - SAFE FETCH LEADS
  const fetchLeads = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/leads`
      );

      const text = await res.text();

      if (text.startsWith("<")) {
        console.log("❌ Leads API returned HTML");
        setLeads([]);
        return;
      }

      const data = JSON.parse(text);
      setLeads(data.leads || []);
    } catch (err) {
      console.log("Leads fetch error:", err);
    } finally {
      setLoading(false);
    }
  };
  // NEW FEATURE END

  // NEW FEATURE START - SAFE FETCH ANALYTICS
  const fetchStats = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/analytics`
      );

      const text = await res.text();

      if (text.startsWith("<")) {
        console.log("❌ Analytics API returned HTML");
        return;
      }

      const data = JSON.parse(text);
      setStats(data);
    } catch (err) {
      console.log("Stats fetch error:", err);
    }
  };
  // NEW FEATURE END

  const conversionRate =
    stats.views > 0
      ? ((stats.leads / stats.views) * 100).toFixed(2)
      : 0;

  return (
    <main style={container}>
      <h1 style={title}>📊 Advanced Funnel Dashboard</h1>

      {/* LOADING */}
      {loading && <p>Loading data...</p>}

      {/* ===== STATS ===== */}
      <div style={statsGrid}>
        <div style={statCard}>
          <h3>👁 Views</h3>
          <p>{stats.views}</p>
        </div>

        <div style={statCard}>
          <h3>🖱 Clicks</h3>
          <p>{stats.clicks}</p>
        </div>

        <div style={statCard}>
          <h3>🔥 Leads</h3>
          <p>{stats.leads}</p>
        </div>

        <div style={statCard}>
          <h3>💰 Conversion</h3>
          <p>{conversionRate}%</p>
        </div>
      </div>

      {/* ===== LEADS ===== */}
      <h2 style={{ marginTop: "40px" }}>
        🧠 Leads (Smart Scoring)
      </h2>

      {!loading && leads.length === 0 ? (
        <p>No leads yet...</p>
      ) : (
        <div style={grid}>
          {leads.map((lead, index) => (
            <div key={index} style={card}>
              <h3>{lead.name}</h3>
              <p>{lead.email}</p>

              <p style={tag}>{lead.service}</p>

              <p>
                Score:{" "}
                <span style={scoreColor(lead.score)}>
                  {lead.score || 0}
                </span>
              </p>

              <p>Status: {lead.status}</p>

              <p style={small}>
                {new Date(lead.createdAt).toLocaleString()}
              </p>

              <button
                style={btn}
                onClick={() =>
                  updateStatus(lead._id, "contacted")
                }
              >
                Mark Contacted
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

// ===== ACTION =====

const updateStatus = async (id, status) => {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/leads/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    alert("Updated 🚀");
  } catch (err) {
    alert("Update failed ❌");
  }
};

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

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
};

const statCard = {
  background: "#1a1a1a",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid #333",
  textAlign: "center",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const card = {
  background: "#1a1a1a",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid #333",
};

const tag = {
  background: "#333",
  padding: "4px 8px",
  borderRadius: "6px",
  display: "inline-block",
  marginTop: "5px",
};

const small = {
  fontSize: "12px",
  opacity: 0.5,
};

const btn = {
  marginTop: "10px",
  padding: "8px",
  background: "#6c47ff",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer",
};

const scoreColor = (score) => {
  if (score > 50) return { color: "lime" };
  if (score > 20) return { color: "orange" };
  return { color: "red" };
};

// NEW FEATURE END