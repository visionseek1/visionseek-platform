import Image from 'next/image';
import Link from 'next/link';
import {institutionNav} from '@/lib/institution/navigation';
import {localePrefix,pick,type PublicLocale as Locale} from '@/components/focus/locale';
import {focusCopy} from '@/components/focus/content';
export default function CapabilityFooter({locale}:{locale:Locale}) {
 const p=localePrefix(locale);
 return <footer className="vs-footer vs-institution-footer"><div className="vs-footer-brand"><div><div className="vs-footer-logo"><Image src="/visionseek-logo-color.png" alt="VisionSeek" width={2048} height={682}/></div><p>{focusCopy[locale].description}</p></div><div><strong>Make It Possible.</strong><a href="mailto:abdelalim@visionseek.org">abdelalim@visionseek.org</a><span>{pick(locale,'إنتشون، كوريا الجنوبية · كوريا، مصر والخليج','Incheon, South Korea · Korea, Egypt & the Gulf','대한민국 인천 · 한국, 이집트 및 걸프 지역')}</span></div></div><nav className="vs-focused-footer-links" aria-label={pick(locale,'خريطة الموقع','Site navigation','사이트 메뉴')}>{institutionNav.map(n=><Link href={`${p}${n.path}`} key={n.path}>{n[locale]}</Link>)}</nav><div className="vs-footer-bottom"><span>© 2026 VisionSeek</span><nav aria-label={pick(locale,'روابط قانونية','Legal','법적 고지')}><Link href={`${p}/privacy`}>{pick(locale,'الخصوصية والبيانات','Privacy & data','개인정보 및 데이터')}</Link><Link href={`${p}/terms`}>{pick(locale,'الشروط','Terms','이용 조건')}</Link></nav></div></footer>;
}
