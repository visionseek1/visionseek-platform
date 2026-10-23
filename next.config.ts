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
        // «الورش» became «ماستركلاس» (9 Oct 2026): old links keep working.
        {source: `${prefix}/workshops`, destination: `${prefix}/masterclass`, permanent: true},
        {source: `${prefix}/workshops/:slug`, destination: `${prefix}/masterclass/:slug`, permanent: true},
        // «احذر نصائح الذكاء الاصطناعي» moved from the papers to the reports (16 Oct 2026).
        {source: `${prefix}/insights/research/half-the-picture`, destination: `${prefix}/insights/reports/half-the-picture`, permanent: true},
      ]),
      {source: '/insights/research/half-the-picture-ar.pdf', destination: '/insights/reports/half-the-picture-ar.pdf', permanent: true},
      // The governance section was folded into Masterclass (23 Oct 2026).
      {source: '/governance/single-track-trap', destination: '/masterclass/single-track-trap', permanent: true},
      {source: '/ar/governance/single-track-trap', destination: '/ar/masterclass/single-track-trap', permanent: true},
      {source: '/governance', destination: '/masterclass', permanent: true},
      {source: '/ar/governance', destination: '/ar/masterclass', permanent: true},
      // English lives at the root: /en/privacy → /privacy (the /en home page itself stays).
      {source: '/en/:path+', destination: '/:path+', permanent: true},
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
    // غرفة العمليات (/ops): خاصة وبكلمة سر؛ تحمّل خط IBM Plex Sans Arabic من Google Fonts فقط.
    const room = [
      ...shared,
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      { key: "X-Robots-Tag", value: "noindex, nofollow" },
      {
        key: "Content-Security-Policy",
        value:
          "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; object-src 'none'; img-src 'self' data:; font-src 'self' data: https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self' 'unsafe-inline'; connect-src 'self'; form-action 'self'",
      },
    ];
    return [
      { source: "/:path((?!admin$|admin/|ops$|ops/|api/decap-oauth).*)", headers: site },
      { source: "/ops", headers: room },
      { source: "/ops/:path*", headers: room },
      // عامل الخدمة بتاع الغرفة محتاج يتحكم في /ops نفسها (مش /ops/ بس):
      // من غير الهيدر ده المتصفح بيرفض التسجيل بنطاق "/ops" والإشعارات ما تتفعّلش.
      { source: "/ops/sw.js", headers: [{ key: "Service-Worker-Allowed", value: "/ops" }] },
      { source: "/admin", headers: controlRoom },
      { source: "/admin/:path*", headers: controlRoom },
      { source: "/api/decap-oauth", headers: oauth },
      { source: "/api/decap-oauth/:path*", headers: oauth },
    ];
  },
};

export default nextConfig;
