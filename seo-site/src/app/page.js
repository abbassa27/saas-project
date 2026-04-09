"use client";

import LeadPopup from "../components/LeadPopup";

export default function Home() {
  return (
    <>
      <LeadPopup />

      <main
        style={{
          padding: "40px",
          fontFamily: "sans-serif",
          background: "#0f0f0f",
          color: "#fff",
          minHeight: "100vh",
        }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
          🚀 Book Cover Design Services
        </h1>

        <p style={{ opacity: 0.8 }}>
          Professional book cover design & ebook formatting for Amazon KDP.
        </p>

        <a
          href="https://www.upwork.com/"
          style={{
            display: "inline-block",
            marginTop: "20px",
            padding: "12px 25px",
            background: "#d4af37",
            color: "#000",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            transition: "0.3s",
          }}
        >
          💼 Hire Me on Upwork
        </a>
      </main>
    </>
  );
}