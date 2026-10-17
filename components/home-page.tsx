import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CapabilityHeader } from "@/components/capability/navigation";
import CapabilityFooter from "@/components/capability/footer";
import CapabilityHero from "@/components/capability/hero";
import CapabilityBriefForm from "@/components/capability/brief-form";
import MethodSpotlight from "@/components/capability/method-spotlight";
import { isBlockHidden } from "@/lib/visibility";
import { home } from "@/lib/home";
import type { Locale } from "@/components/capability/content";

const programs = [
  {code: "VS-P01", slug: "aegis", image: "/field-cities.jpg", en: "Aegis — Trusted Institutional AI & Operational Grounding", ar: "Aegis — التأصيل المؤسسي وتشغيل الذكاء الاصطناعي الموثوق"},
  {code: "VS-P02", slug: "apex", image: "/field-industry.jpg", en: "Apex — Embedded Chief Capability Architect", ar: "Apex — هندسة القدرات القيادية الميدانية للمؤسسات"},
];

export default function HomePage({locale}: {locale: Locale}) {
  const ar = locale === "ar";
  const p = ar ? "/ar" : "";
  const tx = (v: {en: string; ar: string}) => ar ? v.ar : v.en;
  const {architecture} = home;
  return <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? "rtl" : "ltr"}>
    <CapabilityHeader locale={locale} overlay/>
    <main id="main-content">
      <CapabilityHero locale={locale}/>
      <section className="vs-architecture" id="architecture">
        <div className="vs-architecture-image"><Image src={architecture.image} alt={tx(architecture.imageAlt)} width={900} height={1100} /></div>
        <div>
          <p className="vs-eyebrow">{tx(architecture.eyebrow)}</p>
          <h2>{tx(architecture.title)}</h2>
          <p>{tx(architecture.text)}</p>
        </div>
      </section>
      {!isBlockHidden("home.method") && <MethodSpotlight locale={locale}/>}
      {!isBlockHidden("home.programs") && <section className="vs-section vs-home-programs" id="programs">
        <div className="vs-section-heading">
          <div><p className="vs-eyebrow">{ar ? "البرامج المعتمدة" : "CORE PROGRAMS"}</p><h2>{ar ? "برنامجان جاهزان للبدء" : "Two programs, ready to start"}</h2></div>
          <Link className="vs-text-link" href={`${p}/programs`}>{ar ? "كل البرامج" : "All programs"}<ArrowRight size={20}/></Link>
        </div>
        <div className="vs-home-program-grid">{programs.map(program => <Link href={`${p}/programs/${program.slug}`} key={program.slug}><div><Image src={program.image} alt="" fill sizes="(max-width:760px) 100vw, 50vw"/></div><p className="vs-eyebrow">{program.code}</p><h3>{ar ? program.ar : program.en}</h3><span>{ar ? "افتح البرنامج" : "Open the program"}<ArrowRight size={18}/></span></Link>)}</div>
      </section>}
      <CapabilityBriefForm locale={locale}/>
    </main>
    <CapabilityFooter locale={locale}/>
  </div>;
}
