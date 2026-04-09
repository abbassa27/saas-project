// NEW FEATURE START

export async function POST(req) {
  const { keyword } = await req.json();

  const content = `
  Best ${keyword} Services for Authors

  If you're looking for professional ${keyword}, we provide high-quality solutions for Amazon KDP authors.

  Our service ensures:
  - High converting designs
  - SEO optimized content
  - Fast delivery

  Start your journey with expert ${keyword} today.
  `;

  return Response.json({ content });
}

// NEW FEATURE END