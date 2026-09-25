"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import s from "./home-page.module.css";

const scenes = [
  { image: "/field-space.jpg", en: "BEYOND THE HORIZON", ar: "آفاق جديدة" },
  { image: "/field-industry.jpg", en: "INTELLIGENCE IN MOTION", ar: "ذكاء يتحوّل إلى عمل" },
  { image: "/field-energy.jpg", en: "SYSTEMS FOR TOMORROW", ar: "أنظمة للغد" },
];

export default function HomeScene({ locale }: { locale: "ar" | "en" }) {
  const ar = locale === "ar";
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    function syncMotion() { setReducedMotion(media.matches); }
    syncMotion();
    media.addEventListener("change", syncMotion);
    return () => media.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((index) => (index + 1) % scenes.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  const still = paused || reducedMotion;
  return (
    <>
      <div className={s.scene} data-paused={still} aria-hidden="true">
        {scenes.map((scene, index) => <div key={scene.image} className={`${s.sceneFrame} ${active === index ? s.sceneActive : ""}`}>
          <Image src={scene.image} alt="" fill sizes="100vw" priority={index === 0} quality={85} />
        </div>)}
        <div className={s.sceneShade} />
      </div>
      <div className={s.sceneControls} dir="ltr" aria-label={ar ? "الصور الافتتاحية" : "Opening images"}>
        <span className={s.sceneCaption}>{ar ? scenes[active].ar : scenes[active].en}</span>
        <div className={s.sceneButtons}>{scenes.map((scene, index) => <button key={scene.image} type="button" aria-label={ar ? `عرض: ${scene.ar}` : `Show: ${scene.en.toLowerCase()}`} aria-pressed={active === index} onClick={() => { setActive(index); setPaused(true); }}><span>0{index + 1}</span></button>)}
          {!reducedMotion && <button type="button" className={s.pause} onClick={() => setPaused((value) => !value)} aria-label={paused ? (ar ? "تشغيل الحركة" : "Play animation") : (ar ? "إيقاف الحركة" : "Pause animation")}><span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span></button>}
        </div>
      </div>
    </>
  );
}
