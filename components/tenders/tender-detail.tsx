import Image from 'next/image';
import Link from 'next/link';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import JoinForm from '@/components/competitions/join-form';
import {DocumentLocale} from '@/components/governance/document-locale';
import {
  formatOpened,
  officialRef,
  tenderCardsNow,
  tenders,
  type Locale,
  type TenderCard,
} from '@/lib/tenders';
import {DeadlineClock} from './deadline-clock';
import styles from './tenders.module.css';

const {hero, labels, form} = tenders;

export function TenderDetailPage({card, locale, fontClassName = ''}: {card: TenderCard; locale: Locale; fontClassName?: string}) {
  const ar = locale === 'ar';
  const p = ar ? '/ar' : '';
  const open = tenderCardsNow().current.some(item => item.card.id === card.id && item.state === 'open');
  const paragraphs = card.body[locale].split(/\n\n+/);
  const teams = open ? [{id: card.id, project: card.title[locale], competition: officialRef(card)}] : [];

  return (
    <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
      <DocumentLocale locale={locale}/>
      <CapabilityHeader locale={locale} path={`/work-with-us/tenders/${card.id}`}/>
      <main id="main-content">
        <article className={`${styles.page} ${ar ? styles.ar : styles.en} ${fontClassName}`} aria-labelledby="tender-title">
          <div className={styles.detailHero}>
            <div className={styles.detailCopy}>
              <nav className={styles.crumb} aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}>
                <Link href={p || '/'}>{ar ? 'الرئيسية' : 'Home'}</Link>
                <span>/</span>
                <Link href={`${p}/work-with-us`}>{ar ? 'اعمل معنا' : 'Work with Us'}</Link>
                <span>/</span>
                <Link href={`${p}/work-with-us#tenders`}>{hero.kicker[locale]}</Link>
              </nav>
              <p className={open ? styles.status : `${styles.status} ${styles.statusFilled}`}>{open ? labels.open[locale] : labels.filled[locale]}</p>
              <h1 id="tender-title" className={styles.detailTitle}>{card.title[locale]}</h1>
              <p className={styles.official}>{officialRef(card)} — {card.issuer[locale]}</p>
              <div className={styles.article}>
                {paragraphs.map(text => <p key={text}>{text}</p>)}
              </div>
              <dl className={styles.facts}>
                <div><dt>{labels.tender[locale]}</dt><dd>{officialRef(card)}</dd></div>
                <div><dt>{labels.issuerIn[locale]}</dt><dd>{card.issuer[locale]}</dd></div>
                <div><dt>{labels.role[locale]}</dt><dd>{card.role[locale]}</dd></div>
                <div><dt>{labels.eligibility[locale]}</dt><dd>{card.eligibility[locale]}</dd></div>
                <div><dt>{labels.opened[locale]}</dt><dd><time dateTime={card.opened}>{formatOpened(card.opened, locale)}</time></dd></div>
                <div>
                  <dt>{labels.deadline[locale]}</dt>
                  <dd><DeadlineClock deadline={card.deadline} locale={locale}/></dd>
                </div>
                <div>
                  <dt>{labels.source[locale]}</dt>
                  <dd><a className={styles.sourceLink} href={card.sourceUrl} rel="noreferrer">{card.sourceLabel[locale]}</a></dd>
                </div>
              </dl>
            </div>
            <div className={styles.detailPhoto}>
              <Image src={card.image} alt={card.imageAlt[locale]} fill sizes="(max-width: 860px) 100vw, 40vw" priority/>
            </div>
          </div>

          {open && (
            <div id="tenders-join" className={styles.section} aria-labelledby="tenders-join-title">
              <h2 id="tenders-join-title" className={styles.heading}>{labels.join[locale]}</h2>
              <JoinForm
                teams={teams}
                subject={card.title[locale]}
                labels={{name: form.name[locale], email: form.email[locale], role: form.role[locale], link: form.link[locale], note: form.note[locale], submit: labels.contact[locale], competition: labels.tender[locale]}}
              />
            </div>
          )}

          <div className={styles.section}>
            <Link className={`${styles.button} ${styles.ghost}`} href={`${p}/work-with-us#tenders`}>{labels.back[locale]}</Link>
          </div>
        </article>
      </main>
      <CapabilityFooter locale={locale}/>
    </div>
  );
}
