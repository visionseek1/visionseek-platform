import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**" },
    ],
  },
  async redirects() {
    return [
      ...['', '/ar'].flatMap(prefix => [
        {source: `${prefix}/projects/egypt-lng-supply`, destination: `${prefix}/projects/energy/lng/sovereign-floating-gas-supply`, permanent: true},
        {source: `${prefix}/projects/gulf-lng-fleet`, destination: `${prefix}/projects/energy/lng/second-lng-containment-standard`, permanent: true},
      ]),
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.visionseek.org" }],
        destination: "https://visionseek.org/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    const shared = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
    ];
    const site = [
      ...shared,
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      {
        key: "Content-Security-Policy",
        value:
          "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; object-src 'none'; img-src 'self' data: blob: https://*.supabase.co; media-src 'self' blob: https://*.supabase.co; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self' https:; form-action 'self'",
      },
    ];
    const controlRoom = [
      ...shared,
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
      {
        key: "Content-Security-Policy",
        value:
          "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; object-src 'none'; img-src 'self' data: blob: https:; media-src 'self' blob: https:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https:; form-action 'self' https://github.com",
      },
    ];
    const oauth = [
      ...shared,
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Cross-Origin-Opener-Policy", value: "unsafe-none" },
      {
        key: "Content-Security-Policy",
        value:
          "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; object-src 'none'; img-src 'self' data: blob: https:; media-src 'self' blob: https:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https:; form-action 'self' https://github.com",
      },
    ];
    return [
      { source: "/:path((?!admin$|admin/|api/decap-oauth).*)", headers: site },
      { source: "/admin", headers: controlRoom },
      { source: "/admin/:path*", headers: controlRoom },
      { source: "/api/decap-oauth", headers: oauth },
      { source: "/api/decap-oauth/:path*", headers: oauth },
    ];
  },
};

export default nextConfig;
