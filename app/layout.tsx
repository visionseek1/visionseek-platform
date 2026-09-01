import type { Metadata } from "next";
import "./globals.css";

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
        "A future-building institution combining technology, science, design, and entrepreneurship to create scalable products, ventures, and systems.",
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
  title: "VisionSeek | Future Technology, Science & Venture Building",
  description:
    "VisionSeek brings together technology, science, design, and entrepreneurship to turn emerging possibilities into scalable projects, products, and systems.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
    title: "VisionSeek | Future Technology, Science & Venture Building",
    description:
      "VisionSeek brings together technology, science, design, and entrepreneurship to turn emerging possibilities into scalable projects, products, and systems.",
    url: "/",
    images: [{ url: "/visionseek-hero.png", alt: "VisionSeek — We Build What Comes Next" }],
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
    <html lang="en" dir="ltr">
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
