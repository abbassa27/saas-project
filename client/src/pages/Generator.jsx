# NEW FEATURE START

import { useState } from "react"
import { runPipeline } from "../services/api"

export default function Generator() {
  const [keyword, setKeyword] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    const res = await runPipeline(keyword)
    setResult(res.data)
    setLoading(false)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🚀 SaaS AI Generator</h1>

      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter keyword..."
      />

      <button onClick={handleGenerate}>
        {loading ? "Generating..." : "Generate"}
      </button>

      {result && (
        <div>
          <h2>{result.title}</h2>
          <p>{result.content}</p>

          <a href={result.funnel.link} target="_blank">
            👉 Hire me
          </a>
        </div>
      )}
    </div>
  )
}

# NEW FEATURE END