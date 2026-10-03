import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...['', '/ar', '/ko'].flatMap(prefix => [
        ...['projects','programs','opportunities','workshops','news'].map(section => ({source: `${prefix}/${section}/:path*`, destination: `${prefix}/about`, permanent: false})),
        {source: `${prefix}/method`, destination: `${prefix}/about/what-we-do`, permanent: false},
        {source: `${prefix}/health`, destination: `${prefix}/pharmaceuticals`, permanent: false},
        {source: `${prefix}/reports/methodology`, destination: `${prefix}/reports`, permanent: false},
        {source: `${prefix}/insights/characters/:path*`, destination: `${prefix}/insights`, permanent: false},
        {source: `${prefix}/insights/physical-ai`, destination: prefix==='/ko'?'/ko/reports':`${prefix}/reports/physical-ai`, permanent: false},
        {source: `${prefix}/work-with-us/:slug`, destination: `${prefix}/work-with-us`, permanent: false},
        ...['operating-model','governance','program-questions','people','learning-from-darpa'].map(slug => ({source: `${prefix}/about/${slug}`, destination: `${prefix}/about${slug==='people'?'#founder':''}`, permanent: false})),
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
              "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; object-src 'none'; img-src 'self' data: blob: https://*.supabase.co; media-src 'self' blob: https://*.supabase.co; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self' https:; form-action 'self'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
