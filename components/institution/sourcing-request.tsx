"use client";
import {ArrowUpRight, Mail, MessageCircle} from 'lucide-react';
import {expoSourceUrl, sourcingBoundary, sourcingFee, sourcingMailto, sourcingRequestLabel, sourcingWhatsAppLink} from '@/lib/institution/sourcing-offer';
import type {Locale} from '@/lib/institution/schema';

export function SourcingRequest({locale, compact=false, anchor=false}:{locale:Locale; compact?:boolean; anchor?:boolean}) {
  const ar = locale === 'ar';
  const label = sourcingRequestLabel[locale];
  const links = <div className="vs-sourcing-links"><a className="vs-button" href={sourcingMailto(locale)}><Mail size={18}/>{label}</a><a className="vs-secondary-button" href={sourcingWhatsAppLink(locale)} target="_blank" rel="noreferrer"><MessageCircle size={18}/>{ar ? 'واتساب' : 'WhatsApp'}</a></div>;
  if (compact) return links;
  return <section className="vs-sourcing-request" id={anchor ? 'sourcing-route-verification' : undefined}><p className="vs-eyebrow">VS-P03</p><h2>{label}</h2>{anchor && <p>{ar ? 'معاينة فقط. التطبيق الأول الموصوف هنا هو تحقق مسار توريد للعناية بالبشرة الكورية (K-Beauty)، لمستوردي مصر والخليج. العناية بالبشرة فقط، والمكياج خارج هذا التطبيق. VisionSeek موجودة في كوريا، تفحص المسار وتسلّم تقريرًا بالعربية خلال ٤٨ ساعة.' : 'Preview only. The first application described here is sourcing-route verification for Korean skincare (K-Beauty), for importers in Egypt and the Gulf. Skincare only; makeup is outside this application. VisionSeek is in Korea, checks the route, and returns an Arabic report within 48 hours.'}</p>}<p>{sourcingFee[locale]}</p><p>{sourcingBoundary[locale]}</p>{links}<p className="vs-sourcing-hint">{ar ? 'يفتح الزر قناة البريد أو واتساب الموجودة. لا يوجد نموذج، ولا يُرسل شيء من الموقع.' : 'The button opens the existing email or WhatsApp channel. There is no form, and the site sends nothing.'}</p></section>;
}

export function ExpoSource({locale}:{locale:Locale}) {
  const ar = locale === 'ar';
  return <div className="vs-source-panel"><p className="vs-eyebrow">{ar ? 'مصدر الموعد' : 'DATE SOURCE'}</p><a href={expoSourceUrl} target="_blank" rel="noreferrer">K-Beauty Expo Korea<ArrowUpRight size={19}/></a><p>{ar ? 'صفحة معلومات المعرض لدى الجهة المنظمة، وجرت مراجعتها في ٧ أكتوبر ٢٠٢٦. الموعد ١٥–١٧ أكتوبر ٢٠٢٦ في كينتكس.' : 'Organiser show-information page, reviewed on 7 October 2026. The dates are 15–17 October 2026 at KINTEX.'}</p></div>;
}
