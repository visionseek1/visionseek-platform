import Link from 'next/link';
import {ArrowRight, ArrowUpRight} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {innovations, disclaimer, perCompanyLabel, inferenceLabel} from '@/lib/health/innovations';
import type {Locale} from '@/lib/institution/schema';
import styles from './health.module.css';

export default function HealthPage({locale}:{locale:Locale}){
 const ar=locale==='ar'; const p=ar?'/ar':'';
 const pick=(x:{en:string;ar:string})=>ar?x.ar:x.en;
 return <div className={`vs-site locale-${locale}`} lang={locale} dir={ar?'rtl':'ltr'}>
  <CapabilityHeader locale={locale} path="/health"/>
  <main id="main-content">

   <header className={styles.hero}>
    <p className="vs-eyebrow">{ar?'الصحة والرعاية':'HEALTH & CARE'}</p>
    <h1>{ar?'ما جرّبته كوريا في رعاية الإنسان، نضعه أمام احتياج مصر والخليج.':'Korean health innovations, proven in practice, read against the needs of Egypt and the Gulf.'}</h1>
    <p className={styles.lead}>{ar?'نرصد ابتكارات كورية في الصحة والرعاية، مُختبرة على الأرض، ونقرأ كل واحد منها بدليله ومصدره. بدأنا بالصحة، والمنهج نفسه يمتد إلى قطاعات أخرى.':'We track Korean innovations in health and care that have been tested in real operation, each shown with its evidence and sources. Health is where we begin; the same method extends to other sectors.'}</p>
    <p className={styles.heroNote}>{pick(disclaimer)}</p>
   </header>

   <section id="challenges" className={styles.challenges} aria-labelledby="challenges-title">
    <div className={styles.sectionHead}>
     <h2 id="challenges-title">{ar?'خمسة تحديات في المنطقة':'Five challenges in the region'}</h2>
     <p>{ar?'كل تحدٍّ يقود إلى الابتكار الذي رصدناه له.':'Each challenge links to the innovation we observed for it.'}</p>
    </div>
    <ol className={styles.challengeList}>
     {innovations.map((item,i)=>
      <li key={item.slug}>
       <Link href={`#${item.slug}`}>
        <span className={styles.challengeNumber} aria-hidden>{String(i+1).padStart(2,'0')}</span>
        <span className={styles.challengeName}>{pick(item.challenge)}</span>
        <span className={styles.challengeField}>{pick(item.field)}</span>
        <ArrowRight className={styles.challengeArrow} size={19} aria-hidden/>
       </Link>
      </li>)}
    </ol>
   </section>

   <section id="innovations" className={styles.innovations} aria-labelledby="innovations-title">
    <div className={styles.sectionHead}>
     <h2 id="innovations-title">{ar?'الابتكارات المرصودة':'The observed innovations'}</h2>
     <p>{ar?'كل رقم هنا مرفق بمصدره. ما مصدره الشركة موسوم بذلك.':'Every figure here carries its source. Anything sourced from the company is marked as such.'}</p>
    </div>
    <div className={styles.cards}>
     {innovations.map(item=>
      <article key={item.slug} id={item.slug} className={styles.card}>
       <p className={styles.field}>{pick(item.field)}</p>
       <h3>{item.name}</h3>
       <p className={styles.company}>{pick(item.company)}</p>
       <p className={styles.description}>{pick(item.description)}</p>

       <h4 className={styles.blockLabel}>{ar?'الدليل':'Evidence'}</h4>
       <ul className={styles.evidence}>
        {item.evidence.map((e,i)=>
         <li key={i}>
          <span>{pick(e.claim)}</span>
          {e.perCompany&&<em className={styles.marker}>{pick(perCompanyLabel)}</em>}
          <a href={e.url} target="_blank" rel="noreferrer">{ar?'المصدر':'Source'}<ArrowUpRight size={14} aria-hidden/></a>
         </li>)}
       </ul>

       <h4 className={styles.blockLabel}>{ar?'في المنطقة':'In the region'}</h4>
       {item.region.links.length===0
        ? <p className={styles.regionNote}>{pick(item.region.note)}{item.regionInference&&<em className={styles.marker}>{pick(inferenceLabel)}</em>}</p>
        : <ul className={styles.evidence}>
           {item.region.links.map((e,i)=>
            <li key={i}>
             <span>{pick(e.claim)}</span>
             {e.perCompany&&<em className={styles.marker}>{pick(perCompanyLabel)}</em>}
             <a href={e.url} target="_blank" rel="noreferrer">{ar?'المصدر':'Source'}<ArrowUpRight size={14} aria-hidden/></a>
            </li>)}
          </ul>}

       <p className={styles.disclaimer}>{pick(disclaimer)}</p>
      </article>)}
    </div>
   </section>

   <section className={styles.cta} aria-labelledby="health-cta">
    <p className="vs-eyebrow">{ar?'لمستشفى أو جهة رعاية':'FOR A HOSPITAL OR CARE PROVIDER'}</p>
    <h2 id="health-cta">{ar?'في مستشفاك تحدٍّ من هذه؟ تعال نرى ما جُرّب في كوريا.':'Does your hospital face one of these challenges? Let’s look at what Korea has already tested.'}</h2>
    <p>{ar?'نبدأ بالتحدي كما تعيشه أنت، لا بالمنتج. ثم نقرأ معك ما رُصد، بدليله وحدوده، قبل أي خطوة.':'We start with the challenge as you live it, not with a product. Then we read what has been observed, with its evidence and its limits, before any step.'}</p>
    <Link className="vs-button" href={`${p}/start`}>{ar?'ابدأ المحادثة':'Start the conversation'}<ArrowRight size={20}/></Link>
   </section>

  </main>
  <CapabilityFooter locale={locale}/>
 </div>;
}
