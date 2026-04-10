// NEW FEATURE START (SEO DYNAMIC PAGE)

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SeoPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, [slug]);

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>;
  if (!data) return <p style={{ padding: 40 }}>Page not found</p>;

  return (
    <div style={{ padding: 40, maxWidth: 800, margin: "auto" }}>
      
      {/* TITLE */}
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>
        {data.title}
      </h1>

      {/* CONTENT */}
      <div style={{ lineHeight: 1.6 }}>
        {data.content}
      </div>

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

    </div>
  );
}

// NEW FEATURE END