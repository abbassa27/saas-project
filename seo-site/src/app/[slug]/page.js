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
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>{slug.replace(/-/g, " ")}</h1>

      {!data && <p>Loading AI content...</p>}

      {data && (
        <>
          <h2>{data.title}</h2>
          <p>{data.content}</p>

          <a href={data.funnel.link} target="_blank">
            👉 Hire me
          </a>
        </>
      )}
    </main>
  );
}

// NEW FEATURE END