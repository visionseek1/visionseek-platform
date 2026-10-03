import Image from 'next/image';
import Link from 'next/link';
import {Menu} from 'lucide-react';
import {institutionNav} from '@/lib/institution/navigation';
import {localePrefix,pick,type PublicLocale as Locale} from '@/components/focus/locale';
import styles from '@/components/focus/navigation.module.css';
export function CapabilityHeader({locale,path='',overlay=false}:{locale:Locale;path?:string;overlay?:boolean}) {
 const p=localePrefix(locale), ar=locale==='ar';
 const core=['','/about','/about/what-we-do','/pharmaceuticals','/insights','/reports','/start','/work-with-us','/privacy','/terms'];
 const languagePath=core.includes(path)?path:path.startsWith('/reports')?'/reports':path.startsWith('/insights')?'/insights':'/about';
 const languages=(['ar','en','ko'] as const).map(l=><Link key={l} href={`${localePrefix(l)}${languagePath}`||'/'} hrefLang={l} lang={l} aria-current={locale===l?'page':undefined}>{l==='ar'?'العربية':l==='ko'?'한국어':'EN'}</Link>);
 const links=institutionNav.map(n=><Link key={n.path} href={`${p}${n.path}`} aria-current={path===n.path?'page':undefined}>{n[locale]}</Link>);
 return <header className={`${styles.header} ${overlay?styles.overlay:''}`} dir={ar?'rtl':'ltr'}><a className="vs-skip" href="#main-content">{pick(locale,'انتقل إلى المحتوى','Skip to content','본문으로 이동')}</a><div className={styles.utility}><span>KOREA ↔ EGYPT &amp; THE GULF</span><nav aria-label={pick(locale,'اللغة','Language','언어')}>{languages}</nav></div><div className={styles.row}><Link href={p||'/'} className={styles.logo} aria-label="VisionSeek"><Image src="/visionseek-logo-color.png" alt="VisionSeek" width={2048} height={682} priority/></Link><nav className={styles.desktop} aria-label={pick(locale,'التنقل الرئيسي','Primary navigation','주 메뉴')}>{links}</nav><details className={styles.mobile}><summary><Menu size={22}/>{pick(locale,'القائمة','Menu','메뉴')}</summary><nav aria-label={pick(locale,'قائمة الهاتف','Mobile navigation','모바일 메뉴')}>{links}<Link href={`${p}/start`}>{pick(locale,'ابنِ حلولك معنا','Build your solutions with us','함께 솔루션 만들기')}</Link></nav></details></div></header>;
}
