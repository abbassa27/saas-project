# NEW FEATURE START

export function triggerFunnel(data) {
  console.log("💰 Applying Funnel...")

  return {
    ...data,
    funnel: {
      type: "blog_to_upwork",
      link: process.env.UPWORK_LINK || "https://upwork.com",
    },
  }
}

# NEW FEATURE END