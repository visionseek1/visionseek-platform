import type { Metadata } from "next";
import { Alexandria, IBM_Plex_Sans_Arabic, IBM_Plex_Serif, Oxanium } from "next/font/google";
import "./globals.css";
import "./capability.css";
import "./institution.css";
import {site} from '@/lib/site';
import {TITLE_EN} from '@/lib/seo';
import {oneMessage} from '@/lib/one-message';

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

// Editorial serif for English headings in VisionSeek Insights only (calm, research-house register).
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
      description: "VisionSeek is the institutional capability architect for Arab institutions, based in Korea. " + oneMessage.home.problem.text.en,
      email: site.email,
      telephone: site.phoneE164,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Incheon",
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
      inLanguage: ["en", "ar"],
      publisher: { "@id": "https://visionseek.org/#organization" },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://visionseek.org"),
  title: TITLE_EN,
  description: oneMessage.home.problem.text.en,
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
    },
  },
  openGraph: {
    type: "website",
    siteName: "VisionSeek",
    title: TITLE_EN,
    description: oneMessage.home.problem.text.en,
    url: "/",
    images: [{ url: "/visionseek-hero.png", alt: "VisionSeek" }],
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
    <html lang="en" dir="ltr" className={`${oxanium.variable} ${ibmPlexSansArabic.variable} ${alexandria.variable} ${ibmPlexSerif.variable}`}>
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
