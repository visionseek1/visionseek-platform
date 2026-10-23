import type {CSSProperties, ReactNode} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {ArrowUpRight, ArrowRight, Zap, Cpu, Plane, ShieldCheck, Bot, HeartPulse, Wheat, Building2, BrainCircuit} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {sectors, tracks, projects, prefix, sectorBySlug, sectorPath, trackPath, projectPath, projectInquiry, projectFileById, trackLabel, audienceLabels, boxMailto, type Sector, type SectorIcon, type Track, type Project, type ProjectAudience, type Locale} from '@/lib/projects';
import {focusFields, medical} from '@/lib/medical';
import {isBlockHidden} from '@/lib/visibility';
import styles from './projects.module.css';
import {ProjectFilter, type ProjectCardData} from './project-filter';

const icons = {energy:Zap,chips:Cpu,flight:Plane,defense:ShieldCheck,robotics:Bot,health:HeartPulse,agriculture:Wheat,cities:Building2,ai:BrainCircuit};
/** One colour per sector, so every field reads at a glance. */
export const sectorColors:Record<SectorIcon,string> = {energy:'#FFB347',chips:'#2FD3C7',flight:'#7AA7FF',defense:'#A3B1C6',robotics:'#FF7A59',health:'#FF6B8B',agriculture:'#9BD66B',cities:'#C9A6FF',ai:'#5B8CFF'};
const allAudiences:ProjectAudience[] = ['government','institution','company','individual'];
const projectCount = (count:number,locale:Locale) => locale==='ar'?(count===1?'مشروع واحد':count===2?'مشروعان':`${new Intl.NumberFormat('ar').format(count)} مشاريع`):`${count} project${count===1?'':'s'}`;
const colorOf = (sectorSlug:string) => sectorColors[sectorBySlug(sectorSlug)?.icon ?? 'ai'];
const tone = (color:string) => ({'--tone':color} as CSSProperties);
const trackOf = (project:Project) => tracks.find(t=>t.sector===project.sector&&t.slug===project.track);

function Frame({locale,path,children}:{locale:Locale;path:string;children:ReactNode}) {
  return <div className={`vs-site locale-${locale} ${styles.page}`} dir={locale==='ar'?'rtl':'ltr'} lang={locale}>
    <CapabilityHeader locale={locale} path={path}/><main id="main-content">{children}</main><CapabilityFooter locale={locale}/>
  </div>;
}
function Breadcrumb({locale,sector,track,code}:{locale:Locale;sector?:Sector;track?:Track;code?:string}) {
  const ar=locale==='ar';
  return <nav className={styles.breadcrumb} aria-label={ar?'مسار الصفحة':'Breadcrumb'}>
    <Link href={`${prefix(locale)}/projects`}>{ar?'المشاريع':'Projects'}</Link>
    {sector&&<><span aria-hidden="true">/</span><Link href={sectorPath(sector.slug,locale)}>{sector.title[locale]}</Link></>}
    {track&&<><span aria-hidden="true">/</span><Link href={trackPath(track,locale)}>{track.title[locale]}</Link></>}
    {code&&<><span aria-hidden="true">/</span><span dir="ltr">{code}</span></>}
  </nav>;
}
function Eyebrow({children}:{children:ReactNode}) {return <p className={styles.eyebrow}>{children}</p>;}

