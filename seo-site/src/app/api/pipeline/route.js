// NEW FEATURE START

export async function POST(req) {
  const body = await req.json();

  const res = await fetch("http://127.0.0.1:5000/api/pipeline/run", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return Response.json(data);
}

// NEW FEATURE END