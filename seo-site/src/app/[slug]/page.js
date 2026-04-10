// NEW FEATURE START

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Head from "next/head";

// NEW FEATURE START - SANITIZE FUNCTION
const sanitizeHTML = (html) => {
  if (!html) return "";

  return html
    .replace(/position\s*:\s*absolute/gi, "")
    .replace(/position\s*:\s*fixed/gi, "")
    .replace(/z-index\s*:\s*\d+/gi, "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
};
// NEW FEATURE END

// NEW FEATURE START - FORMAT CONTENT (🔥 الحل الحقيقي)
const formatContent = (text) => {
  if (!text) return "";

  return text
    .replace(/\\n/g, "\n") // إصلاح \n
    .replace(/<[^>]*>/g, "") // حذف أي HTML
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line, i) => (
      <p key={i} style={{ marginBottom: "12px" }}>
        {line}
      </p>
    ));
};
// NEW FEATURE END

export default function SEOPage() {
  const params = useParams();
  const slug = params?.slug || "default";

  const [data, setData] = useState(null);
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/pipeline", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ keyword: slug }),
        });

        const result = await res.json();
        setData(result.data);
      } catch (err) {
        console.log("Pipeline error");
      }
    };

    fetchData();

    const fetchSEO = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/seo/page/${slug}`
        );

        if (!res.ok) return;

        const result = await res.json();
        setSeoData(result);
      } catch (err) {
        console.log("SEO fetch failed");
      }
    };

    fetchSEO();
  }, [slug]);

  return (
    <main
      style={{
        background: "#0f0f0f",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      {/* SEO HEAD */}
      {seoData && (
        <Head>
          <title>{seoData.title}</title>
          <meta
            name="description"
            content={seoData.content?.slice(0, 150)}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(seoData.schema || {}),
            }}
          />
        </Head>
      )}

      {/* GLOBAL PROTECTION */}
      <div
        style={{
          position: "relative",
          zIndex: 9999,
          isolation: "isolate",
        }}
      >

      {/* LAYOUT */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        {/* TITLE */}
        <h1
          style={{
            fontSize: "34px",
            marginBottom: "20px",
            textTransform: "capitalize",
          }}
        >
          🚀 {slug.replace(/-/g, " ")}
        </h1>

        {/* LOADING */}
        {!data && !seoData && (
          <p style={{ opacity: 0.7 }}>Loading AI content...</p>
        )}

        {/* NEW FEATURE START - CLEAN TEXT RENDER */}
        {seoData && (
          <div
            style={{
              background: "#111",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                lineHeight: "1.8",
                fontSize: "16px",
                color: "#ddd",
              }}
            >
              {formatContent(seoData.content)}
            </div>
          </div>
        )}
        {/* NEW FEATURE END */}

        {/* FALLBACK */}
        {!seoData && data && (
          <>
            <h2 style={{ color: "#d4af37" }}>{data.title}</h2>

            <p
              style={{
                marginTop: "15px",
                lineHeight: "1.8",
                color: "#ccc",
              }}
            >
              {data.content}
            </p>
          </>
        )}

        {/* CTA */}
        <div
          style={{
            marginTop: "40px",
            padding: "30px",
            background:
              "linear-gradient(135deg, #6c47ff, #8f5cff)",
            borderRadius: "16px",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>
            🚀 Ready to start?
          </h2>

          <p style={{ opacity: 0.9, marginBottom: "20px" }}>
            Get professional {slug.replace(/-/g, " ")} service now
          </p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://wa.me/your-number"
              target="_blank"
              style={btnGreen}
            >
              WhatsApp
            </a>

            <a
              href="https://www.upwork.com/"
              target="_blank"
              style={btnBlue}
            >
              Order Now
            </a>
          </div>
        </div>

        {/* INTERNAL LINKS */}
        {seoData && (
          <div style={{ marginTop: "40px" }}>
            <h3>🔥 Explore More</h3>
            <p style={{ opacity: 0.7 }}>
              Internal linking powered by SEO Engine
            </p>
          </div>
        )}
      </div>

      </div>
    </main>
  );
}

// ===== STYLES =====

const btnGreen = {
  background: "#25D366",
  padding: "12px 20px",
  borderRadius: "10px",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
};

const btnBlue = {
  background: "#0077ff",
  padding: "12px 20px",
  borderRadius: "10px",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
};

// NEW FEATURE END