/** What a project card needs; plain data so the client-side filter can render it. */
function cardData(project:Project,locale:Locale):ProjectCardData {
  const track=trackOf(project);
  return {
    id:project.id, href:projectPath(project.slug,locale), title:project.title[locale], summary:project.summary[locale],
    sector:sectorBySlug(project.sector)?.title[locale] ?? '', track:track?trackLabel(track):'', color:colorOf(project.sector),
    mark:project.title.en.trim().charAt(0).toUpperCase(), logo:project.logo,
    audiences:project.profile?.audiences ?? [], audienceText:(project.profile?.audiences ?? []).map(a=>audienceLabels[a][locale]),
  };
}
function SectorGrid({locale}:{locale:Locale}) {
  const ar=locale==='ar';
  return <div className={styles.sectorGrid}>{sectors.map((sector,i)=>{
    const Icon=icons[sector.icon];const count=projects.filter(p=>p.sector===sector.slug).length;
    return <article className={styles.sectorCard} key={sector.slug} style={tone(sectorColors[sector.icon])}>
      {sector.anchors.map(anchor=><span className={styles.anchor} id={anchor} key={anchor}/>)}
      <Link href={sectorPath(sector.slug,locale)}>
        <div className={styles.sectorTop}><span className={styles.sectorBar} aria-hidden="true"/><Icon size={22} strokeWidth={1.5} aria-hidden="true"/><span dir="ltr" className={styles.mono}>{String(i+1).padStart(2,'0')}</span></div>
        <h3>{sector.title[locale]}</h3>
        <span className={count?styles.sectorCountLive:styles.sectorCount}>{count?projectCount(count,locale):(ar?'مجال عمل':'Field of work')}</span>
      </Link>
    </article>;
  })}</div>;
}
function Contact({locale}:{locale:Locale}) {
  const ar=locale==='ar';
  return <section className={styles.contact}><div className={styles.wrap}>
    <h2>{ar?'ما الذي تريد تغييره في مؤسستك؟':'What do you want to change in your institution?'}</h2>
    <Link className={styles.primary} href={`${prefix(locale)}/start`}>{ar?'ابنِ حلولك معنا':'Build your solutions with us'}<ArrowRight size={18} aria-hidden="true"/></Link>
  </div></section>;
}
function GridHero({children,glow}:{children:ReactNode;glow?:string}) {
  return <section className={styles.hero} style={glow?tone(glow):undefined}><div className={styles.heroGrid} aria-hidden="true"/><div className={styles.wrap}>{children}</div></section>;
}

function LegacyProjectsIndex({locale}:{locale:Locale}) {
  const ar=locale==='ar';
  return <Frame locale={locale} path="/projects">
    <GridHero>
      <p className={styles.live}><span aria-hidden="true"/>VISIONSEEK / PROJECTS</p>
      <h1>{ar?<>مشاريع تفتح <em>خيارات جديدة.</em></>:<>Projects that open <em>new possibilities.</em></>}</h1>
      <p className={styles.lede}>{ar?'أدوات وحلول نبنيها من قراءة ما تحتاجه المؤسسات الآن.':'Tools and solutions we build from what institutions need right now.'}</p>
      <dl className={styles.stats}>
        <div><dt>{ar?'مشاريع':'Projects'}</dt><dd dir="ltr">{String(projects.length).padStart(2,'0')}</dd></div>
        <div><dt>{ar?'مجالات عمل':'Sectors'}</dt><dd dir="ltr">{String(sectors.length).padStart(2,'0')}</dd></div>
        <div><dt>{ar?'لمن نصمّم':'Designed for'}</dt><dd className={styles.liveText}>{ar?'حكومات · مؤسسات · شركات':'Gov · Institutions · Companies'}</dd></div>
      </dl>
    </GridHero>
    <section className={styles.section} id="project-files"><div className={styles.wrap}>
      <ProjectFilter locale={locale} cards={projects.map(p=>cardData(p,locale))} audiences={allAudiences.map(a=>({id:a,label:audienceLabels[a][locale]}))}/>
      
    </div></section>
    <section id="fields" className={styles.section}><div className={styles.wrap}>
      <div className={styles.heading}><h2>{ar?'المجالات':'Sectors'}</h2><span className={styles.count} dir="ltr">{String(sectors.length).padStart(2,'0')}</span></div>
      <SectorGrid locale={locale}/>
    </div></section>
    <Contact locale={locale}/>
  </Frame>;
}

