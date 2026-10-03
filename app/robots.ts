import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/signin-with-chatgpt", "/callback", ...["", "/ar", "/ko"].flatMap(p=>[`${p}/room`, `${p}/insights/studio`, `${p}/reports/studio`])],
    },
    sitemap: "https://visionseek.org/sitemap.xml",
    host: "https://visionseek.org",
  };
}
