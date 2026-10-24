import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thinktools.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/p/construction-calculator-pro/diwali"],
      },
      // Explicitly welcome AI Answer & Generative Search Engines (AIO / AEO / GEO)
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "PerplexityBot",
          "Google-Extended",
          "Applebot",
          "Applebot-Extended",
          "Bingbot",
          "cohere-ai",
          "Bytespider",
          "CCBot",
        ],
        allow: "/",
        disallow: ["/api/", "/p/construction-calculator-pro/diwali"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
