// NEW FEATURE START

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SEOPage() {
  const params = useParams();
  const slug = params?.slug || "default";

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/pipeline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword: slug }),
      });

      const result = await res.json();
      setData(result.data);
    };

    fetchData();
  }, [slug]);

  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "sans-serif",
        background: "#0f0f0f",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      {/* TITLE */}
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
        🚀 {slug.replace(/-/g, " ")}
      </h1>

      {/* LOADING */}
      {!data && <p style={{ opacity: 0.7 }}>Loading AI content...</p>}

      {/* AI CONTENT */}
      {data && (
        <>
          <h2 style={{ marginTop: "20px", color: "#d4af37" }}>
            {data.title}
          </h2>

          <p style={{ marginTop: "15px", lineHeight: "1.7", opacity: 0.9 }}>
            {data.content}
          </p>

          {/* CTA BUTTON */}
          <a
            href={data?.funnel?.link || "https://www.upwork.com/"}
            target="_blank"
            style={{
              display: "inline-block",
              marginTop: "30px",
              padding: "12px 25px",
              background: "#d4af37",
              color: "#000",
              textDecoration: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              transition: "0.3s",
            }}
          >
            💼 Hire Me Now
          </a>
        </>
      )}
    </main>
  );
}

// NEW FEATURE END