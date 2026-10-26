import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {DocumentLocale} from '@/components/governance/document-locale';
import {CompetitionsBody} from '@/components/competitions/competitions-page';
import {WorkAnnouncementsNav} from '@/components/institution/work-announcements-nav';
import {TendersBody} from '@/components/tenders/tenders-page';
import {entries, entryPath, getSection, type Locale} from '@/lib/institution';
import {entryImage} from '@/lib/institution/schema';
import Directory from './directory';
import {InstitutionCTA} from './pages';

const removedGuides = new Set(['new-to-visionseek', 'how-to-respond', 'prepare-a-concept', 'review-and-selection', 'transition']);

export function WorkWithUsPage({locale, fontClassName = ''}: {locale: Locale; fontClassName?: string}) {
  const section = getSection('work-with-us')!;
  const ar = locale === 'ar';
  const p = ar ? '/ar' : '';
  const communities = entries.filter(e => e.section === 'work-with-us' && !removedGuides.has(e.slug));

  return (
    <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
      <DocumentLocale locale={locale}/>
      <CapabilityHeader locale={locale} path="/work-with-us"/>
      <main id="main-content">
        <section className="vs-institution-hero">
          <div className="vs-institution-hero-copy">
            <nav className="vs-breadcrumb" aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}>
              <Link href={p || '/'}>{ar ? 'الرئيسية' : 'Home'}</Link>
              <span>/</span>
              <span>{section.title[locale]}</span>
            </nav>
            <p className="vs-eyebrow">{section.eyebrow[locale]}</p>
            <h1>{section.title[locale]}</h1>
            <p>{section.intro[locale]}</p>
          </div>
          <div className="vs-institution-hero-image">
            <Image src={entryImage(section.image)} alt="" fill priority sizes="(max-width:760px) 100vw, 40vw"/>
          </div>
        </section>
        <WorkAnnouncementsNav locale={locale} fontClassName={fontClassName}/>
        <CompetitionsBody locale={locale} fontClassName={fontClassName}/>
        <TendersBody locale={locale} fontClassName={fontClassName}/>
        <div className="vs-institution-layout is-single">
          <div>
            <div className="vs-client-entry">
              <p className="vs-eyebrow">{ar ? 'للمؤسسات والحكومات وأصحاب الأعمال' : 'FOR INSTITUTIONS, GOVERNMENTS AND BUSINESS OWNERS'}</p>
              <h2>{ar ? 'تواجه تحديًا يحتاج إلى حل؟' : 'Facing a challenge that needs a solution?'}</h2>
              <p>{ar ? 'ابدأ بوصف قصير لما تريد تحقيقه، وتواصل معنا مباشرة لنناقش الخطوة المناسبة.' : 'Start with a short description of your desired outcome and contact us directly to discuss the next step.'}</p>
              <Link className="vs-button" href={`${p}/start`}>{ar ? 'ابنِ حلولك معنا' : 'Build your solutions with us'}<ArrowRight size={18}/></Link>
            </div>
            <Directory
              ar={ar}
              label={section.title[locale]}
              filters={false}
              items={communities.map(e => ({path: `${p}${entryPath(e)}`, title: e.title[locale], summary: e.summary[locale], category: e.category[locale], status: e.status[locale], image: entryImage(e.image), code: e.code}))}
            />
          </div>
        </div>
        <InstitutionCTA locale={locale}/>
      </main>
      <CapabilityFooter locale={locale}/>
    </div>
  );
}
