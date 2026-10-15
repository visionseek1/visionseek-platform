'use client';
import Link from 'next/link';
import {useMemo, useState} from 'react';
import styles from './ks.module.css';
import {NO_PARTNERSHIP, REGION_COPY, ROUTE_COPY, SECTOR_EN, TYPE_COPY, TYPES, type Bi, type Region, type Solution, type SolutionType} from '@/lib/korean-solutions-copy';

type Locale = 'ar' | 'en';
type Filter = {type: SolutionType | 'all'; sector: string; region: Region | 'all'};
const ALL: Filter = {type: 'all', sector: 'all', region: 'all'};

/** Lower-case, strip Arabic diacritics and unify alef/yaa/taa forms, so the search forgives spelling. */
const fold = (v: string) => v.toLowerCase().replace(/[ً-ْـ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه');

/** The gateway search, the three doors and the finder. All filtering happens in the page; nothing is sent anywhere. */
export default function Finder({locale, solutions}: {locale: Locale; solutions: Solution[]}) {
  const ar = locale === 'ar'; const t = (v: Bi) => (ar ? v.ar : v.en); const p = ar ? '/ar' : '';
  const [q, setQ] = useState('');
  const [f, setF] = useState<Filter>(ALL);
  const sectors = useMemo(() => Array.from(new Set(solutions.map(s => s.sector).filter(Boolean))), [solutions]);
  const sectorName = (s: string) => (ar ? s : SECTOR_EN[s] || s);
  const hay = useMemo(() => new Map(solutions.map(s => [s.slug, fold([s.title.ar, s.title.en, s.maker, s.problem.ar, s.problem.en, s.solution.ar, s.solution.en, s.sector, SECTOR_EN[s.sector] || '', s.where.ar, s.where.en].join(' '))])), [solutions]);
  const words = fold(q).split(/\s+/).filter(Boolean);
  const match = (s: Solution, skip?: keyof Filter) =>
    (skip === 'type' || f.type === 'all' || s.type === f.type) &&
    (skip === 'sector' || f.sector === 'all' || s.sector === f.sector) &&
    (skip === 'region' || f.region === 'all' || s.region === f.region) &&
    words.every(w => (hay.get(s.slug) || '').includes(w));
  const results = solutions.filter(s => match(s));
  const count = (skip: keyof Filter, test: (s: Solution) => boolean) => solutions.filter(s => match(s, skip) && test(s)).length;
  const pick = (k: keyof Filter, v: string) => setF(prev => ({...prev, [k]: v}));
  const filtered = q || f.type !== 'all' || f.sector !== 'all' || f.region !== 'all';
  const arrow = ar ? '←' : '→';

  const chip = (k: keyof Filter, v: string, label: string, n: number) =>
    <button key={v} type="button" className={styles.chip} aria-pressed={f[k] === v} disabled={n === 0 && f[k] !== v} onClick={() => pick(k, v)}>{label}<span className={styles.num}>{n}</span></button>;

  return <>
    <section className={styles.hero} aria-labelledby="ks-title">
      <div className={`${styles.gutter}`}><div className={`${styles.inner} ${styles.heroInner}`}>
        <p className={`${styles.eyebrow} ${styles.latin}`} lang="en" dir="ltr" style={{textAlign: ar ? 'right' : 'left'}}>KOREAN SOLUTIONS · VISIONSEEK</p>
        <h1 id="ks-title">{ar ? 'حلول من كوريا' : 'Korean Solutions'}</h1>
        <p className={styles.heroLede}>{ar
          ? 'بنت كوريا في عقود ما تحتاجه منطقتنا اليوم. نختار منها ما أثبت نفسه هناك، ونحمله إلى المؤسسة العربية التي تحتاجه: منتجات جاهزة، وحلول تعمل داخل المؤسسة، وتكنولوجيا تُنقل وتُصنع عندنا.'
          : 'Over a few decades Korea built much of what our region needs today. We pick what has proven itself there and carry it to the Arab organisation that needs it: ready products, solutions that work inside the organisation, and technology that is transferred and made here.'}</p>
        <label className={styles.search}>
          <span>{ar ? 'ابحث عن حل' : 'Search for a solution'}</span>
          <span className={styles.searchBox}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{color: '#0b0d0c', flex: 'none'}}><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
            <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder={ar ? 'مثال: سرطان الثدي، رعاية المسنّين، الزراعة…' : 'e.g. breast screening, elderly care, farming…'} aria-controls="ks-results"/>
          </span>
        </label>
        <div className={styles.stats}>
          <div><b className={styles.num}>{solutions.length}</b><span>{ar ? 'حل في المنصة' : 'on the platform'}</span></div>
          <div><b className={styles.num}>{sectors.length}</b><span>{ar ? 'مجالات' : 'fields'}</span></div>
          <div><b className={`${styles.num} ${styles.hot}`}>{solutions.filter(s => s.region === 'نعم').length}</b><span>{ar ? 'وصلت المنطقة العربية' : 'already in the Arab region'}</span></div>
        </div>
      </div></div>
    </section>

    <div className={styles.gutter}><section className={`${styles.inner} ${styles.doors}`} aria-label={ar ? 'الأبواب الثلاثة' : 'Three doors'}>
      {TYPES.map(k => {
        const c = TYPE_COPY[k]; const on = f.type === k;
        return <button key={k} type="button" className={styles.door} aria-pressed={on} onClick={() => { setF(prev => ({...prev, type: on ? 'all' : k})); document.getElementById('finder')?.scrollIntoView({behavior: 'smooth', block: 'start'}); }}>
          <span className={`${styles.doorEn} ${styles.latin}`} lang="en">{c.many.en.toUpperCase()}</span>
          <span className={styles.doorName}>{t(c.many)}</span>
          <span className={styles.doorLine}>{t(c.line)}</span>
          <span className={styles.doorCount}><span className={styles.num}>{solutions.filter(s => s.type === k).length}</span> {ar ? 'في المنصة' : 'on the platform'} {arrow}</span>
        </button>;
      })}
    </section></div>

    <div className={styles.gutter}><section id="finder" className={`${styles.inner} ${styles.finder}`} aria-labelledby="finder-title">
      <div className={styles.finderHead}>
        <h2 id="finder-title">{ar ? 'المستكشف' : 'Finder'}</h2>
        <span className={styles.resultLine} role="status"><span className={styles.num}>{results.length}</span> {ar ? 'من' : 'of'} <span className={styles.num}>{solutions.length}</span> {ar ? 'حل' : 'solutions'}</span>
        {filtered && <button type="button" className={styles.reset} onClick={() => { setF(ALL); setQ(''); }}>{ar ? 'مسح الفلاتر' : 'Clear filters'}</button>}
      </div>
      <p className={styles.note}>{t(NO_PARTNERSHIP)}</p>
      <div className={styles.finderBody}>
        <aside className={styles.filters} aria-label={ar ? 'الفلاتر' : 'Filters'}>
          <fieldset className={styles.group}><legend>{ar ? 'النوع' : 'Type'}</legend>
            {chip("type", "all", ar ? 'الكل' : 'All', count('type', () => true))}
            {TYPES.map(k => chip("type", k, t(TYPE_COPY[k].many), count('type', s => s.type === k)))}
          </fieldset>
          <fieldset className={styles.group}><legend>{ar ? 'المجال' : 'Field'}</legend>
            {chip("sector", "all", ar ? 'كل المجالات' : 'All fields', count('sector', () => true))}
            {sectors.map(k => chip("sector", k, sectorName(k), count('sector', s => s.sector === k)))}
          </fieldset>
          <fieldset className={styles.group}><legend>{ar ? 'وصل المنطقة؟' : 'In the region?'}</legend>
            {chip("region", "all", ar ? 'الكل' : 'All', count('region', () => true))}
            {(['نعم', 'تجربة', 'لسه'] as Region[]).map(k => chip("region", k, t(REGION_COPY[k].chip), count('region', s => s.region === k)))}
          </fieldset>
        </aside>
        <div id="ks-results" className={styles.results}>
          {results.map(s => <SolutionCard key={s.slug} s={s} locale={locale}/>)}
          {!results.length && <p className={styles.empty}>{ar
            ? 'لا يوجد حل بهذه المواصفات بعد. اكتب لنا احتياجك في الأسفل، ونبحث لك عنه في كوريا.'
            : 'No solution matches yet. Tell us your need below, and we will look for it in Korea.'} <a href={`${p}/korean-solutions#needs`}>{ar ? 'اكتب احتياجك' : 'Write your need'} {arrow}</a></p>}
        </div>
      </div>
    </section></div>
  </>;
}

export function SolutionCard({s, locale}: {s: Solution; locale: Locale}) {
  const ar = locale === 'ar'; const t = (v: Bi) => (ar ? v.ar : v.en); const p = ar ? '/ar' : '';
  const c = TYPE_COPY[s.type];
  const regionClass = s.region === 'نعم' ? styles.rYes : s.region === 'تجربة' ? styles.rPilot : styles.rNo;
  const where = t(s.where);
  const proof = s.proof[0];
  return <article className={styles.card}>
    <div className={styles.tags}><span className={`${styles.type} ${styles['t-' + c.key]}`}>{t(c.one)}</span>{s.sector && <span className={styles.tag}>{ar ? s.sector : SECTOR_EN[s.sector] || s.sector}</span>}</div>
    <h3><Link href={`${p}/korean-solutions/${s.slug}`}>{t(s.title) || s.title.ar}</Link></h3>
    {s.maker && <p className={styles.maker} dir="auto">{s.maker}</p>}
    <p className={styles.problem}>{t(s.problem)}</p>
    <div className={styles.cardFoot}>
      {proof && <p className={styles.proofLine}><b>{ar ? 'الدليل:' : 'Proof:'}</b> <span dir="auto">{t(proof) || proof.ar}</span></p>}
      <p className={regionClass}>{t(REGION_COPY[s.region].lead)}{s.region !== 'لسه' && where ? `: ${where}` : ''}</p>
      <div className={styles.cardEnd}>
        <span className={styles.routes}>{s.routes.map(r => t(ROUTE_COPY[r].name)).join(' · ')}</span>
        <span className={styles.more} aria-hidden="true">{ar ? 'التفاصيل ←' : 'Details →'}</span>
      </div>
    </div>
  </article>;
}