/**
 * A public project is listed under a medical sector only when its own text is that sector.
 * Proviso AI is legal governance for AI agents. VisionSeek Box is an on-prem device for any institution.
 * Neither is a hospital, a plant, a pharmacy, a health regulator, or a university, so the map stays empty
 * and both remain under «مشاريع أخرى». Archived LNG files are not in `projects`.
 */
const sectorOfProject = new Map<string, string>();
const projectsInSector = (slug:string) => projects.filter(project => sectorOfProject.get(project.slug) === slug);
const otherProjects = () => projects.filter(project => !sectorOfProject.has(project.slug));

function exampleLine(locale:Locale) {
  const titles = focusFields().map(field => field.title[locale]);
  if (locale === 'ar') {
    const list = titles.length > 1 ? `${titles.slice(0, -1).join('، ')}، و${titles[titles.length - 1]}` : titles.join('');
    return `أمثلة بنبدأ بيها، مش سقف: ${list}.`;
  }
  const list = titles.length > 1 ? `${titles.slice(0, -1).join(', ')}, and ${titles[titles.length - 1]}` : titles.join('');
  return `Examples we start with, not a limit: ${list}.`;
}

function MedicalProjectsIndex({locale}:{locale:Locale}) {
  const ar = locale === 'ar';
  const p = prefix(locale);
  const others = otherProjects();
  const underCount = medical.sectors.reduce((sum, sector) => sum + projectsInSector(sector.slug).length, 0);
  return <Frame locale={locale} path="/projects">
    <GridHero>
      <p className={styles.live}><span aria-hidden="true"/>VISIONSEEK / PROJECTS</p>
      <h1>{ar ? <>خمس جهات في <em>القطاع الصحي.</em></> : <>Five parts of <em>healthcare.</em></>}</h1>
      <p className={styles.lede}>{ar ? 'كل جهة بسطر مشكلتها، وأمثلة بنبدأ بيها، والمشاريع المنشورة تحتها.' : 'Each part has its problem, the examples we start with, and the projects published under it.'}</p>
      <dl className={styles.stats}>
        <div><dt>{ar ? 'جهات' : 'Parts'}</dt><dd dir="ltr">{String(medical.sectors.length).padStart(2, '0')}</dd></div>
        <div><dt>{ar ? 'تحت الجهات' : 'Under them'}</dt><dd dir="ltr">{String(underCount).padStart(2, '0')}</dd></div>
        <div><dt>{ar ? 'مشاريع أخرى' : 'Other projects'}</dt><dd dir="ltr">{String(others.length).padStart(2, '0')}</dd></div>
      </dl>
    </GridHero>
    <div id="fields">
      {medical.sectors.map((sector, index) => {
        const listed = projectsInSector(sector.slug);
        return <section className={styles.section} id={sector.slug} key={sector.slug} style={{scrollMarginTop: 88}}>
          <div className={styles.wrap}>
            <div className={styles.heading}>
              <h2>{sector.title[locale]}</h2>
              <span className={styles.count} dir="ltr">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <p className={styles.lede}>{sector.problem[locale]}</p>
            <p className={styles.notice}>{exampleLine(locale)}</p>
            {listed.length
              ? <div className={styles.cardsBelow}><ProjectFilter locale={locale} cards={listed.map(project => cardData(project, locale))} audiences={[]}/></div>
              : <div className={styles.emptyState}><p>{ar ? 'لسه مفيش مشروع منشور هنا.' : 'No published project here yet.'}</p></div>}
          </div>
        </section>;
      })}
    </div>
    <section className={`${styles.section} ${styles.band}`} id="other-projects">
      <div className={styles.wrap}>
        <div className={styles.heading}>
          <h2>{ar ? 'مشاريع أخرى' : 'Other projects'}</h2>
          <span className={styles.count} dir="ltr">{String(others.length).padStart(2, '0')}</span>
        </div>
        <p className={styles.lede}>{ar ? 'مشاريع منشورة قبل المسار الطبي. صفحاتها زي ما هي، ومن غير إعادة كتابة.' : 'Projects published before the medical path. Their pages stay as they are.'}</p>
        <div className={styles.cardsBelow}><ProjectFilter locale={locale} cards={others.map(project => cardData(project, locale))} audiences={[]}/></div>
      </div>
    </section>
    <section className={styles.section} aria-labelledby="journey-title">
      <div className={styles.wrap}>
        <p className={styles.eyebrow}>{medical.work.eyebrow[locale]}</p>
        <h2 className={styles.h2} id="journey-title">{medical.work.title[locale]}</h2>
        <p className={styles.lede}>{medical.work.intro[locale]}</p>
        <div className={styles.workGrid}>
          {medical.work.steps.map((step, index) => <article key={step.id}>
            <Link href={`${p}${step.href}`} style={{display: 'block', color: 'inherit'}}>
              <span className={styles.mono} dir="ltr">{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title[locale]}</h3>
              <p>{step.text[locale]}</p>
            </Link>
          </article>)}
        </div>
      </div>
    </section>
    <section className={styles.contact}>
      <div className={styles.wrap}>
        <div>
          <h2>{medical.session.title[locale]}</h2>
          <p className={styles.lede}>{medical.session.text[locale]}</p>
        </div>
        <Link className={styles.primary} href={`${p}/start`}>{medical.session.button[locale]}<ArrowRight size={18} aria-hidden="true"/></Link>
      </div>
    </section>
  </Frame>;
}

