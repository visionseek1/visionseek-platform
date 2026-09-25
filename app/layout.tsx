import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Oxanium } from "next/font/google";
import "./globals.css";
import "./capability.css";
import "./institution.css";

const oxanium = Oxanium({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  adjustFontFallback: true,
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-arabic",
  adjustFontFallback: true,
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://visionseek.org/#organization",
      name: "VisionSeek",
      url: "https://visionseek.org/",
      logo: "https://visionseek.org/visionseek-logo-v2.png",
      description:
        "VisionSeek builds new capabilities for institutions and governments. See what could be. Make it possible.",
      email: "abdelalim@visionseek.org",
      telephone: "+82-10-4241-9606",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Incheon",
        addressCountry: "KR",
      },
      founder: { "@id": "https://visionseek.org/#ahmed-abdelalim" },
      sameAs: ["https://www.linkedin.com/in/ahmed-abdelalim-462491160/"],
    },
    {
      "@type": "Person",
      "@id": "https://visionseek.org/#ahmed-abdelalim",
      name: "Ahmed Abdelalim",
      jobTitle: "Founder of VisionSeek",
      image: "https://visionseek.org/ahmed-abdelalim.jpg",
      worksFor: { "@id": "https://visionseek.org/#organization" },
      sameAs: ["https://www.linkedin.com/in/ahmed-abdelalim-462491160/"],
    },
    {
      "@type": "WebSite",
      "@id": "https://visionseek.org/#website",
      name: "VisionSeek",
      url: "https://visionseek.org/",
      inLanguage: ["en", "ar"],
      publisher: { "@id": "https://visionseek.org/#organization" },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://visionseek.org"),
  title: "VisionSeek | Make It Possible.",
  description:
    "VisionSeek builds new capabilities for institutions and governments. See what could be. Make it possible.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      ar: "/ar",
    },
  },
  openGraph: {
    type: "website",
    siteName: "VisionSeek",
    title: "VisionSeek | Make It Possible.",
    description:
      "VisionSeek builds new capabilities for institutions and governments. See what could be. Make it possible.",
    url: "/",
    images: [{ url: "/visionseek-hero.png", alt: "VisionSeek — Make It Possible." }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  authors: [{ name: "VisionSeek", url: "https://visionseek.org/" }],
  creator: "VisionSeek",
  publisher: "VisionSeek",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${oxanium.variable} ${ibmPlexSansArabic.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
