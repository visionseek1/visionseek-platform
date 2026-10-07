import type {ReactNode} from 'react';
import Link from 'next/link';
import {ArrowUpRight, ArrowRight, Zap, Cpu, Plane, ShieldCheck, Bot, HeartPulse, Wheat, Building2} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {sectors, tracks, projects, featuredProjects, projectStatus, conceptNotice, conceptCount, prefix, sectorBySlug, sectorPath, trackPath, projectPath, projectInquiry, type Sector, type Track, type Project, type Locale} from '@/lib/projects';
import styles from './projects.module.css';
import {ProjectRail} from './project-rail';
import {projectFileById, publicProjectUpdates} from '@/lib/projects/project-files';

const icons = {energy:Zap,chips:Cpu,flight:Plane,defense:ShieldCheck,robotics:Bot,health:HeartPulse,agriculture:Wheat,cities:Building2};

function Frame({locale,path,children}:{locale:Locale;path:string;children:ReactNode}) {
  return <div className={`vs-site locale-${locale} ${styles.page}`} dir={locale==='ar'?'rtl':'ltr'} lang={locale}>
    <CapabilityHeader locale={locale} path={path}/><main id="main-content">{children}</main><CapabilityFooter locale={locale}/>
  </div>;
}
function Breadcrumb({locale,sector,track,code}:{locale:Locale;sector?:Sector;track?:Track;code?:string}) {
  const ar=locale==='ar';
  return <nav className={styles.breadcrumb} aria-label={ar?'مسار الصفحة':'Breadcrumb'}>
    <Link href={`${prefix(locale)}/projects`}>{ar?'المشاريع':'Projects'}</Link>
    {sector&&<><span>/</span><Link href={sectorPath(sector.slug,locale)}>{sector.title[locale]}</Link></>}
    {track&&<><span>/</span><Link href={trackPath(track,locale)}>{track.title[locale]}</Link></>}
    {code&&<><span>/</span><span dir="ltr">{code}</span></>}
  </nav>;
}
function Notice({locale}:{locale:Locale}) {return <p className={styles.notice}>{conceptNotice[locale]}</p>;}

