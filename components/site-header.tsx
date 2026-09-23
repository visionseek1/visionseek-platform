"use client";

import Image from "next/image";
import Link from "next/link";

type NavItem = { href: string; label: string };

export default function SiteHeader({
  locale,
  items,
  languageHref,
  solid = false,
}: {
  locale: "ar" | "en";
  items: NavItem[];
  languageHref: string;
  solid?: boolean;
}) {
  const ar = locale === "ar";
  const home = ar ? "/ar" : "/";

  function closeMenu(event: React.MouseEvent<HTMLAnchorElement>) {
    const details = event.currentTarget.closest("details");
    if (details) details.open = false;
  }

  return (
    <header className={solid ? "topbar insights-topbar" : "topbar"}>
      <Link className="logo" href={home} aria-label="VisionSeek home">
        <Image src="/visionseek-logo-v2.png" alt="VisionSeek" width={1920} height={440} priority />
      </Link>
      <nav className="desktop-nav" aria-label={ar ? "التنقل الرئيسي" : "Primary"}>
        {items.map((item) => (
          <Link key={item.href + item.label} href={item.href}>{item.label}</Link>
        ))}
        <Link className="language-link" href={languageHref}>{ar ? "EN" : "العربية"}</Link>
        <span className="nav-node" aria-hidden="true" />
      </nav>
      <details className="nav-drawer">
        <summary>{ar ? "القائمة" : "MENU"}</summary>
        <nav className="nav-panel" aria-label={ar ? "قائمة الموبايل" : "Mobile"}>
          {items.map((item) => (
            <Link key={`m-${item.href}-${item.label}`} href={item.href} onClick={closeMenu}>{item.label}</Link>
          ))}
          <Link className="language-link" href={languageHref} onClick={closeMenu}>{ar ? "EN" : "العربية"}</Link>
        </nav>
      </details>
    </header>
  );
}
