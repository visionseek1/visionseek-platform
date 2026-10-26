import Image from 'next/image';
import Link from 'next/link';
import JoinForm from '@/components/competitions/join-form';
import {
  formatOpened,
  officialRef,
  tenderCardsNow,
  tenderPath,
  tenders,
  type CardStatus,
  type Locale,
  type TenderCard,
} from '@/lib/tenders';
import {DeadlineClock} from './deadline-clock';
import styles from './tenders.module.css';

const {hero, labels, form, how} = tenders;

function Card({card, state, locale}: {card: TenderCard; state: CardStatus; locale: Locale}) {
  const open = state === 'open';
  const href = tenderPath(card.id, locale);
  return (
    <article className={styles.card} id={card.id} aria-labelledby={`${card.id}-title`}>
      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          <p className={open ? styles.status : `${styles.status} ${styles.statusFilled}`}>{open ? labels.open[locale] : labels.filled[locale]}</p>
          <p className={styles.issuer}>
            {labels.issuerIn[locale]}
            <span className={styles.issuerName}>{card.issuer[locale]}</span>
          </p>
        </div>
        <h3 id={`${card.id}-title`} className={styles.project}>
          <Link href={href}>{card.title[locale]}</Link>
        </h3>
        <p className={styles.official}>{officialRef(card)}</p>
        <p className={styles.summary}>{card.summary[locale]}</p>
        <dl className={styles.facts}>
          <div><dt>{labels.tender[locale]}</dt><dd>{officialRef(card)}</dd></div>
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
        <div className={styles.cardFoot}>
          {open && <a className={styles.button} href="#tenders-join">{labels.contact[locale]}</a>}
          <Link className={`${styles.button} ${styles.ghost}`} href={href}>{labels.read[locale]}</Link>
        </div>
      </div>
      <div className={styles.cardPhoto}>
        <Image src={card.image} alt={card.imageAlt[locale]} fill sizes="(max-width: 860px) 100vw, 40vw"/>
      </div>
    </article>
  );
}

function CompletedCard({card, locale}: {card: TenderCard; locale: Locale}) {
  return (
    <article className={styles.done} aria-labelledby={`${card.id}-title`}>
      <h3 id={`${card.id}-title`} className={styles.project}>{card.title[locale]}</h3>
      <p className={styles.official}>{officialRef(card)}</p>
      <dl className={styles.facts}>
        <div><dt>{labels.tender[locale]}</dt><dd>{officialRef(card)}</dd></div>
        {card.result?.[locale] && <div><dt>{labels.result[locale]}</dt><dd>{card.result[locale]}</dd></div>}
        {card.lessons?.[locale] && <div><dt>{labels.lessons[locale]}</dt><dd>{card.lessons[locale]}</dd></div>}
      </dl>
    </article>
  );
}

/** Tenders band on Work with Us. Cards from /admin (`tenders.cards`) render here. `/tenders` redirects to #tenders. */
export function TendersBody({locale, fontClassName = ''}: {locale: Locale; fontClassName?: string}) {
  const ar = locale === 'ar';
  const {current, completed} = tenderCardsNow();
  const teams = current
    .filter(({state}) => state === 'open')
    .map(({card}) => ({id: card.id, project: card.title[locale], competition: officialRef(card)}));

  return (
    <section id="tenders" className={`${styles.page} ${ar ? styles.ar : styles.en} ${fontClassName}`} aria-labelledby="tenders-title">
      <header className={styles.bandHead}>
        <h2 id="tenders-title" className={styles.sectionTitle}>{hero.kicker[locale]}</h2>
      </header>

      <div id="open-tenders" className={styles.section} aria-labelledby="open-tenders-title">
        <h3 id="open-tenders-title" className={styles.heading}>{labels.now[locale]}</h3>
        {current.length
          ? <div className={styles.cards}>{current.map(({card, state}) => <Card key={card.id} card={card} state={state} locale={locale}/>)}</div>
          : <p className={styles.empty}>{labels.empty[locale]}</p>}
      </div>

      <div id="tenders-join" className={styles.section} aria-labelledby="tenders-join-title">
        <h3 id="tenders-join-title" className={styles.heading}>{labels.join[locale]}</h3>
        <JoinForm
          teams={teams}
          subject={hero.kicker[locale]}
          labels={{name: form.name[locale], email: form.email[locale], role: form.role[locale], link: form.link[locale], note: form.note[locale], submit: labels.contact[locale], competition: labels.tender[locale]}}
        />
      </div>

      <div id="tenders-completed" className={styles.section} aria-labelledby="tenders-completed-title">
        <h3 id="tenders-completed-title" className={styles.heading}>{labels.completed[locale]}</h3>
        {completed.length
          ? <div className={styles.cards}>{completed.map(card => <CompletedCard key={card.id} card={card} locale={locale}/>)}</div>
          : <p className={styles.empty}>{labels.empty[locale]}</p>}
      </div>

      <div id="tenders-how" className={styles.section} aria-labelledby="tenders-how-title">
        <h3 id="tenders-how-title" className={styles.heading}>{labels.how[locale]}</h3>
        <ul className={styles.how}>
          {how.map(item => <li key={item.en}>{item[locale]}</li>)}
        </ul>
      </div>
    </section>
  );
}
