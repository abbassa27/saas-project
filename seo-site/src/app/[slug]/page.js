// NEW FEATURE START

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// NEW FEATURE START
import Head from "next/head";
// NEW FEATURE END

export default function SEOPage() {
  const params = useParams();
  const slug = params?.slug || "default";

  const [data, setData] = useState(null);

// NEW FEATURE START
  const [seoData, setSeoData] = useState(null);
// NEW FEATURE END

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

// NEW FEATURE START
    const fetchSEO = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/seo/page/${slug}`
        );

        if (res.ok) {
          const result = await res.json();
          setSeoData(result);
        }
      } catch (err) {
        console.log("SEO fetch failed");
      }
    };

    fetchSEO();
// NEW FEATURE END

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
      {/* NEW FEATURE START */}
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
      {/* NEW FEATURE END */}

      {/* TITLE */}
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
        🚀 {slug.replace(/-/g, " ")}
      </h1>

      {/* LOADING */}
      {!data && !seoData && (
        <p style={{ opacity: 0.7 }}>Loading AI content...</p>
      )}

      {/* NEW FEATURE START */}
      {/* SEO CONTENT (Priority) */}
      {seoData && (
        <div
          dangerouslySetInnerHTML={{ __html: seoData.content }}
        />
      )}
      {/* NEW FEATURE END */}

      {/* AI CONTENT (Fallback) */}
      {!seoData && data && (
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

      {/* NEW FEATURE START */}
      {seoData && (
        <div style={{ marginTop: "40px" }}>
          <h2>🔥 Explore More</h2>
          <p>Internal linking powered by SEO Engine</p>
        </div>
      )}
      {/* NEW FEATURE END */}
    </main>
  );
}

// NEW FEATURE END