import Image from "next/image";
import InstitutionHome from "@/components/institution/home-sections";
import Link from "next/link";
import { ArrowRight, Building2, Landmark, Microscope, Users, Factory, Network } from "lucide-react";
import { CapabilityHeader } from "@/components/capability/navigation";
import CapabilityFooter from "@/components/capability/footer";
import CapabilityHero from "@/components/capability/hero";
import { InstitutionExplainer } from "@/components/positioning/positioning";
import MethodSpotlight from "@/components/capability/method-spotlight";
import { communities, fields, type Locale } from "@/components/capability/content";
import { isArchived, isBlockHidden } from "@/lib/visibility";
import {site, whatsappUrl} from '@/lib/site';
import {home} from '@/lib/home';

const icons = [Building2, Landmark, Microscope, Users, Factory, Network];

export default function HomePage({locale}: {locale:Locale}) {
  const ar=locale==="ar";const p=ar?"/ar":"";
  const tx=(v:{en:string;ar:string})=>ar?v.ar:v.en;
  const {mission,reading:readingCopy,communities:communitiesCopy,fields:fieldsCopy,work,contact}=home;
  const reading=readingCopy.rows.map(r=>({href:r.href,image:r.image,category:tx(r.category),title:tx(r.title),text:tx(r.text)}));
  return <div className={`vs-site locale-${locale}`} lang={locale} dir={ar?"rtl":"ltr"}>
    <CapabilityHeader locale={locale} overlay/>
    <main id="main-content">
      <CapabilityHero locale={locale}/>
      {!isBlockHidden("home.explainer")&&<InstitutionExplainer locale={locale}/>}
      {!isBlockHidden("home.vision")&&<section className="vs-editorial" id="vision">
        <article className="vs-mission-card"><div className="vs-mini-heading"><h2>{tx(mission.heading)}</h2><Link href={`${p}/about`} aria-label={ar?"عن VisionSeek":"About VisionSeek"}><ArrowRight/></Link></div><div className="vs-editorial-image"><Image src={mission.image} alt={tx(mission.imageAlt)} fill sizes="(max-width:760px) 100vw, 50vw"/></div><p className="vs-eyebrow">{tx(mission.eyebrow)}</p><h3>{tx(mission.title)}</h3><p>{tx(mission.text)}</p><Link className="vs-text-link" href={`${p}/method`}>{tx(mission.link)}<ArrowRight size={20}/></Link></article>
        <div className="vs-reading"><div className="vs-mini-heading"><h2>{tx(readingCopy.heading)}</h2>{!isArchived('/insights')&&<Link href={`${p}/insights`}>{tx(readingCopy.headingLink)}<ArrowRight size={18}/></Link>}</div>{reading.map(r=><Link className="vs-reading-row" href={`${p}${r.href}`} key={r.href}><div className="vs-reading-image"><Image src={`/field-${r.image}.jpg`} alt="" fill sizes="(max-width:760px) 30vw, 16vw"/></div><div><p className="vs-eyebrow">{r.category}</p><h3>{r.title}</h3><p>{r.text}</p><span className="vs-inline-arrow" aria-hidden="true">↗</span></div></Link>)}</div>
      </section>}
      <InstitutionHome locale={locale}/>
      {!isBlockHidden("home.method")&&<MethodSpotlight locale={locale}/>}
      {!isBlockHidden("home.communities")&&<section className="vs-section vs-communities" id="communities"><div className="vs-section-heading"><div><p className="vs-eyebrow">{tx(communitiesCopy.eyebrow)}</p><h2>{tx(communitiesCopy.title)}</h2></div><p>{tx(communitiesCopy.text)}</p></div><div className="vs-community-grid">{communities.map((c,i)=>{const Icon=icons[i];return <Link href={`${p}/work-with-us#${c.id}`} key={c.id} className="vs-community-card"><Icon size={40} strokeWidth={1.25}/><h3>{ar?c.ar:c.en}</h3><p>{ar?c.textAr:c.textEn}</p><ArrowRight className="vs-card-arrow" size={22}/></Link>;})}</div></section>}
      {!isBlockHidden("home.fields")&&<section className="vs-section vs-fields" id="fields"><div className="vs-section-heading"><div><p className="vs-eyebrow">{tx(fieldsCopy.eyebrow)}</p><h2>{tx(fieldsCopy.title)}</h2></div><div><p>{tx(fieldsCopy.text)}</p><Link className="vs-text-link" href={`${p}/projects`}>{tx(fieldsCopy.link)}<ArrowRight size={20}/></Link></div></div><div className="vs-fields-grid">{fields.map(({id,en,ar:arabic,image:img},i)=><Link href={`${p}/projects#${id}`} key={id} className="vs-field-card"><Image src={`/field-${img}.jpg`} alt="" fill sizes="(max-width:600px) 100vw, (max-width:1000px) 50vw, 25vw"/><div><span>0{i+1}</span><h3>{ar?arabic:en}</h3><ArrowRight size={21}/></div></Link>)}</div></section>}
      {!isBlockHidden("home.work")&&<section className="vs-work-feature"><div className="vs-work-copy"><p className="vs-eyebrow">{tx(work.eyebrow)}</p><h2>{tx(work.title)}</h2><p>{tx(work.text)}</p><Link className="vs-button" href={`${p}/start`}>{tx(work.button)}<ArrowRight size={20}/></Link></div><div className="vs-work-image"><Image src={work.image} alt={tx(work.imageAlt)} fill sizes="(max-width:760px) 100vw, 50vw"/></div></section>}
      {!isBlockHidden("home.contact")&&<section className="vs-section vs-contact" id="contact"><p className="vs-eyebrow">{tx(contact.eyebrow)}</p><h2>{tx(contact.title)}</h2><Link className="vs-button" href={`${p}/start`}>{tx(contact.button)}<ArrowRight size={20}/></Link><div className="vs-contact-links"><a href={`mailto:${site.email}`}><span>{ar?"البريد الإلكتروني":"Email"}</span><strong>{site.email}</strong><ArrowRight size={22}/></a><a href={whatsappUrl()} target="_blank" rel="noreferrer"><span>{ar?"واتساب":"WhatsApp"}</span><strong dir="ltr">{site.phoneDisplay}</strong><ArrowRight size={22}/></a><a href={site.linkedinUrl} target="_blank" rel="noreferrer"><span>LinkedIn</span><strong>{ar?site.linkedinName.ar:site.linkedinName.en}</strong><ArrowRight size={22}/></a></div><Link className="vs-founder-link" id="founder" href={`${p}/about#founder`}>{tx(contact.founderLink)}<ArrowRight size={18}/></Link></section>}
    </main><CapabilityFooter locale={locale}/>
  </div>;
}
