import Link from 'next/link';
import {ArrowRight,ArrowUpRight} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {programEntries} from '@/lib/institution/programs';
import type {Locale} from '@/lib/institution/schema';
import HloSection from '@/components/positioning/hlo-section';
import HloFilm from './hlo-film';
import positioning from '@/components/positioning/positioning.module.css';
import styles from './programs.module.css';

export function ProgramCollection({locale,home=false}:{locale:Locale;home?:boolean}){
  const ar=locale==='ar';const base=ar?'/ar':'';
  return <section className={styles.collection} id="programs-list" aria-labelledby="programs-heading">
    <div className={styles.collectionHead}><div><p className={styles.eyebrow}>{ar?'منهج واضح. ونتيجة نعمل للوصول إليها.':'A CLEAR METHOD. AN OUTCOME TO WORK TOWARD.'}</p><h2 id="programs-heading">{ar?'برامج VisionSeek.':'VisionSeek programs.'}</h2></div>{home&&<Link className={styles.textLink} href={`${base}/programs`}>{ar?'كل البرامج':'All programs'}<ArrowRight size={20}/></Link>}</div>
    <div className={styles.cards}>{programEntries.map((program,index)=><article className={styles.card} key={program.slug}>
      <div className={styles.programIdentity}><span className={styles.programNumber}>{String(index+1).padStart(2,'0')} / VISIONSEEK PROGRAMS</span><strong>{program.code}</strong><span className={styles.fullName} dir="ltr">{program.title.en.replace(`${program.code} — `,'')}</span><ArrowUpRight size={44} aria-hidden="true"/></div>
      <div className={styles.programCopy}><span className={styles.status}>{program.status[locale]}</span><p className={styles.eyebrow}>{program.category[locale]}</p><h3>{program.title[locale]}</h3><p>{program.summary[locale]}</p><div className={styles.cardBottom}><span>{program.facts?.[0]?.value[locale]}</span><Link className={styles.primary} href={`${base}/programs/${program.slug}`}>{ar?'اكتشف البرنامج':'Explore the program'}<ArrowRight size={20}/></Link></div></div>
    </article>)}</div>
  </section>;
}

export default function ProgramsPage({locale}:{locale:Locale}){
  const ar=locale==='ar';const base=ar?'/ar':'';
  return <div className={`vs-site locale-${locale}`} lang={locale} dir={ar?'rtl':'ltr'}>
    <CapabilityHeader locale={locale} path="/programs"/>
    <main id="main-content" className={styles.page}>
      <section className={styles.hero}><p className={styles.eyebrow}>{ar?'VISIONSEEK / البرامج':'VISIONSEEK / PROGRAMS'}</p><h1>{ar?'طموح يتحوّل إلى عمل.':'Ambition becomes action.'}</h1><p>{ar?'برامج تنقل المؤسسات والحكومات إلى مستوى أعلى من الاستفادة من الفرص والقدرات التي يتيحها العالم. لكل برنامج هدف واضح، ومنهج للعمل، ونتيجة نسعى لإثباتها.':'Programs that help institutions and governments reach a higher level by applying global opportunities and capabilities. Each program has a clear purpose, a method and an outcome to prove.'}</p><a className={styles.textLink} href="#programs-list">{ar?'تعرّف على برامجنا':'Explore our programs'}<ArrowRight size={20}/></a></section>
      <ProgramCollection locale={locale}/>
      <section className={styles.nextStep}><div><p className={styles.eyebrow}>{ar?'برنامج يبدأ من مؤسستك':'A PROGRAM THAT STARTS WITH YOUR INSTITUTION'}</p><h2>{ar?'أين تريد أن تصل بمؤسستك؟':'Where do you want to take your institution?'}</h2><p>{ar?'ابدأ بالنتيجة التي تريد تحقيقها. نناقش معك كيف يمكن أن يساعدك HLO، وما النطاق المناسب للخطوة الأولى.':'Start with the outcome you want to achieve. Discuss how HLO could help and the right scope for a first step.'}</p></div><Link className={styles.primary} href={`${base}/start?from=programs&program=hlo`}>{ar?'ناقش HLO معنا':'Discuss HLO with us'}<ArrowRight size={20}/></Link></section>
      <nav className={styles.supporting} aria-label={ar?'منهج تطوير البرامج':'Program development method'}><Link className={styles.textLink} href={`${base}/programs/program-lifecycle`}>{ar?'كيف نطوّر البرامج؟':'How do we develop programs?'}<ArrowRight size={18}/></Link><Link className={styles.textLink} href={`${base}/about/what-we-do`}>{ar?'ما الذي يميّز VisionSeek؟':'Why VisionSeek?'}<ArrowRight size={18}/></Link></nav>
    </main><CapabilityFooter locale={locale}/>
  </div>;
}

