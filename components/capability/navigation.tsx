"use client";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {Menu, ChevronDown} from "lucide-react";
import {Sheet, SheetContent, SheetTitle, SheetDescription, SheetTrigger} from "@/components/ui/sheet";
import {chooseCollapsed, headerCollapseKey, HEADER_COLLAPSE_DEFAULT_KEY} from "@/lib/institution/header-fit";
import {isArchived} from "@/lib/visibility";
import {assessCta, hq, hrefFor, localeSwitchHref, navLabel, publicNav as institutionNav, tx, type PublicLocale} from "@/lib/public-site";

const sectionIsCurrent = (path: string, sectionPath: string) =>
  path === sectionPath || (sectionPath !== "/" && path.startsWith(`${sectionPath}/`));

const languages: {code: PublicLocale; label: string; hrefLang: string}[] = [
  {code: "ar", label: "AR", hrefLang: "ar"},
  {code: "en", label: "EN", hrefLang: "en"},
  {code: "ko", label: "KR", hrefLang: "ko"},
];

export function CapabilityHeader({locale, path = "", overlay = false}: {locale: PublicLocale; path?: string; overlay?: boolean}) {
  const ar = locale === "ar";
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [collapsedKey, setCollapsedKey] = useState(HEADER_COLLAPSE_DEFAULT_KEY);
  const headerRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const collapsed = new Set(collapsedKey.split("|").filter(Boolean));
  const visibleSections = institutionNav.filter(section => !collapsed.has(section.path));
  const collapsedSections = institutionNav.filter(section => collapsed.has(section.path));
  const showLeaders = !isArchived("/leaders-house");

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setExpanded(false);
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

  const label = (section: (typeof institutionNav)[number]) => navLabel(locale, section);
  const itemHref = (target: string) => hrefFor(locale, target);

  return <header ref={headerRef} className={`vs-header vs-expanded-header ${overlay ? "vs-header-overlay" : ""}`}>
    <a className="vs-skip" href="#main-content">{ar ? "انتقل إلى المحتوى" : locale === "ko" ? "본문으로 이동" : "Skip to content"}</a>
    <div className="vs-utility">
      <p className="vs-hq-line">{tx(locale, hq)}</p>
    </div>
    <div className="vs-nav-wrap" ref={rowRef}>
      <Link href={hrefFor(locale, "/")} className="vs-logo" aria-label="VisionSeek">
        <Image src="/visionseek-logo-color.png" alt="VisionSeek" width={2048} height={682} priority/>
      </Link>
      <nav className="vs-desktop-nav" aria-label={ar ? "التنقل الرئيسي" : locale === "ko" ? "기본 탐색" : "Primary navigation"}>
        <div className="vs-nav-measure" aria-hidden="true">
          {institutionNav.map(section => <span key={section.path} data-measure={section.path} className="vs-nav-group"><span>{label(section)}</span></span>)}
          <span data-measure="__more" className="vs-more-button"><span>{ar ? "المزيد" : locale === "ko" ? "더 보기" : "More"}</span><span className="vs-nav-chevron"><ChevronDown size={14}/></span></span>
        </div>
        {visibleSections.map(section => <Link key={section.path} href={itemHref(section.path)} data-path={section.path} aria-current={sectionIsCurrent(path, section.path) ? "page" : undefined}>{label(section)}</Link>)}
        {collapsedSections.length > 0 && <div className="vs-nav-more">
          <button type="button" className="vs-more-button" aria-haspopup="true" aria-expanded={expanded} aria-controls="institution-more" onClick={() => setExpanded(value => !value)}>
            {ar ? "المزيد" : locale === "ko" ? "더 보기" : "More"}
            <ChevronDown size={14} aria-hidden="true"/>
          </button>
          {expanded && <div id="institution-more" className="vs-more-panel">
            {collapsedSections.map(section => <Link key={section.path} href={itemHref(section.path)} aria-current={sectionIsCurrent(path, section.path) ? "page" : undefined} onClick={() => setExpanded(false)}>{label(section)}</Link>)}
          </div>}
        </div>}
      </nav>
      <div className="vs-nav-actions">
        <div className="vs-language-group" aria-label={ar ? "اللغة" : locale === "ko" ? "언어" : "Language"}>
          {languages.map(language => <Link key={language.code} className="vs-language" href={localeSwitchHref(language.code, path || "/")} hrefLang={language.hrefLang} lang={language.hrefLang} aria-current={locale === language.code ? "true" : undefined}>{language.label}</Link>)}
        </div>
        <Link className="vs-start-nav" href={itemHref("/diagnostic")}>{tx(locale, assessCta)}</Link>
        {showLeaders ? null : null}
      </div>
      <div className="vs-mobile-menu">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="vs-menu-button" aria-label={ar ? "القائمة" : locale === "ko" ? "메뉴" : "Menu"}><Menu size={22} aria-hidden="true"/><span>{ar ? "القائمة" : locale === "ko" ? "메뉴" : "Menu"}</span></SheetTrigger>
          <SheetContent side={ar ? "left" : "right"} className="vs-menu-sheet vs-full-menu" dir={ar ? "rtl" : "ltr"}>
            <SheetTitle>VisionSeek</SheetTitle>
            <SheetDescription>{tx(locale, hq)}</SheetDescription>
            <nav aria-label={ar ? "قائمة الهاتف" : locale === "ko" ? "모바일 탐색" : "Mobile navigation"}>
              {institutionNav.map(section => <Link key={section.path} href={itemHref(section.path)} onClick={() => setOpen(false)}>{label(section)}</Link>)}
              {languages.map(language => <Link key={language.code} href={localeSwitchHref(language.code, path || "/")} hrefLang={language.hrefLang} onClick={() => setOpen(false)}>{language.label}</Link>)}
              <Link href={itemHref("/diagnostic")} onClick={() => setOpen(false)}>{tx(locale, assessCta)}</Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>;
}
