// NEW FEATURE START (SEO DYNAMIC PAGE)

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// NEW FEATURE START
import Head from "next/head";
// NEW FEATURE END

export default function SeoPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

// NEW FEATURE START
  const [seoData, setSeoData] = useState(null);
// NEW FEATURE END

  useEffect(() => {
    if (!slug) return;

    fetch(`http://localhost:5000/api/seo/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("SEO page not found");
        return res.json();
      })
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

// NEW FEATURE START
    // 🔥 NEW SEO ENGINE FETCH
    fetch(`http://localhost:5000/api/seo/page/${slug}`)
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((d) => {
        if (d) setSeoData(d);
      })
      .catch(() => {});
// NEW FEATURE END

  }, [slug]);

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <div style={{ padding: 40, maxWidth: 800, margin: "auto" }}>

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
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>
        {slug?.replace(/-/g, " ")}
      </h1>

      {/* NEW FEATURE START */}
      {/* SEO CONTENT (PRIORITY) */}
      {seoData && (
        <div
          style={{ lineHeight: 1.6 }}
          dangerouslySetInnerHTML={{ __html: seoData.content }}
        />
      )}
      {/* NEW FEATURE END */}

      {/* OLD CONTENT (FALLBACK) */}
      {!seoData && data && (
        <div style={{ lineHeight: 1.6 }}>
          {data.content}
        </div>
      )}

      {/* CTA */}
      <a
        href="http://localhost:5000/cta"
        style={{
          display: "inline-block",
          marginTop: 30,
          background: "gold",
          padding: "12px 24px",
          borderRadius: 10,
          fontWeight: "bold",
        }}
      >
        🚀 Order Now on Upwork
      </a>

      {/* NEW FEATURE START */}
      {seoData && (
        <div style={{ marginTop: 40 }}>
          <h2>🔥 Explore More</h2>
          <p>Internal linking powered by SEO Engine</p>
        </div>
      )}
      {/* NEW FEATURE END */}

    </div>
  );
}

// NEW FEATURE END