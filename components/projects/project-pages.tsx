import Link from 'next/link';
import {ArrowUpRight, ArrowRight, ExternalLink, Fuel, Ship, Waves} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {projects, projectPath, projectInquiry, type Project, type Locale} from '@/lib/projects';
import {explorationFields} from '@/lib/projects/fields';
import styles from './projects.module.css';

function EnergyVisual({kind, locale}: {kind: Project['kind']; locale: Locale}) {
  const ar = locale === 'ar';
  return <div className={`${styles.visual} ${kind === 'fleet' ? styles.fleetVisual : ''}`}>
    <div className={styles.visualTop}><span>VISIONSEEK / ENERGY</span><span>{kind === 'supply' ? '01' : '02'}</span></div>
    <svg viewBox="0 0 640 320" fill="none" aria-hidden="true" className={styles.shipDrawing}>
      <path d="M0 245H640M0 265H640M0 285H640" stroke="currentColor" strokeOpacity=".13"/>
      <path d="M52 206H457L422 242H112L52 206Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity=".06"/>
      <path d="M91 205V168H139V205M104 168V148H126V168M115 148V132" stroke="currentColor" strokeWidth="2"/>
      {[164, 238, 312].map(x => <g key={x}><rect x={x} y="156" width="58" height="50" rx="15" stroke="currentColor" strokeWidth="2"/><path d={`M${x + 10} 156V140H${x + 48}V156`} stroke="currentColor" strokeOpacity=".6"/></g>)}
      <path d="M140 183H406M406 183V206M474 242V110H609V242M487 111V75H597V111M509 74V51M569 74V51" stroke="currentColor" strokeOpacity=".5" strokeWidth="2"/>
      <path d="M373 165H438V130H490M551 160H618" stroke="currentColor" strokeWidth="3" strokeDasharray={kind === 'fleet' ? '6 7' : undefined}/>
      <circle cx="438" cy="165" r="5" fill="currentColor"/><circle cx="551" cy="160" r="5" fill="currentColor"/>
      <path d="M53 63H308M53 77H199M53 91H244" stroke="currentColor" strokeOpacity=".18"/>
      {kind === 'fleet' && <path d="M328 59H440V101H377V135" stroke="currentColor" strokeOpacity=".7" strokeDasharray="4 6"/>}
    </svg>
    <div className={styles.visualCaption}><span>{kind === 'supply' ? (ar ? 'من البحر إلى الشبكة' : 'FROM VESSEL TO GRID') : (ar ? 'من الأصول إلى الأداء' : 'FROM ASSETS TO PERFORMANCE')}</span><small>{ar ? 'رسم توضيحي' : 'CONCEPT ILLUSTRATION'}</small></div>
  </div>;
}

function ProjectCard({project, locale}: {project: Project; locale: Locale}) {
  const ar = locale === 'ar';
  return <article className={styles.projectCard}>
    <Link className={styles.visualLink} href={projectPath(project.slug, locale)} aria-label={project.title[locale]}><EnergyVisual kind={project.kind} locale={locale}/></Link>
    <div className={styles.cardBody}>
      <div className={styles.cardMeta}><span>{project.id}</span><span className={styles.stage}>{project.stage[locale]}</span></div>
      <p className={styles.location}>{project.region[locale]}</p>
      <h2><Link href={projectPath(project.slug, locale)}>{project.title[locale]}</Link></h2>
      <p className={styles.summary}>{project.summary[locale]}</p>
      <div className={styles.cardOutput}><span>{ar ? 'ما نطمح إليه' : 'THE POSSIBILITY'}</span><p>{project.promise[locale]}</p></div>
      <Link className={styles.openLink} href={projectPath(project.slug, locale)}>{ar ? 'تعرّف على الفكرة' : 'Explore the idea'}<ArrowUpRight size={21}/></Link>
    </div>
  </article>;
}