export function ProjectsIndex({locale}:{locale:Locale}) {
  if (!isBlockHidden('projects.legacy')) return <LegacyProjectsIndex locale={locale}/>;
  return <MedicalProjectsIndex locale={locale}/>;
}

export function SectorPage({sector,locale}:{sector:Sector;locale:Locale}) {
  const ar=locale==='ar';const children=tracks.filter(track=>track.sector===sector.slug);const Icon=icons[sector.icon];
  const items=projects.filter(p=>p.sector===sector.slug);const color=sectorColors[sector.icon];
  return <Frame locale={locale} path={sectorPath(sector.slug,'en')}>
    <GridHero glow={color}>
      <Breadcrumb locale={locale}/>
      <div className={styles.sectorHero}><div><p className={styles.live} style={tone(color)}><span aria-hidden="true"/>{ar?'مجال المشاريع':'PROJECT SECTOR'}</p><h1>{sector.title[locale]}</h1><p className={styles.lede}>{sector.intro[locale]}</p></div><Icon className={styles.emblem} size={96} strokeWidth={1} aria-hidden="true" style={{color}}/></div>
    </GridHero>
    {children.length?<section className={styles.section}><div className={styles.wrap}>
      <div className={styles.heading}><h2>{ar?'التخصصات داخل المجال':'Specialties in this sector'}</h2></div>
      <div className={styles.trackList}>{children.map(track=><Link key={track.slug} href={trackPath(track,locale)} className={styles.trackCard} style={tone(color)}><div><span className={styles.mono}>{trackLabel(track)}</span><h3>{track.title[locale]}</h3><p>{track.intro[locale]}</p><span className={styles.sectorCountLive}>{projectCount(projects.filter(p=>p.sector===track.sector&&p.track===track.slug).length,locale)}</span></div><ArrowUpRight size={26} aria-hidden="true"/></Link>)}</div>
      {items.length>0&&<div className={styles.cardsBelow}><ProjectFilter locale={locale} cards={items.map(p=>cardData(p,locale))} audiences={[]}/></div>}
      
    </div></section>:<section className={styles.section}><div className={styles.wrap}>
      <div className={styles.heading}><h2>{ar?'آفاق هذا المجال':'Within this field'}</h2></div>
      <div className={styles.focusGrid}>{sector.focus.map((focus,i)=><div key={focus.en} style={tone(color)}><span dir="ltr" className={styles.mono}>0{i+1}</span><h3>{focus[locale]}</h3></div>)}</div>
      <div className={styles.emptyState}><h3>{ar?'مساحة للمشاريع القادمة.':'Space for future projects.'}</h3><p>{ar?'لا توجد مشاريع معروضة في هذا المجال بعد.':'No projects are shown in this sector yet.'}</p></div>
    </div></section>}
    <Contact locale={locale}/>
  </Frame>;
}

