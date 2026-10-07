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
    <h1>{ar?'ما أثبت نفسه في مستشفيات كوريا، يستحق أن يصل إلى مرضانا.':'What has proven itself in Korea’s hospitals deserves to reach our patients.'}</h1>
    <p className={styles.lead}>{ar?'ابتكارات كورية في التشخيص والرعاية والتأهيل، تعمل اليوم على أرض الواقع. نعرض كل واحد منها بدليله ومصدره، ونقرؤه على احتياج مصر والخليج. بدأنا بالصحة، والطريق نفسه يمتد إلى قطاعات أخرى.':'Korean innovations in diagnosis, care and rehabilitation that are already in real use — each shown with its evidence and sources, and read against the needs of Egypt and the Gulf. Health is where we start; the same approach carries to other sectors.'}</p>
    <p className={styles.heroNote}>{pick(disclaimer)}</p>
   </header>

   <section id="challenges" className={styles.challenges} aria-labelledby="challenges-title">
    <div className={styles.sectionHead}>
     <h2 id="challenges-title">{ar?'خمس فجوات نعيشها كل يوم':'Five gaps we live with every day'}</h2>
     <p>{ar?'من صورة ثدي تنتظر طبيبًا يقرؤها، إلى مسنٍّ لا يطرق بابه أحد. كل فجوة هنا تقودك إلى ما جرّبته كوريا لسدّها.':'From a mammogram waiting for someone to read it to an older person nobody calls on. Each gap leads to what Korea has tried in order to close it.'}</p>
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
     <h2 id="innovations-title">{ar?'ما جرّبته كوريا':'What Korea has tried'}</h2>
     <p>{ar?'لا نطلب منك أن تصدّقنا. كل رقم هنا معه رابطه، وما قالته الشركة عن نفسها موسوم بذلك.':'We don’t ask you to take our word for it. Every figure links to its source, and anything a company says about itself is marked as such.'}</p>
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

       <h4 className={styles.blockLabel}>{ar?'أين وصل في منطقتنا':'Where it stands in our region'}</h4>
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
    <p className="vs-eyebrow">{ar?'للمستشفيات وجهات الرعاية':'FOR HOSPITALS AND CARE PROVIDERS'}</p>
    <h2 id="health-cta">{ar?'في مستشفاك واحدة من هذه الفجوات؟ لنبدأ منها.':'Is one of these gaps on your wards? Let’s start there.'}</h2>
    <p>{ar?'لا نبدأ بمنتج نبيعه، بل بالمشكلة كما تعيشها أنت كل يوم. ثم نضع أمامك ما جُرّب في كوريا، بدليله وحدوده، قبل أي خطوة.':'We don’t start with a product to sell. We start with the problem as you live it, then put in front of you what Korea has tried — its evidence and its limits — before any step is taken.'}</p>
    <Link className="vs-button" href={`${p}/start`}>{ar?'ابدأ الحديث معنا':'Start the conversation'}<ArrowRight size={20}/></Link>
   </section>

  </main>
  <CapabilityFooter locale={locale}/>
 </div>;
}
