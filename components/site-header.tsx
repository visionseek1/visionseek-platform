import { CapabilityHeader } from "@/components/capability/navigation";

type NavItem = { href: string; label: string };

// Retain the existing component contract for established public routes.
export default function SiteHeader({locale, languageHref}: {
  locale: "ar" | "en";
  items: NavItem[];
  languageHref: string;
  solid?: boolean;
}) {
  const path = languageHref.replace(/^\/ar(?=\/|$)/, "").replace(/\/$/, "");
  return <div className={`vs-site vs-legacy-header locale-${locale}`} dir={locale === "ar" ? "rtl" : "ltr"}><CapabilityHeader locale={locale} path={path}/></div>;
}