export function HloProgramPage({locale}:{locale:Locale}){
  const ar=locale==='ar';const base=ar?'/ar':'';const hlo=programEntries.find(p=>p.slug==='hlo')!;
  return <div className={`vs-site locale-${locale}`} lang={locale} dir={ar?'rtl':'ltr'}>
    <CapabilityHeader locale={locale} path="/programs/hlo"/>
    <main id="main-content" className={`${positioning.page} ${styles.detail}`}>
      <div className={styles.programTop}><nav aria-label={ar?'مسار الصفحة':'Breadcrumb'}><Link href={`${base}/programs`}>{ar?'البرامج':'Programs'}</Link><span>/</span><span>HLO</span></nav><span className={styles.status}>{hlo.status[locale]}</span></div>
      <section className={styles.filmHero} aria-labelledby="hlo-title">
        <div className={styles.filmHeading}><div><p className={styles.eyebrow}>HIGHEST LEVEL ONE</p><h1 id="hlo-title">HLO</h1></div><div><h2>{ar?'العالم يمتلك أكثر مما تراه مؤسستك.':'The world holds more than your institution can see.'}<span>{ar?'ضعه في خدمة طموحك.':'Put it to work for your ambition.'}</span></h2><p>{ar?'برنامج VisionSeek للوصول بمؤسستك إلى أعلى مستوى قابل للتطبيق، عبر الفرص والقدرات المتاحة في العالم. نكشف ما لا تراه، ونختار ما يفيدك، ونربطه بواقع عملك.':'The VisionSeek program for taking your institution to its highest practically achievable level through global opportunities and capabilities. Reveal what you have yet to see, choose what creates value and connect it to how you work.'}</p><a className={styles.textLink} href="#hlo-program-film">{ar?'شاهد كيف يعمل HLO':'Watch how HLO works'}<ArrowRight size={20}/></a></div></div>
        <div id="hlo-program-film"><HloFilm locale={locale}/></div>
      </section>
      <HloSection locale={locale} showHeader={false}/>
      <section className={styles.audience}><div><p className={styles.eyebrow}>{ar?'لمن يعمل HLO؟':'WHO IS HLO FOR?'}</p><h2>{ar?'للمؤسسة التي تريد أن تعرف خطوتها التالية، وتبدأ فيها.':'For institutions ready to find their next step and take it.'}</h2></div><div><p>{ar?'للمؤسسات والحكومات وفرق القيادة التي تريد ربط طموحها بتقنيات ومعرفة وفرص يمكن تطبيقها في واقعها. نبدأ باحتياج واضح، وصاحب قرار، ونطاق يسمح باختبار القيمة.':'For institutions, governments and leadership teams seeking to connect their ambition with technology, knowledge and opportunities they can apply. Start with a clear need, a decision owner and a scope that allows value to be tested.'}</p><p>{ar?'يتشكّل مسار HLO حول احتياج مؤسستك. نحدّد معك النطاق والمدة والتكلفة والمسؤوليات، ثم ننطلق بمخرجات واضحة لكل مرحلة.':'HLO is shaped around your institution’s needs. Together we define scope, timing, cost and responsibilities, with clear outputs for every stage.'}</p></div></section>
      <section className={positioning.contact}><p className={positioning.eyebrow}>{ar?'ابدأ مع HLO':'START WITH HLO'}</p><h2>{ar?'ما النتيجة التي تريد أن نعمل عليها معك؟':'What outcome would you like us to work on together?'}</h2><p>{ar?'شاركنا احتياج مؤسستك أو القرار الذي يشغلك. نراجع معك ملاءمة البرنامج ونتفق على خطوة محددة قبل بدء العمل.':'Share your institution’s need or the decision on your mind. Review the program’s fit with us and agree on a defined next step before work begins.'}</p><Link className={positioning.primary} href={`${base}/start?from=programs&program=hlo`}>{ar?'ناقش HLO لمؤسستك':'Discuss HLO for your institution'}<ArrowRight size={20}/></Link><Link className={positioning.textLink} href={`${base}/programs`}>{ar?'العودة إلى البرامج':'Back to programs'}<ArrowRight size={18}/></Link></section>
    </main><CapabilityFooter locale={locale}/>
  </div>;
}
