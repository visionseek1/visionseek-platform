import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "./content";
import { home } from "@/lib/home";

export default function CapabilityHero({locale}: {locale: Locale}) {
  const ar = locale === "ar";
  const slide = home.hero.slides[0];
  const secondary = home.hero.secondary;
  return (
    <section className="vs-hero" aria-label="VisionSeek">
      <div className="vs-slide is-active">
        <Image src={slide.image} alt="" fill sizes="100vw" priority />
        <div className="vs-hero-shade" />
        <div className="vs-hero-copy">
          <p className="vs-eyebrow">{ar ? slide.label.ar : slide.label.en}</p>
          <h1 className="vs-hero-title">{ar ? slide.title.ar : slide.title.en}</h1>
          <p className="vs-hero-sub">{ar ? slide.sub.ar : slide.sub.en}</p>
          <div className="vs-hero-actions">
            <Link className="vs-button" href={slide.href}>{ar ? slide.link.ar : slide.link.en}<ArrowRight size={20} /></Link>
            <Link className="vs-button vs-button-ghost" href={secondary.href}>{ar ? secondary.label.ar : secondary.label.en}<ArrowRight size={20} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
