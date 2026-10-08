import Image from "next/image";
import {SectionNav} from "@/components/institution/pages";
import {getSection} from "@/lib/institution";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CapabilityHeader } from "./navigation";
import CapabilityFooter from "./footer";
import { steps, communities, type Locale } from "./content";
import {site} from '@/lib/site';
import {about} from '@/lib/about';

export default function InteriorPage({locale,kind}:{locale:Locale;kind:"method"|"about"|"work-with-us"}) {
  const ar=locale==="ar";const p=ar?"/ar":"";
  const tx=(v:{en:string;ar:string})=>ar?v.ar:v.en;
  const head=about.pages[kind];
  const copy={label:tx(head.label),title:tx(head.title),intro:tx(head.intro)};
  const {vision,builds,founder,workNote,closing}=about;
  return <div className={`vs-site locale-${locale}`} lang={locale} dir={ar?"rtl":"ltr"}><CapabilityHeader locale={locale} path={`/${kind}`}/><main id="main-content"><section className="vs-interior-hero"><nav className="vs-breadcrumb" aria-label={ar?"مسار الصفحة":"Breadcrumb"}><Link href={p||"/"}>{ar?"الرئيسية":"Home"}</Link><span>/</span><span>{copy.label}</span></nav><p className="vs-eyebrow">{copy.label}</p><h1>{copy.title}</h1><p className="vs-interior-intro">{copy.intro}</p></section>
    {kind==="about" && <SectionNav section={getSection("about")!} locale={locale} path="/about"/>}
    {kind==="method" && <div className="vs-method-layout"><aside><h2>{ar?"منهجنا":"Our method"}</h2><nav aria-label={ar?"خطوات المنهج":"Method steps"}>{steps.map((s,i)=><a href={`#${s.id}`} key={s.id}><span>{String(i+1).padStart(2,"0")}</span>{ar?s.ar:s.en}</a>)}</nav></aside><div>{steps.map((s,i)=><section className="vs-method-step" id={s.id} key={s.id}><span className="vs-step-number">{String(i+1).padStart(2,"0")}</span><div><p className="vs-eyebrow">{ar?s.ar:s.en}</p><h2>{ar?s.questionAr:s.questionEn}</h2><p>{ar?s.textAr:s.textEn}</p>{s.id==="architect"&&<p className="vs-equation">{ar?"الأشخاص × التكنولوجيا × المعرفة × الأنظمة × الشركاء × الفرص":"People × Technology × Knowledge × Systems × Partners × Opportunities"}</p>}<div className="vs-output"><span>{ar?"المخرج":"OUTCOME"}</span><p>{ar?s.outputAr:s.outputEn}</p></div></div></section>)}</div></div>}
    {kind==="work-with-us" && <section className="vs-section vs-audience-list">{communities.map((c,i)=><article id={c.id} key={c.id}><span className="vs-step-number">{String(i+1).padStart(2,"0")}</span><div><h2>{ar?c.ar:c.en}</h2><p>{ar?c.detailAr:c.detailEn}</p><a className="vs-text-link" href={`mailto:${site.email}?subject=${encodeURIComponent(`VisionSeek — ${c.en}`)}`}>{tx(workNote.link)}<ArrowRight size={20}/></a></div></article>)}<div className="vs-conversation-note"><h2>{tx(workNote.title)}</h2><p>{tx(workNote.text)}</p></div></section>}
    {kind==="about" && <><section className="vs-section vs-about-vision" id="vision"><p className="vs-eyebrow">{tx(vision.eyebrow)}</p><h2>{tx(vision.title)}</h2><p>{tx(vision.text)}</p></section><section className="vs-section vs-builds" id="what-we-build"><div><p className="vs-eyebrow">{tx(builds.eyebrow)}</p><h2>{tx(builds.title)}</h2><p>{tx(builds.text)}</p></div><ul>{builds.items.map(item=><li key={item.en}>{tx(item)}</li>)}</ul></section><section className="vs-section vs-founder" id="founder"><div className="vs-founder-image"><Image src={founder.image} alt={tx(founder.imageAlt)} fill sizes="(max-width:760px) 100vw, 40vw"/></div><div><p className="vs-eyebrow">{tx(founder.eyebrow)}</p><h2>{tx(founder.name)}</h2><p className="vs-founder-bio">{tx(founder.bio)}</p><p>{tx(founder.lens)}</p><p>{tx(founder.questionLead)}</p><p className="vs-founder-question">{tx(founder.question)}</p><p>{tx(founder.valueLead)}</p><p className="vs-founder-value">{tx(founder.value)}</p><p>{tx(founder.text)}</p><blockquote>{tx(founder.quote)}</blockquote></div></section></>}
    <section className="vs-section vs-interior-close"><p className="vs-eyebrow">{tx(closing.eyebrow)}</p><h2>{tx(closing.title)}</h2><Link className="vs-button" href={`${p}/start`}>{tx(closing.button)}<ArrowRight size={20}/></Link><p className="vs-closing-line">{closing.line}</p></section>
  </main><CapabilityFooter locale={locale}/></div>;
}
