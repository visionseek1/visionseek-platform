import Image from 'next/image';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {DocumentLocale} from '@/components/governance/document-locale';
import {cardsNow, competitions, formatDeadline, type CardStatus, type CompetitionCard, type Locale} from '@/lib/competitions';
import JoinForm from './join-form';
import styles from './competitions.module.css';

const {hero, labels, form, how} = competitions;

function Card({card, state, locale}: {card: CompetitionCard; state: CardStatus; locale: Locale}) {
  const open = state === 'open';
  return (
    <article className={styles.card} aria-labelledby={`${card.id}-title`}>
      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          <p className={open ? styles.status : `${styles.status} ${styles.statusFilled}`}>{open ? labels.open[locale] : labels.filled[locale]}</p>
          <p className={styles.competingIn}>
            {labels.competingIn[locale]}
            <Image src={card.logo} alt={card.organizer} width={112} height={26}/>
          </p>
        </div>
        <h3 id={`${card.id}-title`} className={styles.project}>{card.project}</h3>
        <p className={styles.summary}>{card.summary[locale]}</p>
        <dl className={styles.facts}>
          <div><dt>{labels.competition[locale]}</dt><dd>{card.competition}</dd></div>
          <div><dt>{labels.role[locale]}</dt><dd>{card.role[locale]}</dd></div>
          <div><dt>{labels.deadline[locale]}</dt><dd><time dateTime={card.deadline}>{formatDeadline(card.deadline, locale)}</time></dd></div>
        </dl>
        <div className={styles.cardFoot}>
          {open && <a className={styles.button} href="#join">{labels.joinTeam[locale]}</a>}
          <p className={styles.leader}>
            <Image src={card.leaderImage} alt="" width={44} height={44}/>
            <span>{card.leader[locale]}</span>
          </p>
        </div>
      </div>
      <div className={styles.cardPhoto}>
        <Image src={card.image} alt="" fill sizes="(max-width: 860px) 100vw, 40vw"/>
      </div>
    </article>
  );
}

function CompletedCard({card, locale}: {card: CompetitionCard; locale: Locale}) {
  return (
    <article className={styles.done} aria-labelledby={`${card.id}-title`}>
      <h3 id={`${card.id}-title`} className={styles.project}>{card.project}</h3>
      <dl className={styles.facts}>
        <div><dt>{labels.competition[locale]}</dt><dd>{card.competition}</dd></div>
        {card.result?.[locale] && <div><dt>{labels.result[locale]}</dt><dd>{card.result[locale]}</dd></div>}
        {card.lessons?.[locale] && <div><dt>{labels.lessons[locale]}</dt><dd>{card.lessons[locale]}</dd></div>}
      </dl>
    </article>
  );
}

export function CompetitionsPage({locale, fontClassName = ''}: {locale: Locale; fontClassName?: string}) {
  const ar = locale === 'ar';
  const {current, completed} = cardsNow();
  const teams = current.filter(({state}) => state === 'open').map(({card}) => ({id: card.id, project: card.project, competition: card.competition}));

  return (
    <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
      <DocumentLocale locale={locale}/>
      <CapabilityHeader locale={locale} path="/competitions"/>
      <main id="main-content" className={`${styles.page} ${ar ? styles.ar : styles.en} ${fontClassName}`}>
        <section className={styles.hero} aria-labelledby="competitions-title">
          <div className={styles.heroCopy}>
            <div className={styles.lockup} dir="ltr">
              <Image src="/visionseek-symbol-color.png" alt="" width={36} height={36}/>
              <span>VisionSeek</span>
            </div>
            <p className={styles.kicker}>{hero.kicker[locale]}</p>
            <h1 id="competitions-title" className={styles.title}>{hero.title[locale]}</h1>
            <p className={styles.lede}>{hero.text[locale]}</p>
          </div>
          <div className={styles.heroPhoto}>
            <Image src={hero.image} alt="" fill priority sizes="(max-width: 860px) 100vw, 55vw"/>
          </div>
        </section>

        <section id="now-competing" className={styles.section} aria-labelledby="now-competing-title">
          <h2 id="now-competing-title" className={styles.heading}>{labels.now[locale]}</h2>
          {current.length
            ? <div className={styles.cards}>{current.map(({card, state}) => <Card key={card.id} card={card} state={state} locale={locale}/>)}</div>
            : <p className={styles.empty}>{labels.empty[locale]}</p>}
        </section>

        <section id="join" className={styles.section} aria-labelledby="join-title">
          <h2 id="join-title" className={styles.heading}>{labels.join[locale]}</h2>
          <JoinForm
            teams={teams}
            subject={hero.kicker[locale]}
            labels={{name: form.name[locale], email: form.email[locale], role: form.role[locale], link: form.link[locale], note: form.note[locale], submit: labels.joinTeam[locale], competition: labels.competition[locale]}}
          />
        </section>

        <section id="completed" className={styles.section} aria-labelledby="completed-title">
          <h2 id="completed-title" className={styles.heading}>{labels.completed[locale]}</h2>
          {completed.length
            ? <div className={styles.cards}>{completed.map(card => <CompletedCard key={card.id} card={card} locale={locale}/>)}</div>
            : <p className={styles.empty}>{labels.empty[locale]}</p>}
        </section>

        <section id="how-we-work" className={styles.section} aria-labelledby="how-we-work-title">
          <h2 id="how-we-work-title" className={styles.heading}>{labels.how[locale]}</h2>
          <ul className={styles.how}>
            {how.map(item => <li key={item.en}>{item[locale]}</li>)}
          </ul>
        </section>
      </main>
      <CapabilityFooter locale={locale}/>
    </div>
  );
}
