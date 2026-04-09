"use client";

import LeadPopup from "../components/LeadPopup";
import Link from "next/link";

// NEW FEATURE START

export default function Home() {
  const services = [
    {
      title: "Book Cover Design",
      slug: "book-cover-design",
      description: "Professional book cover design for Amazon KDP authors.",
    },
    {
      title: "eBook Formatting",
      slug: "ebook-formatting-kdp",
      description: "Clean and professional ebook formatting for Kindle.",
    },
    {
      title: "KDP Cover Design",
      slug: "kdp-cover-design",
      description: "Optimized covers designed to boost your book sales.",
    },
  ];

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
        {/* OLD UI */}
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

        {/* NEW SEO SECTION */}
        <div style={{ marginTop: "50px" }}>
          <h2>🔥 Explore Our Services</h2>

          {services.map((service) => (
            <div key={service.slug} style={{ marginTop: "20px" }}>
              <h3>{service.title}</h3>
              <p style={{ opacity: 0.7 }}>{service.description}</p>

              <Link href={`/${service.slug}`}>
                <span style={{ color: "#d4af37", cursor: "pointer" }}>
                  View Service →
                </span>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

// NEW FEATURE END