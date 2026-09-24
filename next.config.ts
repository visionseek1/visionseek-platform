import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/insights", destination: "/leaders", permanent: true },
      { source: "/insights/:slug", destination: "/leaders/:slug", permanent: true },
      { source: "/ar/insights", destination: "/ar/leaders", permanent: true },
      { source: "/ar/insights/:slug", destination: "/ar/leaders/:slug", permanent: true },
      { source: "/brief", destination: "/leaders", permanent: true },
      { source: "/brief/:slug", destination: "/leaders/:slug", permanent: true },
      { source: "/ar/brief", destination: "/ar/leaders", permanent: true },
      { source: "/ar/brief/:slug", destination: "/ar/leaders/:slug", permanent: true },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.visionseek.org" }],
        destination: "https://visionseek.org/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; object-src 'none'; img-src 'self' data: blob:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self' https:; form-action 'self'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
