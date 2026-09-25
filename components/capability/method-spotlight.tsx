"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { Locale } from "./content";

export default function MethodSpotlight({locale}: {locale:Locale}) {
  const ar=locale==="ar";const p=ar?"/ar":"";
  const parts=[
    {id:"define",label:ar?"حدد القدرة":"Define the capability",title:ar?"نبدأ بما يجب أن يصبح ممكنًا.":"Start with what should become possible.",text:ar?"مَن يجب أن يصبح قادرًا على فعل ماذا؟ نحدد القدرة، ونفهم ما يمنع وجودها اليوم، ونبحث عن المسار الذي يغير حدود الممكن.":"Who should become capable of doing what? Define the capability, understand why it does not exist today, and find the path that can change that limit.",image:"/field-cities.jpg",caption:ar?"01—03 / القدرة · الحد · المسار":"01—03 / CAPABILITY · LIMIT · PATH"},
    {id:"people",label:ar?"اجمع العناصر الصحيحة":"Assemble the right elements",title:ar?"أفضل الأشخاص. وأفضل ما هو متاح.":"The right people. The best of what exists.",text:ar?"نجمع الفريق الذي تحتاجه المهمة، ونبحث عن أفضل المعرفة والتقنيات والفرص المتاحة عالميًا. ثم نصمم كيف تعمل هذه العناصر كقدرة واحدة.":"Assemble the team the mission needs. Find the best knowledge, technology and opportunities available globally. Then design how those elements work as one capability.",image:"/field-chips.jpg",caption:ar?"04—06 / الأشخاص · HLO · المنظومة":"04—06 / PEOPLE · HLO · ARCHITECTURE"},
    {id:"prove",label:ar?"اختبر وشغّل وطوّر":"Prove, operate and evolve",title:ar?"الفكرة ليست قدرة حتى تعمل.":"An idea is not a capability until it works.",text:ar?"نحوّل الافتراضات إلى اختبارات مقاسة. نضع القدرة في العمليات الحقيقية بمسؤوليات وحوكمة واضحة، ثم نتعلم ونطوّر باستمرار.":"Turn assumptions into measurable tests. Put the capability into real operations with clear responsibilities and governance. Keep learning as the boundaries of possibility change.",image:"/field-industry.jpg",caption:ar?"07—09 / الإثبات · التشغيل · التطوير":"07—09 / PROOF · OPERATION · EVOLUTION"},
  ];
  return <section className="vs-section vs-method" id="method"><div className="vs-section-heading"><div><p className="vs-eyebrow">{ar?"هندسة الفرص":"ENGINEERING OPPORTUNITIES"}</p><h2>{ar?"كيف نجعلها ممكنة":"How we make it possible"}</h2></div><Link className="vs-text-link" href={`${p}/method`}>{ar?"المنهج كاملًا":"Our full method"}<ArrowRight size={20}/></Link></div><Tabs defaultValue="define" dir={ar?"rtl":"ltr"}><TabsList className="vs-tab-list" aria-label={ar?"مراحل المنهج":"Method stages"}>{parts.map(s=><TabsTrigger className="vs-tab" key={s.id} value={s.id}>{s.label}</TabsTrigger>)}</TabsList>{parts.map(s=><TabsContent value={s.id} key={s.id} className="vs-tab-panel"><div className="vs-spotlight-copy"><p className="vs-eyebrow">{s.caption}</p><h3>{s.title}</h3><p>{s.text}</p><Link className="vs-text-link" href={`${p}/method#${s.id}`}>{ar?"اكتشف هذه المراحل":"Explore these stages"}<ArrowRight size={20}/></Link></div><div className="vs-spotlight-image"><Image src={s.image} alt="" fill sizes="(max-width: 760px) 100vw, 50vw"/></div></TabsContent>)}</Tabs></section>;
}