export function ProjectsIndex({locale}: {locale: Locale}) {
  const ar = locale === 'ar';
  const base = ar ? '/ar' : '';
  return <div className={`vs-site locale-${locale} ${styles.page}`} dir={ar ? 'rtl' : 'ltr'} lang={locale}>
    <CapabilityHeader locale={locale} path="/projects"/>
    <main id="main-content">
      <section className={styles.hero}>
        <p className={styles.eyebrow}>{ar ? 'المشاريع / هندسة الفرص' : 'PROJECTS / ENGINEERING OPPORTUNITIES'}</p>
        <h1>{ar ? <>نختار أين<br/><em>نصنع الفارق.</em></> : <>Choose where<br/><em>to make a difference.</em></>}</h1>
        <div className={styles.heroBottom}><p>{ar ? 'نرى في القدرات الموجودة حول العالم فرصًا لبناء شيء أكبر. هنا نعرض أفكار VisionSeek ومشاريعها، وما نسعى من خلالها إلى إتاحته للمؤسسات والدول.' : 'Global capabilities open opportunities to build something greater. Explore VisionSeek’s ideas and projects, and what they could make possible for institutions and countries.'}</p><a href="#project-files" className={styles.heroAnchor}>{ar ? 'استكشف المشاريع' : 'Explore projects'}<ArrowRight size={22}/></a></div>
      </section>
      <section id="project-files" className={styles.portfolio}>
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{ar ? 'البداية من الطاقة' : 'STARTING WITH ENERGY'}</p><h2>{ar ? 'الغاز الطبيعي المسال' : 'Liquefied natural gas'}</h2></div><span className={styles.count}>02 <small>{ar ? 'تصوران' : 'CONCEPTS'}</small></span></div>
        <p className={styles.portfolioNote}>{ar ? 'تصوران تستكشفهما VisionSeek في الطاقة والغاز المسال، مع توضيح المرحلة الحالية لكل فكرة.' : 'Two VisionSeek concepts in energy and LNG, each presented with its current stage of exploration.'}</p>
        <div className={styles.projectList}>{projects.map(project => <ProjectCard key={project.id} project={project} locale={locale}/>)}</div>
      </section>
      <section className={styles.methodBand}><span className={styles.methodNumber}>×</span><div><h2>{ar ? 'القدرات موجودة. والفرصة في اتصالها.' : 'Capabilities exist. Opportunity connects them.'}</h2><p>{ar ? 'قد تكمن الفرصة في وصل احتياج محلي بتقنية في بلد آخر، أو جمع خبرات متفرقة حول طموح واحد. هذه هي الزاوية التي ننظر منها إلى مشاريعنا.' : 'An opportunity may connect a local need with technology from another country, or bring separate fields of expertise around a shared ambition. This is the perspective behind our projects.'}</p><Link href={`${base}/about`}>{ar ? 'عن VisionSeek' : 'About VisionSeek'}<ArrowUpRight size={18}/></Link></div></section>
      <section id="fields" className={styles.fields}><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{ar ? 'مجالات الاستكشاف' : 'EXPLORATION FIELDS'}</p><h2>{ar ? 'مجال أوسع لما قد نبنيه.' : 'A wider field of possibility.'}</h2></div></div><p>{ar ? 'مجالات نبحث فيها عن فرص تفتح آفاقًا جديدة للمؤسسات والدول.' : 'Fields where we explore opportunities to open new horizons for institutions and countries.'}</p><div className={styles.fieldGrid}>{explorationFields.map(field => <article id={field.id} key={field.id}><span>{ar ? 'قيد الاستكشاف' : 'EXPLORING'}</span><h3>{ar ? field.title : field.english}</h3><p>{ar ? field.description : field.englishDescription}</p>{field.id === 'energy' && <a href="#project-files">{ar ? 'أفكار الطاقة' : 'Energy concepts'}<ArrowUpRight size={17}/></a>}</article>)}</div></section>
      <section className={styles.indexCta}><Fuel size={30}/><div><h2>{ar ? 'هل ترى فرصة نبنيها معًا؟' : 'See an opportunity we could build together?'}</h2><p>{ar ? 'شاركنا اهتمامك بهذه الأفكار، أو فرصة ترى أنها تستحق أن تتحول إلى واقع.' : 'Share your interest in these ideas, or an opportunity you would like to bring to life.'}</p></div><Link className="vs-button" href={`${base}/start`}>{ar ? 'ناقش فرصة معنا' : 'Discuss an opportunity'}<ArrowRight size={19}/></Link></section>
    </main>
    <CapabilityFooter locale={locale}/>
  </div>;
}

