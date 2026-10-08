"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { Locale } from "./content";
import { home } from "@/lib/home";

export default function MethodSpotlight({locale}: {locale:Locale}) {
  const ar=locale==="ar";const p=ar?"/ar":"";
  const tx=(v:{en:string;ar:string})=>ar?v.ar:v.en;
  const copy=home.method;
  const parts=copy.parts.map(s=>({id:s.id,label:tx(s.label),title:tx(s.title),text:tx(s.text),image:s.image,caption:tx(s.caption)}));
  return <section className="vs-section vs-method" id="method"><div className="vs-section-heading"><div><p className="vs-eyebrow">{tx(copy.eyebrow)}</p><h2>{tx(copy.title)}</h2></div><Link className="vs-text-link" href={`${p}/method`}>{tx(copy.link)}<ArrowRight size={20}/></Link></div><Tabs defaultValue="define" dir={ar?"rtl":"ltr"}><TabsList className="vs-tab-list" aria-label={ar?"مراحل المنهج":"Method stages"}>{parts.map(s=><TabsTrigger className="vs-tab" key={s.id} value={s.id}>{s.label}</TabsTrigger>)}</TabsList>{parts.map(s=><TabsContent value={s.id} key={s.id} className="vs-tab-panel"><div className="vs-spotlight-copy"><p className="vs-eyebrow">{s.caption}</p><h3>{s.title}</h3><p>{s.text}</p><Link className="vs-text-link" href={`${p}/method#${s.id}`}>{tx(copy.stageLink)}<ArrowRight size={20}/></Link></div><div className="vs-spotlight-image"><Image src={s.image} alt="" fill sizes="(max-width: 760px) 100vw, 50vw"/></div></TabsContent>)}</Tabs></section>;
}
