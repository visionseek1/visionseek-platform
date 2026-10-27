"use client";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {Menu, ChevronDown, ArrowRight, UsersRound} from "lucide-react";
import {Sheet, SheetContent, SheetTitle, SheetDescription, SheetTrigger} from "@/components/ui/sheet";
import {institutionHeaderNav as institutionNav} from "@/lib/institution/navigation";
import {chooseCollapsed, headerCollapseKey, HEADER_COLLAPSE_DEFAULT_KEY} from "@/lib/institution/header-fit";
import {isArchived} from "@/lib/visibility";
import type {Locale} from "./content";

const sectionIsCurrent = (path: string, section: {path: string; children: {href: string}[]}) => {
  if (path === section.path || (section.path !== "/" && path.startsWith(`${section.path}/`))) return true;
  return section.children.some(child => {
    const href = child.href.split("#")[0];
    return Boolean(href) && (path === href || path.startsWith(`${href}/`));
  });
};

export function CapabilityHeader({locale, path = "", overlay = false}: {locale: Locale; path?: string; overlay?: boolean}) {
  const ar = locale === "ar";
  const prefix = ar ? "/ar" : "";
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [collapsedKey, setCollapsedKey] = useState(HEADER_COLLAPSE_DEFAULT_KEY);
  const headerRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const collapsed = new Set(collapsedKey.split("|").filter(Boolean));
  const visibleSections = institutionNav.filter(section => !collapsed.has(section.path));
  const collapsedSections = institutionNav.filter(section => collapsed.has(section.path));
  const moreOpen = expanded === "__more";
  const active = institutionNav.find(section => section.path === expanded && !collapsed.has(section.path));
  const moreCurrent = collapsedSections.some(section => sectionIsCurrent(path, section));
  const languageHref = `${ar ? "" : "/ar"}${path}` || "/";

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setExpanded(null);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let frame = 0;
    const measure = () => {
      const nav = row.querySelector<HTMLElement>(".vs-desktop-nav");
      const measureRoot = row.querySelector<HTMLElement>(".vs-nav-measure");
      if (!nav || !measureRoot || getComputedStyle(nav).display === "none") return;
      const widths = new Map<string, number>();
      measureRoot.querySelectorAll<HTMLElement>("[data-measure]").forEach(item => {
        const key = item.dataset.measure;
        if (key) widths.set(key, item.offsetWidth);
      });
      const moreWidth = widths.get("__more") ?? 0;
      widths.delete("__more");
      const gap = Number.parseFloat(getComputedStyle(nav).columnGap || "0") || 0;
      const next = chooseCollapsed(institutionNav.map(section => section.path), widths, nav.clientWidth, gap, moreWidth);
      if (!next) return;
      const nextKey = headerCollapseKey(next);
      setCollapsedKey(current => current === nextKey ? current : nextKey);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    schedule();
    const observer = new ResizeObserver(schedule);
    observer.observe(row);
    const fonts = document.fonts;
    fonts?.ready.then(schedule).catch(() => undefined);
    fonts?.addEventListener?.("loadingdone", schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      fonts?.removeEventListener?.("loadingdone", schedule);
    };
  }, [locale]);

  const closeMenus = () => setExpanded(null);
  const label = (section: {en: string; ar: string}) => ar ? section.ar : section.en;

  return <header ref={headerRef} className={`vs-header vs-expanded-header ${overlay ? "vs-header-overlay" : ""}`} onKeyDown={event => {
    if (event.key !== "Escape" || !expanded) return;
    const trigger = headerRef.current?.querySelector<HTMLButtonElement>(`button[data-menu="${expanded}"]`);
    setExpanded(null);
    trigger?.focus();
  }}>
    <a className="vs-skip" href="#main-content">{ar ? "انتقل إلى المحتوى" : "Skip to content"}</a>
    <div className="vs-utility">
      <nav aria-label={ar ? "روابط مساعدة" : "Utility navigation"}>
        {!isArchived("/leaders-house") && <Link className="vs-leaders-entry" href={`${prefix}/leaders-house`} aria-current={path === "/leaders-house" ? "page" : undefined}><UsersRound size={18} aria-hidden="true"/>{ar ? "بيت القادة" : "Leaders House"}</Link>}
        {!isArchived("/method") && <Link href={`${prefix}/method`}>{ar ? "منهجنا" : "Our Method"}</Link>}
        <Link href={`${prefix}/#contact`}>{ar ? "تواصل" : "Contact"}</Link>
      </nav>
    </div>
    <div className="vs-nav-wrap" ref={rowRef}>
      <Link href={prefix || "/"} className="vs-logo" aria-label={ar ? "VisionSeek — الرئيسية" : "VisionSeek — home"}>
        <Image src="/visionseek-logo-color.png" alt="VisionSeek" width={2048} height={682} priority/>
      </Link>
      <nav className="vs-desktop-nav" aria-label={ar ? "التنقل الرئيسي" : "Primary navigation"}>
        <div className="vs-nav-measure" aria-hidden="true">
          {institutionNav.map(section => <span key={section.path} data-measure={section.path} className="vs-nav-group"><span>{label(section)}</span><span className="vs-nav-chevron"><ChevronDown size={14}/></span></span>)}
          <span data-measure="__more" className="vs-more-button"><span>{ar ? "المزيد" : "More"}</span><span className="vs-nav-chevron"><ChevronDown size={14}/></span></span>
        </div>
        {visibleSections.map(section => <div className="vs-nav-group" key={section.path} data-path={section.path}>
          <Link href={`${prefix}${section.path}`} aria-current={sectionIsCurrent(path, section) ? "page" : undefined} onClick={closeMenus}>{label(section)}</Link>
          <button type="button" data-menu={section.path} aria-haspopup="true" aria-label={ar ? `قائمة ${section.ar}` : `${section.en} menu`} aria-expanded={expanded === section.path} aria-controls="institution-menu" onClick={() => setExpanded(expanded === section.path ? null : section.path)}><ChevronDown size={14}/></button>
        </div>)}
        {collapsedSections.length > 0 && <div className="vs-nav-more">
          <button type="button" className="vs-more-button" data-menu="__more" data-current={moreCurrent ? "true" : undefined} aria-haspopup="true" aria-expanded={moreOpen} aria-controls="institution-more" onClick={() => setExpanded(moreOpen ? null : "__more")}>
            {ar ? "المزيد" : "More"}
            <ChevronDown size={14} aria-hidden="true"/>
          </button>
          {moreOpen && <div id="institution-more" className="vs-more-panel">
            {collapsedSections.map(section => <div className="vs-more-section" key={section.path}>
              <Link href={`${prefix}${section.path}`} aria-current={sectionIsCurrent(path, section) ? "page" : undefined} onClick={closeMenus}>{label(section)}</Link>
              {section.children.map(({href, en, ar: arabic}) => <Link key={`${href}-${en}`} href={`${prefix}${href}`} onClick={closeMenus}>{ar ? arabic : en}</Link>)}
            </div>)}
          </div>}
        </div>}
      </nav>
      <div className="vs-nav-actions">
        <Link className="vs-language" href={languageHref} hrefLang={ar ? "en" : "ar"}>{ar ? "EN" : "العربية"}</Link>
        <Link className="vs-start-nav" href={`${prefix}/start`}>{ar ? "ابنِ حلولك معنا" : "Build your solutions with us"}</Link>
      </div>
      <div className="vs-mobile-menu">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="vs-menu-button" aria-label={ar ? "القائمة" : "Menu"}><Menu size={22} aria-hidden="true"/><span>{ar ? "القائمة" : "Menu"}</span></SheetTrigger>
          <SheetContent side={ar ? "left" : "right"} className="vs-menu-sheet vs-full-menu" dir={ar ? "rtl" : "ltr"}>
            <SheetTitle>VisionSeek</SheetTitle>
            <SheetDescription>{ar ? "اكتشف ما يمكن أن يصبح ممكنًا." : "See what could be. Make it possible."}</SheetDescription>
            <nav aria-label={ar ? "قائمة الهاتف" : "Mobile navigation"}>
              {institutionNav.map(section => <details key={section.path}>
                <summary>{label(section)}<ChevronDown size={15}/></summary>
                <Link href={`${prefix}${section.path}`} onClick={() => setOpen(false)}>{ar ? "نظرة عامة" : "Overview"}<ArrowRight size={15}/></Link>
                {section.children.filter(child => child.href !== section.path).map(({href, en, ar: arabic}) => <Link key={href} href={`${prefix}${href}`} onClick={() => setOpen(false)}>{ar ? arabic : en}</Link>)}
              </details>)}
              <Link href={languageHref} onClick={() => setOpen(false)}>{ar ? "English" : "العربية"}</Link>
              {!isArchived("/leaders-house") && <Link href={`${prefix}/leaders-house`} onClick={() => setOpen(false)}>{ar ? "بيت القادة" : "Leaders House"}</Link>}
              {!isArchived("/method") && <Link href={`${prefix}/method`} onClick={() => setOpen(false)}>{ar ? "منهجنا" : "Our Method"}</Link>}
              <Link href={`${prefix}/#contact`} onClick={() => setOpen(false)}>{ar ? "تواصل" : "Contact"}</Link>
              <Link href={`${prefix}/start`} onClick={() => setOpen(false)}>{ar ? "ابنِ حلولك معنا" : "Build your solutions with us"}</Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
    {active && <nav id="institution-menu" className="vs-mega-menu" aria-label={label(active)}>
      <div>
        <p className="vs-eyebrow">VISIONSEEK</p>
        <h2>{label(active)}</h2>
        <Link href={`${prefix}${active.path}`} onClick={closeMenus} className="vs-text-link">{ar ? "استكشف القسم" : "Explore section"}<ArrowRight size={18}/></Link>
      </div>
      <div>{active.children.map(({href, en, ar: arabic}) => <Link key={`${href}-${en}`} href={`${prefix}${href}`} onClick={closeMenus}>{ar ? arabic : en}<ArrowRight size={17}/></Link>)}</div>
    </nav>}
  </header>;
}