export function TrackPage({track,locale}:{track:Track;locale:Locale}) {
  const sector=sectorBySlug(track.sector)!;const items=projects.filter(p=>p.sector===track.sector&&p.track===track.slug);const color=sectorColors[sector.icon];
  return <Frame locale={locale} path={trackPath(track,'en')}>
    <GridHero glow={color}>
      <Breadcrumb locale={locale} sector={sector}/>
      <p className={styles.live} style={tone(color)}><span aria-hidden="true"/>{sector.title[locale]} / {trackLabel(track)}</p>
      <h1>{track.title[locale]}</h1><p className={styles.lede}>{track.intro[locale]}</p>
    </GridHero>
    <section className={styles.section}><div className={styles.wrap}>
      <ProjectFilter locale={locale} cards={items.map(p=>cardData(p,locale))} audiences={[]}/>
      
    </div></section>
    <Contact locale={locale}/>
  </Frame>;
}

function ProfileCard({project,locale}:{project:Project;locale:Locale}) {
  const ar=locale==='ar';const profile=project.profile;if(!profile)return null;
  return <aside className={styles.profile} aria-label={ar?'بطاقة المشروع':'Project card'}>
    <div className={styles.profileHead}><span className={styles.mono}>PROJECT CARD</span><span>{ar?'بطاقة المشروع':'Project card'}</span></div>
    <div><p className={styles.profileLabel}>{ar?'مصمَّم لـ':'Designed for'}</p>
      <ul className={styles.audiences}>{allAudiences.map(a=><li key={a} className={profile.audiences.includes(a)?styles.audienceOn:styles.audienceOff}>{audienceLabels[a][locale]}{!profile.audiences.includes(a)&&<span className={styles.srOnly}>{ar?' (غير مستهدف)':' (not targeted)'}</span>}</li>)}</ul>
    </div>
    <div className={styles.facts}>{profile.facts.map(fact=><article key={fact.url+fact.title.en} className={fact.kind==='exhibition'?styles.factExhibition:styles.factTrend}>
      <div className={styles.factTop}><span>{fact.kind==='exhibition'?(ar?'معرض دولي':'International exhibition'):(ar?'الاتجاه العالمي':'Global trend')}</span>{fact.value&&<span dir="ltr" className={styles.mono}>{fact.value}</span>}</div>
      <h3>{fact.title[locale]}</h3><p>{fact.detail[locale]}</p>
      <a href={fact.url} target="_blank" rel="noopener noreferrer">{ar?'المصدر':'Source'}<ArrowUpRight size={14} aria-hidden="true"/></a>
    </article>)}</div>
  </aside>;
}

