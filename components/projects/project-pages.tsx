import type {ReactNode} from 'react';
import Link from 'next/link';
import {ArrowUpRight, ArrowRight, Zap, Cpu, Plane, ShieldCheck, Bot, HeartPulse, Wheat, Building2} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {sectors, tracks, projects, featuredProjects, projectStatus, conceptNotice, conceptCount, prefix, sectorBySlug, sectorPath, trackPath, projectPath, projectInquiry, type Sector, type Track, type Project, type Locale} from '@/lib/projects';
import styles from './projects.module.css';
import {ProjectRail} from './project-rail';

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
      <Link className={styles.openLink} href={projectPath(project.slug,locale)}>{locale==='ar'?'استكشف التصور':'Explore the concept'}<ArrowUpRight size={20}/></Link>
    </div>
  </article>;
}
function ConceptCollection({items,locale}:{items:Project[];locale:Locale}) {
  return <><div className={styles.projectList}>{items.map(project=><ProjectCard key={project.id} project={project} locale={locale}/>)}</div><Notice locale={locale}/></>;
}
function SectorGrid({locale}:{locale:Locale}) {
  const ar=locale==='ar';
  return <div className={styles.sectorGrid}>{sectors.map((sector,i)=>{
    const Icon=icons[sector.icon];const count=projects.filter(p=>p.sector===sector.slug).length;
    return <article className={styles.sectorCard} key={sector.slug}>
      {sector.anchors.map(anchor=><span className={styles.anchor} id={anchor} key={anchor}/>)}
      <Link href={sectorPath(sector.slug,locale)}>
        <div className={styles.sectorTop}><Icon size={32} strokeWidth={1.3}/><span dir="ltr">0{i+1}</span></div>
        <h3>{sector.title[locale]}</h3><p>{sector.intro[locale]}</p>
        <div className={styles.sectorBottom}><span>{count?conceptCount(count,locale):(ar?'مجال استكشاف':'Exploration area')}</span><ArrowUpRight size={19}/></div>
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
    <section id="fields" className={styles.section}><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{ar?'المشاريع حسب المجال':'PROJECTS BY SECTOR'}</p><h2>{ar?'أين نصنع الفارق؟':'Where can we make a difference?'}</h2></div><span className={styles.count}>{String(sectors.length).padStart(2,'0')}</span></div><SectorGrid locale={locale}/></section>
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
    <section className={styles.section}><div className={styles.sectionHeading}><h2>{ar?'التصوّرات المقترحة':'Proposed concepts'}</h2><span className={styles.count}>{String(items.length).padStart(2,'0')}</span></div><ConceptCollection items={items} locale={locale}/></section>
    <Contact locale={locale}/>
  </Frame>;
}
export function ProjectDetail({project,locale}:{project:Project;locale:Locale}) {
  const ar=locale==='ar';const sector=sectorBySlug(project.sector)!;const track=tracks.find(t=>t.sector===project.sector&&t.slug===project.track)!;const related=projects.filter(p=>p.id!==project.id&&p.sector===project.sector&&p.track===project.track);
  return <Frame locale={locale} path={projectPath(project.slug,'en')}>
    <section className={styles.detailHero}><Breadcrumb locale={locale} sector={sector} track={track} code={project.id}/><div className={styles.detailHeroGrid}><div><p className={styles.eyebrow} dir="ltr">{project.id}</p><h1>{project.title[locale]}</h1><p className={styles.detailSummary}>{project.summary[locale]}</p><span className={styles.stage}>{projectStatus[project.status][locale]}</span></div><EnergyVisual kind={project.kind} locale={locale}/></div><Notice locale={locale}/></section>
    <div className={styles.detailLayout}><aside className={styles.projectFacts}><p className={styles.eyebrow}>{ar?'بطاقة التصور':'CONCEPT PROFILE'}</p><dl><div><dt>{ar?'المجال':'SECTOR'}</dt><dd><Link href={sectorPath(sector.slug,locale)}>{sector.title[locale]}</Link></dd></div><div><dt>{ar?'التخصص':'SPECIALTY'}</dt><dd><Link href={trackPath(track,locale)}>{track.title[locale]}</Link></dd></div><div><dt>{ar?'لمن؟':'FOR WHOM?'}</dt><dd>{project.beneficiary[locale]}</dd></div></dl><Link className="vs-button" href={projectInquiry(project,locale)}>{ar?'ناقش التصور':'Discuss the concept'}<ArrowRight size={18}/></Link></aside><div className={styles.detailBody}><p className={styles.eyebrow}>{ar?'القدرة المستهدفة':'THE INTENDED CAPABILITY'}</p><h2>{project.ambition[locale]}</h2><p>{project.idea[locale]}</p><div className={styles.outcomes}>{project.outcomes.map(outcome=><article key={outcome.title.en}><h3>{outcome.title[locale]}</h3><p>{outcome.text[locale]}</p></article>)}</div></div></div>
    {related.length>0&&<section className={`${styles.section} ${styles.related}`}><div className={styles.sectionHeading}><h2>{ar?'في التخصص نفسه':'In the same specialty'}</h2><Link className={styles.textLink} href={trackPath(track,locale)}>{ar?'كل تصوّرات الغاز المسال':'All LNG concepts'}<ArrowUpRight size={19}/></Link></div>{related.map(p=><Link className={styles.relatedLink} href={projectPath(p.slug,locale)} key={p.id}><span dir="ltr">{p.id}</span><h3>{p.title[locale]}</h3><ArrowUpRight size={26}/></Link>)}</section>}
  </Frame>;
}
