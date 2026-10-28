import type { Metadata } from "next";
import { Alexandria, IBM_Plex_Sans_Arabic, IBM_Plex_Serif, Noto_Sans_KR, Oxanium } from "next/font/google";
import "./globals.css";
import "./capability.css";
import "./institution.css";
import "./governance.css";
import {site} from '@/lib/site';

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

// Arabic display face for headings: drawn from Egypt's own street lettering,
// so Arabic titles stop falling back to a system font under the Latin-only Oxanium.
const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-arabic-display",
  adjustFontFallback: true,
});

// Editorial serif for English headings in VisionSeek Reports only (calm, research-house register).
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-korean",
  adjustFontFallback: true,
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal"],
  display: "swap",
  variable: "--font-serif",
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
      logo: "https://visionseek.org/visionseek-logo-color.png",
      description:
        "When AI models become abundant and cheap, intelligence is no longer rare. What remains rare is how institutions govern multi-path decisions, retain true ownership of their capabilities, and design bionic organizations where humans command agents without losing control.",
      email: site.email,
      telephone: site.phoneE164,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Seoul",
        addressCountry: "KR",
      },
      founder: { "@id": "https://visionseek.org/#ahmed-abdelalim" },
      sameAs: [site.linkedinUrl],
    },
    {
      "@type": "Person",
      "@id": "https://visionseek.org/#ahmed-abdelalim",
      name: "Ahmed Abdelalim",
      jobTitle: "Founder of VisionSeek",
      image: "https://visionseek.org/ahmed-abdelalim.jpg",
      worksFor: { "@id": "https://visionseek.org/#organization" },
      sameAs: [site.linkedinUrl],
    },
    {
      "@type": "WebSite",
      "@id": "https://visionseek.org/#website",
      name: "VisionSeek",
      url: "https://visionseek.org/",
      inLanguage: ["en", "ar", "ko"],
      publisher: { "@id": "https://visionseek.org/#organization" },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://visionseek.org"),
  title: "VisionSeek | Strategic & Operational Governance of Decisions, Capabilities, and Agents.",
  description:
    "When AI models become abundant and cheap, intelligence is no longer rare. What remains rare is how institutions govern multi-path decisions, retain true ownership of their capabilities, and design bionic organizations where humans command agents without losing control.",
  icons: {
    icon: [{ url: "/visionseek-symbol-color.png", type: "image/png" }],
    shortcut: "/visionseek-symbol-color.png",
    apple: [{ url: "/visionseek-symbol-color.png", type: "image/png" }],
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      ar: "/ar",
      ko: "/ko",
    },
  },
  openGraph: {
    type: "website",
    siteName: "VisionSeek",
    title: "VisionSeek | Strategic & Operational Governance of Decisions, Capabilities, and Agents.",
    description:
      "When AI models become abundant and cheap, intelligence is no longer rare. What remains rare is how institutions govern multi-path decisions, retain true ownership of their capabilities, and design bionic organizations where humans command agents without losing control.",
    url: "/",
    images: [{ url: "/visionseek-hero.png", alt: "VisionSeek — Strategic & Operational Governance of Decisions, Capabilities, and Agents." }],
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
    <html lang="en" dir="ltr" className={`${oxanium.variable} ${ibmPlexSansArabic.variable} ${alexandria.variable} ${ibmPlexSerif.variable} ${notoSansKr.variable}`}>
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
