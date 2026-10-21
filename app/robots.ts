import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Private surfaces: the management room and the two studios are not public pages.
      disallow: ["/api/", "/signin-with-chatgpt", "/callback", ...["", "/ar"].flatMap(p => [`${p}/room`, `${p}/insights/studio`, `${p}/reports/studio`])],
    },
    sitemap: "https://visionseek.org/sitemap.xml",
    host: "https://visionseek.org",
  };
}
