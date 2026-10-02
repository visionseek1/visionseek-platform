import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { CapabilityHeader } from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import type { Locale } from '@/components/capability/content';
import { transferCopy } from '@/components/transfer/content';
import styles from '@/components/transfer/home.module.css';

const destinations = ['/programs','/opportunities','/projects','/reports','/work-with-us'];
export default function HomePage({locale}:{locale:Locale}) {
 const ar=locale==='ar'; const p=ar?'/ar':''; const c=transferCopy[locale];
 return <div className={`vs-site locale-${locale} ${styles.page}`} lang={locale} dir={ar?'rtl':'ltr'}>
  <CapabilityHeader locale={locale}/>
  <main id="main-content">
   <section className={styles.hero}>
    <div className={styles.heroCopy}><p className={styles.eyebrow}>{c.eyebrow}</p><h1 dir="ltr">Make It Possible.</h1><h2>{c.headline}</h2><p className={styles.lead}>{c.intro}</p><div className={styles.actions}><Link className={styles.primary} href={`${p}/start`}>{c.primary}<ArrowUpRight size={20}/></Link><a className={styles.textLink} href="#transfer">{c.secondary}<ArrowDown size={18}/></a></div></div>
    <div className={styles.heroVisual}><Image src="/field-industry.jpg" alt={ar?'روبوتات وتجهيزات داخل بيئة تصنيع':'Robotics and equipment in a manufacturing environment'} fill priority sizes="(max-width:900px) 100vw, 42vw"/><div className={styles.visualCaption}><span>VISIONSEEK</span><strong>{ar?'من تقنية هناك. إلى قدرة هنا.':'From technology there. To capability here.'}</strong><span>CRITICAL CAPABILITY TRANSFER</span></div></div>
   </section>
   <section className={styles.section} id="transfer"><p className={styles.eyebrow}>{ar?'نقل القدرات الحرجة':'CRITICAL CAPABILITY TRANSFER'}</p><h2>{c.bridgeTitle}</h2><p className={styles.intro}>{c.bridgeIntro}</p><div className={styles.bridge}>{c.bridge.map(([title,body],i)=><article key={title} className={i===1?styles.bridgeCenter:undefined}><span className={styles.number}>0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
   <section className={`${styles.section} ${styles.method}`} id="transfer-path"><p className={styles.eyebrow}>{ar?'كيف نبني النتيجة':'HOW WE DELIVER THE OUTCOME'}</p><h2>{c.methodTitle}</h2><p className={styles.intro}>{c.methodIntro}</p><ol className={styles.steps}>{c.steps.map(([title,body,result],i)=><li key={title}><span className={styles.number}>0{i+1}</span><div><h3>{title}</h3><p>{body}</p></div><strong>{result}</strong></li>)}</ol></section>
   <section className={styles.section}><h2>{c.assembleTitle}</h2><p className={styles.intro}>{c.assembleIntro}</p><div className={styles.ingredients}>{c.ingredients.map(([title,body])=><article key={title}><span aria-hidden="true">+</span><h3>{title}</h3><p>{body}</p></article>)}</div><div className={styles.outcome}><p className={styles.eyebrow}>{c.outcomeLabel}</p><h3>{c.outcome}</h3></div><aside className={styles.example}><div><p className={styles.eyebrow}>{c.exampleLabel}</p><h3>{c.exampleTitle}</h3></div><div><p>{c.example}</p><small>{c.exampleNote}</small></div></aside></section>
   <section className={`${styles.section} ${styles.ecosystem}`}><h2>{c.ecosystemTitle}</h2><div className={styles.links}>{c.ecosystem.map(([title,body],i)=><Link href={`${p}${destinations[i]}`} key={title}><span className={styles.number}>0{i+1}</span><h3>{title}</h3><p>{body}</p><ArrowUpRight aria-hidden="true"/></Link>)}</div><div className={styles.features}><article><p className={styles.eyebrow}>HIGHEST LEVEL ONE</p><h3>{c.hloTitle}</h3><p>{c.hloBody}</p><Link className={styles.textLink} href={`${p}/about/what-we-do#hlo`}>{c.hloLink}<ArrowUpRight size={20}/></Link></article><article><p className={styles.eyebrow}>LEADERS HOUSE</p><h3>{c.leadersTitle}</h3><p>{c.leadersBody}</p><Link className={styles.textLink} href={`${p}/insights`}>{c.leadersLink}<ArrowUpRight size={20}/></Link></article></div></section>
   <section className={`${styles.section} ${styles.contact}`} id="contact"><p className={styles.eyebrow}>MAKE IT POSSIBLE.</p><h2>{c.contactTitle}</h2><p className={styles.intro}>{c.contactBody}</p><div className={styles.actions}><Link className={styles.primary} href={`${p}/start`}>{c.primary}<ArrowUpRight size={20}/></Link><Link className={styles.textLink} href={`${p}/about/what-we-do#founder`}>{c.about}<ArrowUpRight size={20}/></Link></div><a className={styles.email} href="mailto:abdelalim@visionseek.org">abdelalim@visionseek.org</a></section>
  </main><CapabilityFooter locale={locale}/>
 </div>;
}
