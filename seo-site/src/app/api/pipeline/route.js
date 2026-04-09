// NEW FEATURE START

export async function POST(req) {
  const { keyword } = await req.json();

  // AI PROMPT
  const content = `
  Write a high-converting SEO article about "${keyword}" for Amazon KDP authors.

  Include:
  - Engaging intro
  - Benefits
  - Call to action
  `;

  return Response.json({
    data: {
      title: `Best ${keyword} Services in 2026`,
      content: content,
      funnel: {
        link: "https://www.upwork.com/",
      },
    },
  });
}

// NEW FEATURE END