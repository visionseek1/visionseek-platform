"use client";

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/components/capability/content';
import styles from './positioning.module.css';

const steps = [
  {ar:'نفهم مؤسستك',en:'Understand your institution',titleAr:'ما الذي تريد تغييره فعلًا؟',titleEn:'What needs to change?',bodyAr:'نبدأ بقرار مهم أو نتيجة محددة، ونفهم واقع المؤسسة وأصولها وما يعوق تقدمها. قد تكون بعض عناصر الحل موجودة داخلها بالفعل.',bodyEn:'Start with an important decision or a specific outcome. Understand current operations, existing assets and the constraints. Some parts of the answer may already exist inside the institution.',outputAr:'نتيجة محددة وصورة موثقة للوضع الحالي.',outputEn:'A defined outcome and an evidenced view of the current situation.'},
  {ar:'نكشف الفرص',en:'Reveal the opportunities',titleAr:'ما الذي وصل إليه العالم ويمكن أن يفيدك؟',titleEn:'What has the world developed that could help you?',bodyAr:'نبحث عن تقنيات ومعرفة ونماذج عمل وشركاء، ونربطها باحتياجك. نقارن بين الاستخدام المباشر، والترخيص، والشراكة، وبناء ما ينقص الحل.',bodyEn:'Look for technology, knowledge, business models and partners that fit your need. Compare direct use, licensing, partnership and building the missing pieces.',outputAr:'خريطة فرص مرتبة، وقرار بشأن الفرصة التي تستحق البدء.',outputEn:'A ranked opportunity map and a decision on where to start.'},
  {ar:'نختبر القيمة',en:'Test the value',titleAr:'هل تصنع هذه الفرصة فرقًا في واقعك؟',titleEn:'Does the opportunity make a difference in your context?',bodyAr:'نختار فرصة واحدة ونصمم اختبارًا محدودًا، بمقياس نجاح متفق عليه قبل البدء. نجمع الدليل الذي يساعد القيادة على الاستمرار أو التعديل أو التوقف.',bodyEn:'Choose one opportunity and design a bounded test, with success measures agreed in advance. Gather evidence so leadership can decide to proceed, adapt or stop.',outputAr:'خطة اختبار ونتيجة تساعد على اتخاذ قرار.',outputEn:'A test plan and findings that inform a decision.'},
  {ar:'نحدد مسار التشغيل',en:'Define the operating path',titleAr:'كيف يصبح ما أثبتناه جزءًا من عمل المؤسسة؟',titleEn:'How could the proven approach become part of operations?',bodyAr:'إذا دعم الدليل الاستمرار، نحدد المسؤولين والموارد والشركاء والمراحل اللازمة للتشغيل. يتحدد نطاق التنفيذ التالي باتفاق واضح مع المؤسسة.',bodyEn:'If evidence supports proceeding, define the owners, resources, partners and stages needed for operation. Agree the scope of the next delivery stage with the institution.',outputAr:'مسار تشغيل واضح، أو قرار مسبب بتغيير المسار أو إيقافه.',outputEn:'A clear operating path, or a reasoned decision to change direction or stop.'},
];

export default function HloPath({locale}:{locale:Locale}) {
  const ar=locale==='ar';
  const [active,setActive]=useState(0);
  const step=steps[active];
  return <div className={styles.path}>
    <div className={styles.stepButtons} role="group" aria-label={ar?'استكشف رحلة HLO':'Explore the HLO journey'}>
      {steps.map((item,index)=><button key={item.en} type="button" aria-pressed={active===index} aria-controls="hlo-step-description" onClick={()=>setActive(index)}><span aria-hidden="true">0{index+1}</span>{ar?item.ar:item.en}</button>)}
    </div>
    <div id="hlo-step-description" className={styles.stepPanel} aria-live="polite" aria-atomic="true">
      <span className={styles.stepNumber} aria-hidden="true">0{active+1}</span>
      <div><h3>{ar?step.titleAr:step.titleEn}</h3><p>{ar?step.bodyAr:step.bodyEn}</p><div className={styles.stepOutput}><ArrowRight aria-hidden="true" size={20}/><p><strong>{ar?'ما نخرج به':'The output'}</strong>{ar?step.outputAr:step.outputEn}</p></div></div>
    </div>
  </div>;
}