function EnergyVisual({kind,locale}:{kind:Project['kind'];locale:Locale}) {
  const ar=locale==='ar';const supply=kind==='supply';
  return <div className={`${styles.visual} ${supply?'':styles.containmentVisual}`}>
    <div className={styles.visualTop}><span>VISIONSEEK / LNG</span><span>{supply?'VS-P07':'VS-P08'}</span></div>
    <svg viewBox="0 0 640 320" fill="none" aria-hidden="true" className={styles.drawing}>
      {supply?<>
        <path d="M0 248H640M0 269H640M0 290H640" stroke="currentColor" strokeOpacity=".12"/>
        <path d="M53 205H445L413 242H110L53 205Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity=".04"/>
        <path d="M88 205V164H135V205M101 164V144H123V164M113 144V123" stroke="currentColor" strokeWidth="2"/>
        {[160,232,304].map(x=><rect key={x} x={x} y="156" width="57" height="49" rx="13" stroke="currentColor" strokeWidth="2"/>)}
        <path d="M377 169H438V117H490M487 242V96H603V242M506 96V66M576 96V66" stroke="currentColor" strokeOpacity=".65" strokeWidth="2"/>
        <path d="M547 160H638" stroke="currentColor" strokeWidth="3"/><circle cx="547" cy="160" r="5" fill="currentColor"/>
        <path d="M57 59H286M57 75H190M57 91H245" stroke="currentColor" strokeOpacity=".18"/>
      </>:<>
        <path d="M66 259H574M90 278H550" stroke="currentColor" strokeOpacity=".2"/>
        <path d="M92 107L133 65H251L292 107V210L251 250H133L92 210Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity=".03"/>
        <path d="M108 114L140 81H244L276 114V204L244 234H140L108 204Z" stroke="currentColor" strokeOpacity=".5" strokeDasharray="5 6"/>
        <path d="M350 107L391 65H509L550 107V210L509 250H391L350 210Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity=".07"/>
        <path d="M366 114L398 81H502L534 114V204L502 234H398L366 204Z" stroke="currentColor" strokeOpacity=".7"/>
        <path d="M311 150H333M322 139V161M92 172H292M350 172H550" stroke="currentColor" strokeOpacity=".45"/>
        <circle cx="450" cy="158" r="40" stroke="currentColor" strokeOpacity=".3"/>
      </>}
    </svg>
    <div className={styles.visualCaption}><span>{supply?(ar?'التحكم في الإمداد':'CONTROL OVER SUPPLY'):(ar?'الاختيار على مستوى الأسطول':'CHOICE AT FLEET SCALE')}</span><small>{ar?'رسم تصوري':'CONCEPT ILLUSTRATION'}</small></div>
  </div>;
}
function ProjectCard({project,locale}:{project:Project;locale:Locale}) {
  return <article className={styles.projectCard}>
    <Link href={projectPath(project.slug,locale)} className={styles.visualLink} aria-label={project.title[locale]}><EnergyVisual kind={project.kind} locale={locale}/></Link>
    <div className={styles.cardBody}>
      <p className={styles.eyebrow} dir="ltr">{project.id}</p>
      <h3><Link href={projectPath(project.slug,locale)}>{project.title[locale]}</Link></h3>
      <p className={styles.summary}>{project.summary[locale]}</p>
      <Link className={styles.openLink} href={projectPath(project.slug,locale)}>{locale==='ar'?'افتح ملف المشروع':'View project file'}<ArrowUpRight size={20}/></Link>
    </div>
  </article>;
}
function ConceptCollection({items,locale}:{items:Project[];locale:Locale}) {
  return <><div className={styles.projectList}>{items.map(project=><ProjectCard key={project.id} project={project} locale={locale}/>)}</div><Notice locale={locale}/></>;
}
// Health leads and points at its own section. Defense is not surfaced; its pages still resolve.
export const visibleSectors = [
  ...sectors.filter(s=>s.slug==='health'),
  ...sectors.filter(s=>s.slug!=='health'&&s.slug!=='defense'),
];
function SectorGrid({locale}:{locale:Locale}) {
  const ar=locale==='ar';
  return <div className={styles.sectorGrid}>{visibleSectors.map((sector,i)=>{
    const Icon=icons[sector.icon];const count=projects.filter(p=>p.sector===sector.slug).length;
    const health=sector.slug==='health';
    return <article className={styles.sectorCard} key={sector.slug}>
      {sector.anchors.map(anchor=><span className={styles.anchor} id={anchor} key={anchor}/>)}
      <Link href={health?`${locale==='ar'?'/ar':''}/health`:sectorPath(sector.slug,locale)}>
        <div className={styles.sectorTop}><Icon size={32} strokeWidth={1.3}/><span dir="ltr">0{i+1}</span></div>
        <h3>{health?(ar?'الصحة والرعاية':'Health & Care'):sector.title[locale]}</h3><p>{health?(ar?'خمسة ابتكارات كورية مرصودة، كل واحد بدليله ومصدره.':'Five observed Korean innovations, each with its evidence and sources.'):sector.intro[locale]}</p>
        <div className={styles.sectorBottom}><span>{health?(ar?'القطاع الأول':'Where we begin'):count?conceptCount(count,locale):(ar?'استكشاف':'Exploration')}</span><ArrowUpRight size={19}/></div>
      </Link>
    </article>;
  })}</div>;
}
function Contact({locale}:{locale:Locale}) {
  const ar=locale==='ar';
  return <section className={styles.contact}><div><p className={styles.eyebrow}>{ar?'من الفرصة إلى الحل':'FROM OPPORTUNITY TO SOLUTION'}</p><h2>{ar?'ما الذي تريد تغييره في مؤسستك؟':'What do you want to change in your institution?'}</h2></div><Link className="vs-button" href={`${prefix(locale)}/start`}>{ar?'ابنِ حلولك معنا':'Build your solutions with us'}<ArrowRight size={20}/></Link></section>;
}
export function ProjectsIndex({locale}:{locale:Locale}) {
  const ar=locale==='ar';
  return <Frame locale={locale} path="/projects">
    <section className={`${styles.hero} ${styles.indexHero}`}><p className={styles.eyebrow}>{ar?'VISIONSEEK / المشاريع':'VISIONSEEK / PROJECTS'}</p><h1>{ar?<>مشاريع تفتح <em>خيارات جديدة.</em></>:<>Projects that open <em>new possibilities.</em></>}</h1><p className={styles.indexIntro}>{ar?'أفكارنا ومشاريعنا في مكان واحد. ابدأ بمشروع يهمك، أو استكشف المجالات.':'Our ideas and projects, in one place. Start with a project that matters to you, or explore the sectors.'}</p></section>
    {featuredProjects.length>0&&<><ProjectRail locale={locale}>{featuredProjects.map(project=><Link key={project.id} href={projectPath(project.slug,locale)} className={styles.spotlightCard} aria-label={`${project.id} — ${project.title[locale]} — ${projectStatus[project.status][locale]}`}>
      <div className={styles.spotlightArt} aria-hidden="true"><EnergyVisual kind={project.kind} locale={locale}/></div>
      <div className={styles.spotlightTop}><span className={`${styles.projectStatus} ${project.status==='active'?styles.activeStatus:''}`}>{projectStatus[project.status][locale]}</span><span dir="ltr">{project.id}</span></div>
      <div className={styles.spotlightCopy}><p>{sectorBySlug(project.sector)?.title[locale]} <span> / LNG</span></p><h3>{project.title[locale]}</h3><div className={styles.spotlightFooter}><span>{ar?'استكشف المشروع':'Explore project'}</span><ArrowUpRight size={22}/></div></div>
    </Link>)}</ProjectRail>{featuredProjects.some(p=>p.status==='concept')&&<div className={styles.spotlightNotice}><Notice locale={locale}/></div>}</>}
    <section id="fields" className={styles.section}><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{ar?'المشاريع حسب المجال':'PROJECTS BY SECTOR'}</p><h2>{ar?'أين نصنع الفارق؟':'Where can we make a difference?'}</h2></div><span className={styles.count}>{String(visibleSectors.length).padStart(2,'0')}</span></div><SectorGrid locale={locale}/></section>
    <Contact locale={locale}/>
  </Frame>;
}
export function SectorPage({sector,locale}:{sector:Sector;locale:Locale}) {
  const ar=locale==='ar';const children=tracks.filter(track=>track.sector===sector.slug);const Icon=icons[sector.icon];
  return <Frame locale={locale} path={sectorPath(sector.slug,'en')}>
    <section className={styles.sectorHero}><Breadcrumb locale={locale}/><div className={styles.sectorHeroBody}><div><p className={styles.eyebrow}>{ar?'مجال المشاريع':'PROJECT SECTOR'}</p><h1>{sector.title[locale]}</h1><p>{sector.intro[locale]}</p></div><Icon className={styles.sectorEmblem} size={112} strokeWidth={.8} aria-hidden="true"/></div></section>
    {children.length?<section className={styles.section}><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{ar?'داخل المجال':'WITHIN THE SECTOR'}</p><h2>{ar?'استكشف التخصصات':'Explore specialties'}</h2></div></div><div className={styles.trackList}>{children.map(track=><Link key={track.slug} href={trackPath(track,locale)} className={styles.trackCard}><div><span className={styles.eyebrow}>LNG</span><h2>{track.title[locale]}</h2><p>{track.intro[locale]}</p><span className={styles.trackCount}>{conceptCount(projects.filter(p=>p.sector===track.sector&&p.track===track.slug).length,locale)}</span></div><ArrowUpRight size={32}/></Link>)}</div><Notice locale={locale}/></section>:<section className={styles.section}><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{ar?'نطاق الاهتمام':'AREAS OF INTEREST'}</p><h2>{ar?'آفاق هذا المجال':'Within this field'}</h2></div></div><div className={styles.focusGrid}>{sector.focus.map((focus,i)=><div key={focus.en}><span>0{i+1}</span><h3>{focus[locale]}</h3></div>)}</div><div className={styles.emptyState}><h3>{ar?'مساحة للمشاريع القادمة.':'Space for future projects.'}</h3><p>{ar?'لم تُدرج تصوّرات مشاريع في هذا المجال بعد. تُضاف هنا عند اعتمادها.':'No project concepts have been listed in this sector yet. They will appear here once approved.'}</p></div></section>}
    <Contact locale={locale}/>
  </Frame>;
}
export function TrackPage({track,locale}:{track:Track;locale:Locale}) {
  const ar=locale==='ar';const sector=sectorBySlug(track.sector)!;const items=projects.filter(p=>p.sector===track.sector&&p.track===track.slug);
  return <Frame locale={locale} path={trackPath(track,'en')}>
    <section className={styles.sectorHero}><Breadcrumb locale={locale} sector={sector}/><p className={styles.eyebrow}>{ar?'الطاقة والمناخ / LNG':'ENERGY & CLIMATE / LNG'}</p><h1>{track.title[locale]}</h1><p>{track.intro[locale]}</p></section>
    <section className={styles.section}><div className={styles.sectionHeading}><h2>{ar?'ملفات المشاريع':'Project files'}</h2><span className={styles.count}>{String(items.length).padStart(2,'0')}</span></div><ConceptCollection items={items} locale={locale}/></section>
    <Contact locale={locale}/>
  </Frame>;
}
export function ProjectDetail({project,locale}:{project:Project;locale:Locale}) {
  const ar=locale==='ar';const sector=sectorBySlug(project.sector)!;
  const track=tracks.find(t=>t.sector===project.sector&&t.slug===project.track)!;
  const related=projects.filter(p=>p.id!==project.id&&p.sector===project.sector&&p.track===project.track);
  const file=projectFileById(project.id);
  const date=(value:string)=>new Intl.DateTimeFormat(ar?'ar':'en',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(`${value}T12:00:00Z`));
  const tabs=ar?[['overview','المشروع'],['scope','مسارات العمل'],['engagement','التعاون والتكليف'],['progress','تطور المشروع']]:[['overview','Project'],['scope','Workstreams'],['engagement','Work with us'],['progress','Project updates']];
  return <Frame locale={locale} path={projectPath(project.slug,'en')}>
    <section className={`${styles.detailHero} ${styles.dossierHero}`}>
      <Breadcrumb locale={locale} sector={sector} track={track} code={project.id}/>
      <div className={styles.detailHeroGrid}><div>
        <div className={styles.projectIdentity}><span dir="ltr">{project.id}</span><span>{projectStatus[project.status][locale]}</span></div>
        <h1>{project.title[locale]}</h1><p className={styles.detailSummary}>{project.summary[locale]}</p>
        <div className={styles.heroActions}><Link className="vs-button" href={projectInquiry(project,locale)}>{ar?'ناقش تكليف المشروع':'Discuss a project mandate'}<ArrowUpRight size={18}/></Link><a className={styles.secondaryAction} href="#progress">{ar?'تابع تطور المشروع':'Follow project progress'}<ArrowRight size={17}/></a></div>
      </div><EnergyVisual kind={project.kind} locale={locale}/></div>
      {file&&<div className={styles.projectSnapshot}><div><span>{ar?'لمن هذا المشروع؟':'WHO IS IT FOR?'}</span><p>{project.beneficiary[locale]}</p></div><div><span>{ar?'المرحلة الحالية':'CURRENT STAGE'}</span><p>{file.stage[locale]}</p></div><div><span>{ar?'آخر تحديث للملف':'PROFILE UPDATED'}</span><p><time dateTime={file.updatedAt}>{date(file.updatedAt)}</time><small dir="ltr">v{file.version}</small></p></div></div>}
    </section>
    <nav className={styles.projectTabs} aria-label={ar?'داخل المشروع':'Within this project'}>{tabs.map(([id,title])=><a key={id} href={`#${id}`}>{title}</a>)}</nav>
    <section id="overview" className={`${styles.section} ${styles.overviewSection}`}>
      <div><p className={styles.eyebrow}>{ar?'النتيجة التي نبني من أجلها':'THE OUTCOME WE ARE WORKING TOWARD'}</p><h2>{project.ambition[locale]}</h2><p>{file?.challenge[locale]||project.idea[locale]}</p></div>
      <aside className={styles.roleCard}><p className={styles.eyebrow}>{ar?'دور VisionSeek':'VISIONSEEK’S ROLE'}</p><p>{file?.role[locale]||project.idea[locale]}</p></aside>
    </section>
    {file&&<>
      <section id="scope" className={`${styles.section} ${styles.workSection}`}>
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{ar?'نطاق المشروع':'PROJECT SCOPE'}</p><h2>{ar?'ما الذي نطوّره في هذا المشروع؟':'What are we developing?'}</h2></div><span className={styles.scopeLabel}>{ar?'مسارات العمل المطروحة':'Proposed workstreams'}</span></div>
        <div className={styles.workstreamGrid}>{file.workstreams.map((work,i)=><article key={work.id}><span dir="ltr">0{i+1}</span><h3>{work.title[locale]}</h3><p>{work.body[locale]}</p></article>)}</div>
      </section>
      <section id="engagement" className={`${styles.section} ${styles.engagementSection}`}>
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{ar?'للحكومات والمؤسسات والشركات':'FOR GOVERNMENTS, INSTITUTIONS & COMPANIES'}</p><h2>{ar?'كيف يمكن أن نعمل مع مؤسستك؟':'How can we work with your institution?'}</h2></div></div>
        <p className={styles.engagementIntro}>{file.engagement[locale]}</p>
        <h3 className={styles.deliverableHeading}>{ar?'مخرجات يمكن أن يشملها التكليف الأول':'Potential outputs of an initial mandate'}</h3>
        <div className={styles.deliverables}>{file.deliverables.map((item,i)=><article key={item.title.en}><span>0{i+1}</span><div><h3>{item.title[locale]}</h3><p>{item.body[locale]}</p></div></article>)}</div>
        <div className={styles.engagementActions}><div><h3>{ar?'لديك احتياج يرتبط بهذا المشروع؟':'Does this project connect to your needs?'}</h3><p>{ar?'نبدأ بمناقشة احتياج مؤسستك، ثم نحدد نطاق التكليف ومخرجاته ومسؤولياته ووقته وتكلفته قبل الاتفاق.':'We begin with your institution’s needs, then define scope, outputs, responsibilities, timing and cost before agreement.'}</p></div><Link className="vs-button" href={projectInquiry(project,locale)}>{ar?'اطلب مناقشة نطاق التعاقد':'Discuss commissioning this work'}<ArrowUpRight size={19}/></Link></div>
        <div className={styles.partnerPanel}><div><p className={styles.eyebrow}>{ar?'مسار الشركاء':'PARTNER PATH'}</p><h3>{ar?'لديك قدرة يحتاجها المشروع؟':'Can you contribute a capability?'}</h3><ul>{file.partnerNeeds.map(item=><li key={item.en}>{item[locale]}</li>)}</ul></div><Link className={styles.secondaryAction} href={projectInquiry(project,locale,'partner')}>{ar?'ناقش الانضمام كشريك':'Discuss a project partnership'}<ArrowUpRight size={18}/></Link></div>
      </section>
      <section id="progress" className={`${styles.section} ${styles.progressSection}`}>
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{ar?'تطور المشروع':'PROJECT DEVELOPMENT'}</p><h2>{ar?'أين وصلنا؟ وما الذي يأتي بعد ذلك؟':'Where are we now? What comes next?'}</h2></div></div>
        <div className={styles.currentStage}><span>{ar?'المرحلة الحالية':'CURRENT STAGE'}</span><h3>{file.stage[locale]}</h3><p>{file.stageNote[locale]}</p></div>
        <ol className={styles.milestones}>{file.milestones.map(step=><li key={step.id} data-state={step.state}><span className={styles.milestoneState}>{step.state==='current'?(ar?'الحالية':'Current'):step.state==='completed'?(ar?'مكتملة':'Complete'):(ar?'لاحقًا':'Planned')}</span><h3>{step.title[locale]}</h3><p>{step.description[locale]}</p>{step.evidenceUrl&&<a href={step.evidenceUrl}>{ar?'اطّلع على الدليل':'View evidence'}</a>}</li>)}</ol>
        <div className={styles.updatesHeading}><h3>{ar?'سجل التحديثات':'Project updates'}</h3><span>{ar?'التحديثات المنشورة والأدلة المتاحة':'Published updates and available evidence'}</span></div>
        <div className={styles.updateList}>{publicProjectUpdates(file).map(update=><article key={update.id} id={update.id}><div><time dateTime={update.date}>{date(update.date)}</time><span>{update.kind==='scope'?(ar?'تحديث نطاق المشروع':'Scope update'):update.kind==='test'?(ar?'اختبار':'Test'):update.kind==='research'?(ar?'بحث':'Research'):update.kind==='partnership'?(ar?'شراكة':'Partnership'):(ar?'تنفيذ':'Delivery')}</span></div><h3>{update.title[locale]}</h3><p>{update.body[locale]}</p>{update.evidenceUrl&&<a href={update.evidenceUrl}>{ar?'اطّلع على المخرج المرتبط':'View the related output'}<ArrowUpRight size={17}/></a>}</article>)}</div>
        <p className={styles.progressNote}>{ar?'تُضاف نتائج الدراسات والشراكات والاختبارات والتنفيذ هنا عند توفر مخرجات قابلة للنشر. التحديث الحالي يخص تعريف المشروع ونطاقه.':'Studies, partnerships, tests and delivery results will be recorded here when publishable outputs are available. The current update concerns the project definition and scope.'}</p>
        <Notice locale={locale}/>
      </section>
    </>}
    {related.length>0&&<section className={`${styles.section} ${styles.related}`}><div className={styles.sectionHeading}><h2>{ar?'مشروع مرتبط':'Related project'}</h2><Link className={styles.textLink} href={trackPath(track,locale)}>{ar?'كل مشاريع الغاز المسال':'All LNG projects'}<ArrowUpRight size={19}/></Link></div>{related.map(p=><Link className={styles.relatedLink} href={projectPath(p.slug,locale)} key={p.id}><span dir="ltr">{p.id}</span><h3>{p.title[locale]}</h3><ArrowUpRight size={26}/></Link>)}</section>}
  </Frame>;
}
