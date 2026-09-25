"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import type { Locale } from "./content";

export function CapabilityHeader({ locale, path = "", overlay = false }: { locale: Locale; path?: string; overlay?: boolean }) {
  const ar = locale === "ar";
  const prefix = ar ? "/ar" : "";
  const [open, setOpen] = useState(false);
  const links = [
    ["/work-with-us", ar ? "اعمل معنا" : "Work with Us"],
    ["/method", ar ? "منهجنا" : "Our Method"],
    ["/projects", ar ? "المجالات" : "Fields"],
    ["/insights", ar ? "بيت القادة" : "Leaders House"],
    ["/about", ar ? "عن VisionSeek" : "About"],
    ["/#contact", ar ? "تواصل" : "Contact"],
  ];
  return <header className={`vs-header ${overlay ? "vs-header-overlay" : ""}`}>
    <a className="vs-skip" href="#main-content">{ar ? "انتقل إلى المحتوى" : "Skip to content"}</a>
    <div className="vs-utility"><span>{ar ? "هندسة الفرص" : "ENGINEERING OPPORTUNITIES"}</span><span>{ar ? "إنتشون، كوريا الجنوبية" : "INCHEON, SOUTH KOREA"}</span></div>
    <div className="vs-nav-wrap">
      <Link href={prefix || "/"} className="vs-logo" aria-label={ar ? "VisionSeek — الرئيسية" : "VisionSeek — home"}><Image src="/visionseek-logo-v2.png" alt="VisionSeek" width={1920} height={440} priority /></Link>
      <nav className="vs-desktop-nav" aria-label={ar ? "التنقل الرئيسي" : "Primary navigation"}>
        {links.map(([href,label]) => <Link key={href} href={`${prefix}${href}`} aria-current={path === href ? "page" : undefined}>{label}</Link>)}
        <Link className="vs-language" href={`${ar ? "" : "/ar"}${path}` || "/"} hrefLang={ar ? "en" : "ar"}>{ar ? "EN" : "العربية"}</Link>
      </nav>
      <div className="vs-mobile-menu"><Sheet open={open} onOpenChange={setOpen}><SheetTrigger className="vs-menu-button"><Menu size={22}/><span>{ar ? "القائمة" : "Menu"}</span></SheetTrigger><SheetContent side={ar ? "left" : "right"} className="vs-menu-sheet" dir={ar ? "rtl" : "ltr"}><SheetTitle>VisionSeek</SheetTitle><SheetDescription>{ar ? "اكتشف ما يمكن أن يصبح ممكنًا." : "See what could be. Make it possible."}</SheetDescription><nav aria-label={ar ? "قائمة الهاتف" : "Mobile navigation"}>{links.map(([href,label]) => <Link key={href} href={`${prefix}${href}`} onClick={() => setOpen(false)}>{label}</Link>)}<Link href={`${ar ? "" : "/ar"}${path}` || "/"} onClick={() => setOpen(false)}>{ar ? "English" : "العربية"}</Link></nav></SheetContent></Sheet></div>
    </div>
  </header>;
}