export function ProjectDetail({project, locale}: {project: Project; locale: Locale}) {
  const ar = locale === 'ar';
  const base = ar ? '/ar' : '';
  const next = projects.find(item => item.id !== project.id)!;
  return <div className={`vs-site locale-${locale} ${styles.page}`} dir={ar ? 'rtl' : 'ltr'} lang={locale}>
    <CapabilityHeader locale={locale} path={`/projects/${project.slug}`}/>
    <main id="main-content">
      <section className={styles.detailHero}>
        <nav className={styles.breadcrumb} aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}><Link href={`${base}/projects`}>{ar ? 'المشاريع' : 'Projects'}</Link><span>/</span><Link href={`${base}/projects#project-files`}>{ar ? 'الطاقة' : 'Energy'}</Link><span>/</span><span>{project.id}</span></nav>
        <div className={styles.detailHeroGrid}><div><p className={styles.eyebrow}>{project.region[locale]} / LNG</p><h1>{project.title[locale]}</h1><p className={styles.detailSummary}>{project.summary[locale]}</p><span className={styles.stage}>{project.stage[locale]}</span></div><EnergyVisual kind={project.kind} locale={locale}/></div>
      </section>
      <nav className={styles.anchorNav} aria-label={ar ? 'داخل المشروع' : 'In this project'}><a href="#idea">{ar ? 'الفكرة' : 'The idea'}</a><a href="#potential">{ar ? 'القيمة المنشودة' : 'The potential'}</a><a href="#vision">{ar ? 'رؤية VisionSeek' : 'Our perspective'}</a><a href="#context">{ar ? 'السياق والمراجع' : 'Context & references'}</a></nav>
      <div className={styles.detailLayout}>
        <aside className={styles.projectFacts}><span className={styles.eyebrow}>{ar ? 'عن التصور' : 'ABOUT THE CONCEPT'}</span><dl><div><dt>{ar ? 'المجال' : 'FIELD'}</dt><dd>{ar ? 'الطاقة / الغاز الطبيعي المسال' : 'Energy / Liquefied natural gas'}</dd></div><div><dt>{ar ? 'النطاق الجغرافي' : 'REGION'}</dt><dd>{project.region[locale]}</dd></div><div><dt>{ar ? 'المرحلة' : 'STAGE'}</dt><dd>{project.stage[locale]}</dd></div><div><dt>{ar ? 'لمن تهم هذه الفكرة؟' : 'WHO IS THIS FOR?'}</dt><dd>{project.beneficiary[locale]}</dd></div></dl><Link className="vs-button" href={projectInquiry(project,locale)}>{ar ? 'ناقش هذه الفكرة' : 'Discuss this idea'}<ArrowRight size={18}/></Link></aside>
        <div className={styles.detailBody}>
          <section id="idea"><span className={styles.sectionNumber}>01 / {ar ? 'الفكرة' : 'THE IDEA'}</span><h2>{project.question[locale]}</h2><p>{project.idea[locale]}</p></section>
          <section id="potential"><span className={styles.sectionNumber}>02 / {ar ? 'القيمة المنشودة' : 'THE POTENTIAL'}</span><h2>{project.promise[locale]}</h2><p>{project.significance[locale]}</p><div className={styles.optionGrid}>{project.possibilities.map((possibility,i) => <article key={possibility.title.en}><span>0{i+1}</span><h3>{possibility.title[locale]}</h3><p>{possibility.text[locale]}</p></article>)}</div></section>
          <section id="vision"><span className={styles.sectionNumber}>03 / {ar ? 'رؤية VisionSeek' : 'OUR PERSPECTIVE'}</span><h2>{ar ? 'ما الذي نراه في هذه الفرصة؟' : 'What do we see in this opportunity?'}</h2><div className={styles.role}><p>{project.vision[locale]}</p></div></section>
          <section id="context"><span className={styles.sectionNumber}>04 / {ar ? 'السياق والمراجع' : 'CONTEXT & REFERENCES'}</span><h2>{ar ? 'الفكرة في سياقها.' : 'The idea in context.'}</h2><p>{ar ? 'مراجع عامة تشرح خلفية الفكرة. الجهات المذكورة مصادر للمعلومات وليست شركاء معلنين في المشروع.' : 'Public references providing background to the concept. The named organizations are information sources, not announced project partners.'}</p><div className={styles.sources}>{project.sources.map(source => <article key={source.url}><div><span>{source.publisher}</span><time dateTime={source.date}>{source.date}</time></div><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title[locale]}<ExternalLink size={17}/></a><p>{source.note[locale]}</p></article>)}</div><p className={styles.reviewDate}>{ar ? 'آخر مراجعة للمراجع: 27 سبتمبر 2026.' : 'References last reviewed: 27 September 2026.'}</p></section>
        </div>
      </div>
      <section className={styles.nextProject}><div>{project.kind === 'supply' ? <Ship size={28}/> : <Waves size={28}/>}<p>{ar ? 'فكرة مرتبطة' : 'RELATED CONCEPT'}</p><h2>{next.title[locale]}</h2><span>{next.stage[locale]}</span></div><Link href={projectPath(next.slug,locale)}>{ar ? 'استكشف الفكرة' : 'Explore the idea'}<ArrowUpRight size={22}/></Link></section>
    </main>
    <CapabilityFooter locale={locale}/>
  </div>;
}
