import Link from 'next/link';
import {ArrowUpRight, ArrowRight} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {brief, briefSources, type Source} from '@/lib/reports/agent-governance';
import styles from '@/components/projects/projects.module.css';

function Sources({items}:{items:Source[]}) {
  return <ul className={styles.fearSources}>{items.map(s=><li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" dir="ltr">{s.title}<ArrowUpRight size={13} aria-hidden="true"/></a></li>)}</ul>;
}

export default function AgentGovernanceBrief({locale}:{locale:'ar'|'en'}) {
  const ar=locale==='ar';const p=ar?'/ar':'';const t=(a:string,e:string)=>ar?a:e;
  const tabs:[string,string][]=[['summary',t('الخلاصة','Summary')],['changed',t('ما الذي تغيّر','What changed')],['risk',t('الخطر','The risk')],['law',t('القانون اليوم','The law today')],['world',t('العالم','The world')],['checklist',t('14 سؤالًا','14 questions')]];
  return <div className={`vs-site locale-${locale} ${styles.page}`} dir={ar?'rtl':'ltr'} lang={locale}>
    <CapabilityHeader locale={locale} path="/reports/agent-governance"/>
    <main id="main-content">
      <section className={styles.hero}><div className={styles.heroGrid} aria-hidden="true"/><div className={styles.heroGlow} aria-hidden="true"/><div className={styles.wrap}>
        <nav className={styles.breadcrumb} aria-label={t('مسار الصفحة','Breadcrumb')}><Link href={`${p}/reports`}>{t('التقارير','Reports')}</Link><span aria-hidden="true">/</span><span>{t('إحاطة','Brief')}</span></nav>
        <p className={styles.live}><span aria-hidden="true"/>{brief.label[locale]} · {brief.dateLabel[locale]}</p>
        <h1 className={styles.hook}>{brief.title[locale]}</h1>
        <p className={styles.lede}>{brief.subtitle[locale]}</p>
      </div></section>
      <nav className={styles.tabs} aria-label={t('داخل الإحاطة','Within this brief')}><div className={styles.wrap}>{tabs.map(([id,title])=><a key={id} href={`#${id}`}>{title}</a>)}</div></nav>
      <section id="summary" className={styles.section}><div className={styles.wrap}>
        <p className={styles.eyebrow}>{t('الخلاصة في دقيقة','THE BRIEF IN A MINUTE')}</p>
        <ul className={styles.edges}>{brief.summary.map(item=><li key={item.en}>{item[locale]}</li>)}</ul>
      </div></section>
      <section id="changed" className={`${styles.section} ${styles.band}`}><div className={styles.wrap}>
        <p className={styles.eyebrow}>{t('ما الذي تغيّر','WHAT CHANGED')}</p><h2 className={styles.h2}>{t('الوكيل صار ينفّذ','Agents now act')}</h2>
        <div className={styles.workGrid}>{brief.changed.map(item=><article key={item.en}><p>{item[locale]}</p><Sources items={item.sources}/></article>)}</div>
      </div></section>
      <section id="risk" className={styles.section}><div className={styles.wrap}>
        <p className={styles.eyebrow}>{t('الخطر','THE RISK')}</p><h2 className={styles.h2}>{t('ما الذي يُبقي المسؤول مستيقظًا؟','What keeps the person in charge awake?')}</h2>
        <div className={styles.fears}>{brief.fears.map((fear,i)=><article key={fear.title.en}>
          <div className={styles.fearTop}><span dir="ltr" className={styles.mono}>{String(i+1).padStart(2,'0')}</span>{fear.figure&&<strong>{fear.figure[locale]}</strong>}</div>
          <h3>{fear.title[locale]}</h3><p>{fear[locale]}</p><Sources items={fear.sources}/>
        </article>)}</div>
      </div></section>
      <section id="law" className={`${styles.section} ${styles.band}`}><div className={styles.wrap}>
        <p className={styles.eyebrow}>{t('القانون اليوم','THE LAW TODAY')}</p><h2 className={styles.h2}>{t('ما الذي يفرضه القانون؟ بلدًا بلدًا','What does the law require? Country by country')}</h2>
        <div className={styles.workGrid}>{brief.law.map(row=><article key={row.country.en}>
          <h3>{row.country[locale]}</h3>
          <p className={styles.profileLabel}>{t('النافذ اليوم','In force today')}</p><p>{row.inForce[locale]}</p>
          <p className={styles.profileLabel}>{t('ما يمسّ الوكيل مباشرة','What touches the agent directly')}</p><p>{row.agent[locale]}</p>
          <Sources items={row.sources}/>
        </article>)}</div>
      </div></section>
      <section id="world" className={styles.section}><div className={styles.wrap}>
        <p className={styles.eyebrow}>{t('العالم','THE WORLD')}</p><h2 className={styles.h2}>{t('أين يقف العالم؟','Where does the world stand?')}</h2>
        <div className={styles.workGrid}>{brief.world.map(item=><article key={item.en}><p>{item[locale]}</p><Sources items={item.sources}/></article>)}</div>
      </div></section>
      <section id="checklist" className={`${styles.section} ${styles.band}`}><div className={styles.wrap}>
        <p className={styles.eyebrow}>{t('قبل أن يتحرك أي وكيل','BEFORE ANY AGENT MOVES')}</p><h2 className={styles.h2}>{t('أربعة عشر سؤالًا','Fourteen questions')}</h2>
        <ol className={styles.milestones}>{brief.checklist.map((q,i)=><li key={q.en} data-state="planned"><span dir="ltr">{String(i+1).padStart(2,'0')}</span><h3>{q[locale]}</h3></li>)}</ol>
      </div></section>
      <section className={styles.section}><div className={`${styles.wrap} ${styles.split}`}>
        <div className={styles.panel}><p className={styles.eyebrow}>{t('ما لم يُحسم بعد','STILL UNSETTLED')}</p><ul className={styles.list}>{brief.open.map(item=><li key={item.en}>{item[locale]}</li>)}</ul></div>
        <div className={styles.panel}><p className={styles.eyebrow}>{t('منظور VisionSeek','VISIONSEEK’S VIEW')}</p><p className={styles.big}>{brief.perspective[locale]}</p></div>
      </div></section>
      <section className={styles.section}><div className={styles.wrap}>
        <p className={styles.eyebrow}>{t('المصادر','SOURCES')}</p>
        <p className={styles.sourceNote}>{brief.note[locale]}</p>
        <ul className={styles.sources}>{briefSources().map(s=><li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" dir="ltr">{s.title}<ArrowUpRight size={14} aria-hidden="true"/></a></li>)}</ul>
      </div></section>
      <section className={styles.contact}><div className={styles.wrap}>
        <h2>{t('تريد أن يتحرك وكلاؤك بقانون بلدك؟','Want your agents to act under your country’s law?')}</h2>
        <div className={styles.actions}><Link className={styles.primary} href={`${p}/projects/institutional-ai/agent-governance/proviso-ai`}>{t('تعرّف على Proviso AI','Meet Proviso AI')}<ArrowRight size={18} aria-hidden="true"/></Link><Link className={styles.secondary} href={`${p}/start?${new URLSearchParams({from:'reports',idea:t('حوكمة الوكلاء الأذكياء','AI agent governance')})}`}>{t('تحدّث معنا','Talk to us')}</Link></div>
      </div></section>
    </main>
    <CapabilityFooter locale={locale}/>
  </div>;
}
