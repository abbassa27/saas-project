// NEW FEATURE START (HOME PAGE)

export default function Home() {
  return (
    <div style={{
      padding: "40px",
      fontFamily: "sans-serif",
      background: "#0f0f0f",
      color: "#fff",
      minHeight: "100vh"
    }}>
      <h1>🚀 SEO SaaS System</h1>

      <p style={{ marginTop: "20px", opacity: 0.8 }}>
        Welcome to your automated SEO engine.
      </p>

      <a
        href="/book-cover-design-for-kdp"
        style={{
          display: "inline-block",
          marginTop: "30px",
          padding: "12px 25px",
          background: "#d4af37",
          color: "#000",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold"
        }}
      >
        Test SEO Page 🔥
      </a>
    </div>
  );
}

// NEW FEATURE END