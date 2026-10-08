import type {CSSProperties} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {ArrowUpRight} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {offeredProgramSources, type OfferedAudience, type OfferedProgram, type OfferedSource} from '@/lib/institution/offered-programs';
import type {Text} from '@/lib/institution/schema';
import styles from '@/components/projects/projects.module.css';

const audienceLabels:Record<OfferedAudience,Text> = {
  government:{en:'Governments', ar:'الحكومات'},
  institution:{en:'Institutions', ar:'المؤسسات'},
  company:{en:'Companies', ar:'الشركات'},
  individual:{en:'Individuals', ar:'الأفراد'},
};
const allAudiences = Object.keys(audienceLabels) as OfferedAudience[];

function Sources({items}:{items:OfferedSource[]}) {
  return <ul className={styles.fearSources}>{items.map(s=><li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" dir="ltr">{s.title}<ArrowUpRight size={13} aria-hidden="true"/></a></li>)}</ul>;
}

/** A program offered to institutions (/programs/<slug>), in the projects' «Signal» design: the fear first, then the way out. */
export default function OfferedProgramPage({program,locale}:{program:OfferedProgram;locale:'ar'|'en'}) {
  const ar=locale==='ar';const p=ar?'/ar':'';const t=(a:string,e:string)=>ar?a:e;
  const start=`${p}/start?${new URLSearchParams({from:'programs',program:program.slug})}`;
  const tabs:[string,string][]=[['risk',t('الخطر','The risk')],['example',t('مثال','Example')],['gains',t('الفائدة','Who gains')],['why-now',t('لماذا الآن','Why now')],['how',t('كيف يعمل','How it works')]];
  const edgeSources=program.edges.flatMap(edge=>edge.sources??[]);
  return <div className={`vs-site locale-${locale} ${styles.page}`} dir={ar?'rtl':'ltr'} lang={locale} style={{'--tone':program.tone} as CSSProperties}>
    <CapabilityHeader locale={locale} path={`/programs/${program.slug}`}/>
    <main id="main-content">
      <section className={styles.hero}><div className={styles.heroGrid} aria-hidden="true"/><div className={styles.heroGlow} aria-hidden="true"/><div className={styles.wrap}>
        <nav className={styles.breadcrumb} aria-label={t('مسار الصفحة','Breadcrumb')}><Link href={`${p}/programs`}>{t('البرامج','Programs')}</Link><span aria-hidden="true">/</span><span dir="ltr">{program.code}</span></nav>
        <div className={styles.detailGrid}>
          <div className={styles.detailMain}>
            <div className={styles.identity}><span dir="ltr" className={styles.code}>{program.code}</span><span className={styles.statusQuiet}>{program.status[locale]}</span></div>
            <p className={styles.projectName}><Image src={program.logo} alt="" width={44} height={44} unoptimized className={styles.projectLogo}/><span dir="ltr">{program.name}</span></p>
            <h1 className={styles.hook}>{program.hook[locale]}</h1>
            <p className={styles.lede}>{program.question[locale]}</p>
            <p className={styles.lede}>{program.promise[locale]}</p>
            <div className={styles.actions}><Link className={styles.primary} href={start}>{program.cta[locale]}<ArrowUpRight size={18} aria-hidden="true"/></Link></div>
          </div>
          <aside className={styles.profile} aria-label={t('بطاقة البرنامج','Program card')}>
            <div className={styles.profileHead}><span className={styles.mono}>PROGRAM CARD</span><span>{t('بطاقة البرنامج','Program card')}</span></div>
            <div><p className={styles.profileLabel}>{t('مصمَّم لـ','Designed for')}</p>
              <ul className={styles.audiences}>{allAudiences.map(a=>{const on=program.profile.audiences.includes(a);return <li key={a} className={on?styles.audienceOn:styles.audienceOff}>{audienceLabels[a][locale]}{!on&&<span className={styles.srOnly}>{t(' (غير مستهدف)',' (not targeted)')}</span>}</li>;})}</ul>
            </div>
            <div className={styles.facts}>{program.profile.facts.map(fact=><article key={fact.url} className={fact.kind==='exhibition'?styles.factExhibition:styles.factTrend}>
              <div className={styles.factTop}><span>{fact.kind==='exhibition'?t('معرض دولي','International exhibition'):t('الاتجاه العالمي','Global trend')}</span>{fact.value&&<span dir="ltr" className={styles.mono}>{fact.value}</span>}</div>
              <h3>{fact.title[locale]}</h3><p>{fact.detail[locale]}</p>
              <a href={fact.url} target="_blank" rel="noopener noreferrer">{t('المصدر','Source')}<ArrowUpRight size={14} aria-hidden="true"/></a>
            </article>)}</div>
          </aside>
        </div>
      </div></section>
      <nav className={styles.tabs} aria-label={t('داخل البرنامج','Within this program')}><div className={styles.wrap}>{tabs.map(([id,title])=><a key={id} href={`#${id}`}>{title}</a>)}</div></nav>
      <section id="risk" className={styles.section}><div className={styles.wrap}>
        <p className={styles.eyebrow}>{t('الخطر','THE RISK')}</p><h2 className={styles.h2}>{program.risksTitle[locale]}</h2>
        <div className={styles.fears}>{program.fears.map((fear,i)=><article key={fear.title.en}>
          <div className={styles.fearTop}><span dir="ltr" className={styles.mono}>{String(i+1).padStart(2,'0')}</span>{fear.figure&&<strong dir="auto">{fear.figure[locale]}</strong>}</div>
          <h3>{fear.title[locale]}</h3><p>{fear.body[locale]}</p><Sources items={fear.sources}/>
        </article>)}</div>
      </div></section>
      <section id="example" className={`${styles.section} ${styles.band}`}><div className={styles.wrap}>
        <p className={styles.eyebrow}>{t('مثال','AN EXAMPLE')}</p><h2 className={styles.h2}>{program.scenario.title[locale]}</h2>
        <p className={styles.prose}>{program.scenario.setup[locale]}</p>
        <div className={styles.scenario}>
          <div className={styles.without}><span>{t('من دونه','Without it')}</span><p>{program.scenario.without[locale]}</p></div>
          <div className={styles.withIt}><span>{t('معه','With it')}</span><p>{program.scenario.with[locale]}</p></div>
        </div>
        <p className={styles.sourceNote}>{program.scenario.note[locale]}</p>
      </div></section>
      <section id="gains" className={styles.section}><div className={styles.wrap}>
        <p className={styles.eyebrow}>{t('الفائدة','WHO GAINS')}</p><h2 className={styles.h2}>{t('ماذا يكسب كل طرف؟','What each side gains')}</h2>
        <div className={styles.workGrid}>{program.gains.map(gain=><article key={gain.who.en}><span className={styles.mono}>{gain.who[locale]}</span><p className={styles.gainText}>{gain.text[locale]}</p></article>)}</div>
      </div></section>
      <section id="why-now" className={`${styles.section} ${styles.band}`}><div className={styles.wrap}>
        <p className={styles.eyebrow}>{t('التوقيت','WHY NOW')}</p><h2 className={styles.h2}>{t('لماذا الآن؟','Why now')}</h2>
        <div className={styles.highlights}>{program.whyNow.highlights.map(h=><div key={h.text.en}><strong dir="auto">{h.value[locale]}</strong><p>{h.text[locale]}</p></div>)}</div>
        <p className={styles.prose}>{program.whyNow.paragraph[locale]}</p>
        <p className={styles.sourceNote}>{t('مصادر علنية، وليست شراكات ولا تكليفات.','Public sources, not partnerships or engagements.')}</p>
        <ul className={styles.sources}>{program.whyNow.sources.map(s=><li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" dir="ltr">{s.title}<ArrowUpRight size={14} aria-hidden="true"/></a></li>)}</ul>
      </div></section>
      <section className={styles.section}><div className={styles.wrap}>
        <p className={styles.eyebrow}>{t('الفرق','WHAT SETS IT APART')}</p><h2 className={styles.h2}>{t('ما الذي يميّزه؟','What sets it apart')}</h2>
        <ul className={styles.edges}>{program.edges.map(edge=><li key={edge.en}>{edge[locale]}</li>)}</ul>
        {edgeSources.length>0&&<Sources items={edgeSources}/>}
      </div></section>
      <section id="how" className={`${styles.section} ${styles.band}`}><div className={styles.wrap}>
        <p className={styles.eyebrow}>{t('الطريقة','HOW IT WORKS')}</p><h2 className={styles.h2}>{t('كيف يعمل؟','How it works')}</h2>
        <div className={styles.workGrid}>{program.stages.map(stage=><article key={stage.id} className={stage.optional?styles.stageOptional:stage.id==='proof'?styles.stageKey:undefined}>
          <span className={styles.mono}>{stage.duration[locale]}</span><h3>{stage.name[locale]}</h3><p>{stage.body[locale]}</p>
        </article>)}</div>
        <p className={`${styles.profileLabel} ${styles.conditionsLabel}`}>{t('شروط الدخول','Entry conditions')}</p>
        <ul className={`${styles.chips} ${styles.conditions}`}>{program.conditions.map(c=><li key={c.en}>{c[locale]}</li>)}</ul>
      </div></section>
      <section className={styles.section}><div className={styles.wrap}>
        <p className={styles.eyebrow}>{t('المصادر','SOURCES')}</p>
        <ul className={styles.sources}>{offeredProgramSources(program).map(s=><li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" dir="ltr">{s.title}<ArrowUpRight size={14} aria-hidden="true"/></a></li>)}</ul>
      </div></section>
      <section className={styles.contact}><div className={styles.wrap}>
        <h2>{program.contactTitle[locale]}</h2>
        <div className={styles.actions}><Link className={styles.primary} href={start}>{program.cta[locale]}<ArrowUpRight size={18} aria-hidden="true"/></Link></div>
      </div></section>
    </main>
    <CapabilityFooter locale={locale}/>
  </div>;
}
