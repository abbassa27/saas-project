// client/src/services/api.js

# NEW FEATURE START

export async function runPipeline(keyword) {
  const response = await fetch("http://localhost:5000/api/pipeline/run", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ keyword }),
  })

  const data = await response.json()
  return data
}

# NEW FEATURE END