export function ProjectDetail({project,locale}:{project:Project;locale:Locale}) {
  const ar=locale==='ar';const sector=sectorBySlug(project.sector)!;const track=trackOf(project)!;
  const related=projects.filter(p=>p.id!==project.id&&p.sector===project.sector&&p.track===project.track);
  const file=projectFileById(project.id);const color=sectorColors[sector.icon];
  const pitch=project.pitch;const box=project.box;
  const tabs:[string,string][]=box?[['why',box.whyTitle[locale]],['inside',box.insideTitle[locale]],['cohort',box.cohortTitle[locale]]]:[
    ...(pitch?[['risks',ar?'الخطر':'The risk'],['gains',ar?'الفائدة':'What you gain']] as [string,string][]:[]),
    ...(project.whyNow?[['why-now',ar?'لماذا الآن':'Why now'] as [string,string]]:[]),
    ...(pitch?[]:[['overview',ar?'المشروع':'Project'] as [string,string]]),
    ...(file?[['scope',ar?'مسارات العمل':'Workstreams'],['engagement',ar?'التعاون والتكليف':'Work with us']] as [string,string][]:[]),
  ];
  return <Frame locale={locale} path={projectPath(project.slug,'en')}>
    <section className={styles.hero} style={tone(color)}><div className={styles.heroGrid} aria-hidden="true"/><div className={styles.heroGlow} aria-hidden="true"/><div className={styles.wrap}>
      <Breadcrumb locale={locale} sector={sector} track={track} code={project.id}/>
      <div className={styles.detailGrid}>
        <div className={styles.detailMain}>
          <div className={styles.identity}><span dir="ltr" className={styles.code}>{project.id}</span><span className={styles.mono} style={{color}}>{trackLabel(track)}</span></div>
          {project.pitch?<>
            <p className={styles.projectName}>{project.logo&&<Image src={project.logo} alt="" width={44} height={44} unoptimized className={styles.projectLogo}/>}<span dir="ltr">{project.title[locale]}</span></p>
            <h1 className={styles.hook}>{project.pitch.hook[locale]}</h1>
            <p className={styles.lede}>{project.pitch.promise[locale]}</p>
          </>:<>
            <h1>{project.logo&&<Image src={project.logo} alt="" width={64} height={64} unoptimized className={styles.projectLogo}/>}{project.title[locale]}</h1>
            <p className={styles.ambition}>{project.ambition[locale]}</p>
            <p className={styles.lede}>{project.summary[locale]}</p>
          </>}
          <div className={styles.actions}>{box?<a className={styles.primary} href={boxMailto(box,locale)}>{box.cta[locale]}<ArrowUpRight size={18} aria-hidden="true"/></a>:<Link className={styles.primary} href={projectInquiry(project,locale)}>{ar?'ناقش تكليف المشروع':'Discuss a project mandate'}<ArrowUpRight size={18} aria-hidden="true"/></Link>}</div>
        </div>
        <ProfileCard project={project} locale={locale}/>
      </div>
    </div></section>
    <nav className={styles.tabs} aria-label={ar?'داخل المشروع':'Within this project'}><div className={styles.wrap}>{tabs.map(([id,title])=><a key={id} href={`#${id}`}>{title}</a>)}</div></nav>
    {pitch&&<>
      <section id="risks" className={styles.section}><div className={styles.wrap}>
        <Eyebrow>{ar?'الخطر':'THE RISK'}</Eyebrow><h2 className={styles.h2}>{pitch.risksTitle[locale]}</h2>
        <div className={styles.fears}>{pitch.fears.map((fear,i)=><article key={fear.title.en}>
          <div className={styles.fearTop}><span dir="ltr" className={styles.mono}>{String(i+1).padStart(2,'0')}</span>{fear.figure&&<strong>{fear.figure[locale]}</strong>}</div>
          <h3>{fear.title[locale]}</h3><p>{fear.body[locale]}</p>
          {fear.sources&&<ul className={styles.fearSources}>{fear.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" dir="ltr">{source.title}<ArrowUpRight size={13} aria-hidden="true"/></a></li>)}</ul>}
        </article>)}</div>
      </div></section>
      {pitch.scenario&&<section id="example" className={`${styles.section} ${styles.band}`}><div className={styles.wrap}>
        <Eyebrow>{ar?'مثال':'AN EXAMPLE'}</Eyebrow><h2 className={styles.h2}>{ar?'لحظة واحدة تكفي':'One moment is enough'}</h2>
        <p className={styles.prose}>{pitch.scenario.setup[locale]}</p>
        <div className={styles.scenario}>
          <div className={styles.without}><span>{ar?'من دونه':'Without it'}</span><p>{pitch.scenario.without[locale]}</p></div>
          <div className={styles.withIt}><span>{ar?'معه':'With it'}</span><p>{pitch.scenario.with[locale]}</p></div>
        </div>
      </div></section>}
      <section id="gains" className={styles.section}><div className={styles.wrap}>
        <Eyebrow>{ar?'الفائدة':'WHAT YOU GAIN'}</Eyebrow><h2 className={styles.h2}>{ar?'ماذا يكسب كل طرف؟':'What does each side gain?'}</h2>
        <div className={styles.workGrid}>{pitch.gains.map(gain=><article key={gain.audience}><span className={styles.mono}>{audienceLabels[gain.audience][locale]}</span><p className={styles.gainText}>{gain.text[locale]}</p></article>)}</div>
      </div></section>
    </>}
    {project.whyNow&&<section id="why-now" className={styles.section}><div className={styles.wrap}>
      <Eyebrow>{ar?'لماذا الآن':'WHY NOW'}</Eyebrow><h2 className={styles.h2}>{ar?'لماذا تحتاجه المؤسسات الآن؟':'Why institutions need this now'}</h2>
      {project.whyNow.highlights&&<div className={styles.highlights}>{project.whyNow.highlights.map(h=><div key={h.text.en}><strong>{h.value[locale]}</strong><p>{h.text[locale]}</p></div>)}</div>}
      {project.whyNow.paragraphs.length>0&&<div className={styles.prose}>{project.whyNow.paragraphs.map(p=><p key={p.en}>{p[locale]}</p>)}</div>}
      <p className={styles.sourceNote}>{ar?'مصادر علنية، وليست شراكات ولا تكليفات.':'Public sources — not partnerships or engagements.'}</p>
      <ul className={styles.sources}>{project.whyNow.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" dir="ltr">{source.title}<ArrowUpRight size={14} aria-hidden="true"/></a></li>)}</ul>
    </div></section>}
    {pitch&&pitch.edges.length>0&&<section className={`${styles.section} ${styles.band}`}><div className={styles.wrap}>
      <Eyebrow>{ar?'ما الذي يميّزه':'WHAT SETS IT APART'}</Eyebrow>
      <ul className={styles.edges}>{pitch.edges.map(edge=><li key={edge.en}>{edge[locale]}</li>)}</ul>
    </div></section>}
    {box&&<>
      <section id="why" className={`${styles.section} ${styles.band}`}><div className={styles.wrap}>
        <h2 className={styles.h2}>{box.whyTitle[locale]}</h2><p className={styles.big}>{project.idea[locale]}</p>
      </div></section>
      <section id="inside" className={styles.section}><div className={styles.wrap}>
        <h2 className={styles.h2}>{box.insideTitle[locale]}</h2>
        <div className={styles.workGrid}>{box.inside.map((item,i)=><article key={item.title.en}><span dir="ltr" className={styles.mono}>{String(i+1).padStart(2,'0')}</span><h3>{item.title[locale]}</h3><p>{item.text[locale]}</p></article>)}</div>
      </div></section>
      <section id="cohort" className={`${styles.section} ${styles.band}`}><div className={styles.wrap}>
        <h2 className={styles.h2}>{box.cohortTitle[locale]}</h2><p className={styles.prose}>{box.cohort[locale]}</p>
        <div className={styles.actions}><a className={styles.primary} href={boxMailto(box,locale)}>{box.cta[locale]}<ArrowUpRight size={18} aria-hidden="true"/></a><span className={styles.mono} dir="ltr">{box.email}</span></div>
      </div></section>
    </>}
    {!pitch&&!box&&<section id="overview" className={`${styles.section} ${styles.band}`}><div className={`${styles.wrap} ${styles.split}`}>
      <div><Eyebrow>{ar?'التحدي':'THE CHALLENGE'}</Eyebrow><p className={styles.big}>{file?.challenge[locale]||project.idea[locale]}</p></div>
      <div className={styles.panel}><Eyebrow>{ar?'دور VisionSeek':'VISIONSEEK’S ROLE'}</Eyebrow><p>{file?.role[locale]||project.idea[locale]}</p><Eyebrow>{ar?'لمن':'WHO IT IS FOR'}</Eyebrow><p>{project.beneficiary[locale]}</p></div>
    </div></section>}
    {file&&<>
      <section id="scope" className={styles.section}><div className={styles.wrap}>
        <Eyebrow>{ar?'كيف يعمل':'HOW IT WORKS'}</Eyebrow><h2 className={styles.h2}>{ar?'ما الذي نطوّره؟':'What are we developing?'}</h2>
        <div className={styles.workGrid}>{file.workstreams.map((work,i)=><article key={work.id}><span dir="ltr" className={styles.mono}>{String(i+1).padStart(2,'0')}</span><h3>{work.title[locale]}</h3><p>{work.body[locale]}</p></article>)}</div>
      </div></section>
      <section id="engagement" className={`${styles.section} ${styles.band}`}><div className={styles.wrap}>
        <Eyebrow>{ar?'للحكومات والمؤسسات والشركات':'FOR GOVERNMENTS, INSTITUTIONS & COMPANIES'}</Eyebrow><h2 className={styles.h2}>{ar?'كيف نبدأ مع مؤسستك؟':'How do we start with your institution?'}</h2>
        <p className={styles.prose}>{file.engagement[locale]}</p>
        <div className={styles.workGrid}>{file.deliverables.map((item,i)=><article key={item.title.en}><span dir="ltr" className={styles.mono}>{String(i+1).padStart(2,'0')}</span><h3>{item.title[locale]}</h3><p>{item.body[locale]}</p></article>)}</div>
        <div className={styles.split}>
          <div className={styles.panel}><h3>{ar?'لديك احتياج يرتبط بهذا المشروع؟':'Does this project connect to your needs?'}</h3><p>{ar?'نبدأ بمناقشة احتياج مؤسستك، ثم نحدد نطاق التكليف ومخرجاته ومسؤولياته ووقته وتكلفته قبل الاتفاق.':'We begin with your institution’s needs, then define scope, outputs, responsibilities, timing and cost before agreement.'}</p><Link className={styles.primary} href={projectInquiry(project,locale)}>{ar?'اطلب مناقشة نطاق التعاقد':'Discuss commissioning this work'}<ArrowUpRight size={18} aria-hidden="true"/></Link></div>
          <div className={styles.panel}><h3>{ar?'لديك قدرة يحتاجها المشروع؟':'Can you contribute a capability?'}</h3><ul className={styles.list}>{file.partnerNeeds.map(item=><li key={item.en}>{item[locale]}</li>)}</ul><Link className={styles.secondary} href={projectInquiry(project,locale,'partner')}>{ar?'ناقش الانضمام كشريك':'Discuss a project partnership'}</Link></div>
        </div>
      </div></section>
    </>}
    {related.length>0&&<section className={styles.section}><div className={styles.wrap}>
      <div className={styles.heading}><h2>{ar?'مشروع مرتبط':'Related project'}</h2><Link className={styles.textLink} href={trackPath(track,locale)}>{ar?`كل مشاريع ${track.title.ar}`:`All ${track.title.en} projects`}<ArrowUpRight size={16} aria-hidden="true"/></Link></div>
      <div className={styles.related}>{related.map(p=><Link href={projectPath(p.slug,locale)} key={p.id}><span dir="ltr" className={styles.mono}>{p.id}</span><h3>{p.title[locale]}</h3><ArrowUpRight size={22} aria-hidden="true"/></Link>)}</div>
    </div></section>}
    <Contact locale={locale}/>
  </Frame>;
}
