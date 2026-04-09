# NEW FEATURE START

import { generateAIContent } from "../ai/generator.js"
import { optimizeSEO } from "../seo/engine.js"
import { triggerFunnel } from "../funnel/engine.js"

export async function runPipeline(keyword) {
  console.log("🚀 Running Full Pipeline...")

  const ai = await generateAIContent(keyword)
  const seo = optimizeSEO(ai)
  const result = triggerFunnel(seo)

  return result
}

# NEW FEATURE END