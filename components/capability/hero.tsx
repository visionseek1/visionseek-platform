import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import {localePrefix,pick,type PublicLocale as Locale} from '@/components/focus/locale';
import {focusCopy} from '@/components/focus/content';
export default function CapabilityHero({locale}:{locale:Locale}) {
 const ar=locale==='ar',p=localePrefix(locale),c=focusCopy[locale];
 return <section className="vs-hero vs-focus-hero" aria-label={ar?'مهمة VisionSeek':'VisionSeek mission'}><div className="vs-slide is-active"><Image src="/field-cities.jpg" alt="" fill sizes="100vw" priority/><div className="vs-hero-shade"/><div className="vs-hero-copy"><p className="vs-eyebrow">{c.direction}</p><h1 dir="ltr">Make It Possible.</h1><p className="vs-hero-sub">Critical Capability Transfer — نقل القدرات الحرجة</p><p className="vs-hero-description">{c.description}</p><Link className="vs-button" href="#contact">{pick(locale,'ابنِ حلولك معنا','Build your solutions with us','함께 솔루션 만들기')}<ArrowRight size={20}/></Link><Link className="vs-focus-secondary" href={`${p}/pharmaceuticals`}>{pick(locale,'الصناعة الدوائية: أول تخصص نبدأ به','Pharmaceuticals: our first specialization','제약: 첫 번째 전문 분야')}<ArrowRight size={18}/></Link></div></div></section>;
}
