import Image from 'next/image';
import type {Locale} from '@/lib/institution';
import data from '@/content/competitions.json';
import JoinForm from './competitions-join';

type Copy = {en: string; ar: string};
type Card = {
  id: string;
  status: 'open' | 'filled';
  deadline: string;
  project: string;
  description: Copy;
  competition: string;
  role: Copy;
  leader: Copy;
};

const cards = data.cards as Card[];

function isFilled(card: Card, now = Date.now()) {
  if (card.status === 'filled') return true;
  const end = new Date(`${card.deadline}T23:59:59+09:00`).getTime();
  return Number.isFinite(end) && now > end;
}

function formatDeadline(iso: string, ar: boolean) {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat(ar ? 'ar-EG' : 'en-US', {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'}).format(date);
}

export default function Competitions({locale}: {locale: Locale}) {
  const ar = locale === 'ar';
  const tx = (v: Copy) => (ar ? v.ar : v.en);
  const open = cards.filter(card => !isFilled(card));
  const done = cards.filter(card => isFilled(card));
  return (
    <section className="vs-comp" id="competitions" aria-labelledby="competitions-title">
      <div className="vs-comp-intro">
        <p className="vs-comp-kicker">{ar ? 'المسابقات' : 'Competitions'}</p>
        <h2 id="competitions-title">{ar ? 'الأفكار الكبيرة بتتبني مع بعض' : 'Big ideas are built together'}</h2>
        <p>{ar ? 'بندخل مسابقات الذكاء الاصطناعي العالمية بمشاريع بتعالج ثغرات حقيقية، ومع شركاء بيكمّلونا.' : 'We enter global AI competitions with projects that solve real gaps, together with partners who complete us.'}</p>
      </div>

      <div className="vs-comp-block">
        <h3>{ar ? 'مشاركين فيها دلوقتي' : 'Now competing'}</h3>
        {open.length === 0 ? <p className="vs-comp-empty">{ar ? 'مفيش مسابقة مفتوحة دلوقتي.' : 'No open competition right now.'}</p> : open.map(card => <CompetitionCard key={card.id} card={card} ar={ar} tx={tx}/>)}
      </div>

      <div className="vs-comp-block" id="join-competition">
        <h3>{ar ? 'انضم' : 'Join'}</h3>
        <JoinForm ar={ar}/>
      </div>

      <div className="vs-comp-block">
        <h3>{ar ? 'خلصت' : 'Completed'}</h3>
        {done.length === 0 ? <p className="vs-comp-empty">{ar ? 'لسه مفيش مسابقة خلصت.' : 'No completed competition yet.'}</p> : done.map(card => <CompetitionCard key={card.id} card={card} ar={ar} tx={tx} filled/>)}
      </div>

      <div className="vs-comp-block">
        <h3>{ar ? 'إزاي بنشتغل' : 'How we work'}</h3>
        <ul className="vs-comp-how">
          <li>{ar ? 'VisionSeek بتقود' : 'VisionSeek leads'}</li>
          <li>{ar ? 'الشركاء بيكمّلونا' : 'Partners complete us'}</li>
          <li>{ar ? 'كل اتفاق مكتوب من الأول' : 'Every agreement is written upfront'}</li>
        </ul>
      </div>
    </section>
  );
}

function CompetitionCard({card, ar, tx, filled = false}: {card: Card; ar: boolean; tx: (v: Copy) => string; filled?: boolean}) {
  return (
    <article className="vs-comp-card">
      <div className="vs-comp-card-body">
        <p className="vs-comp-status">{filled ? (ar ? 'اكتمل' : 'Filled') : (ar ? 'مفتوح · مطلوب شريك' : 'Open · Partner wanted')}</p>
        <p className="vs-comp-in">
          {ar ? 'مشاركين في' : 'Competing in'}
          <Image src="/competitions/meta.png" alt="Meta" width={3639} height={844}/>
        </p>
        <h4>{card.project}</h4>
        <p className="vs-comp-desc">{tx(card.description)}</p>
        <dl>
          <dt>{ar ? 'المسابقة' : 'Competition'}</dt><dd>{card.competition}</dd>
          <dt>{ar ? 'الدور المطلوب' : 'Role needed'}</dt><dd>{tx(card.role)}</dd>
          <dt>{ar ? 'آخر موعد' : 'Deadline'}</dt><dd>{formatDeadline(card.deadline, ar)}</dd>
        </dl>
        <div className="vs-comp-card-foot">
          {filled ? null : <a className="vs-comp-join" href="#join-competition">{ar ? 'انضم للفريق' : 'Join the team'}</a>}
          <p className="vs-comp-leader">
            <Image src="/competitions/ahmed.jpg" alt="" width={72} height={72}/>
            <span>{tx(card.leader)}</span>
          </p>
        </div>
      </div>
      <figure className="vs-comp-photo">
        <Image src="/competitions/team.jpg" alt={ar ? 'فريق يعمل معًا' : 'A team working together'} fill sizes="(max-width: 760px) 100vw, 42vw"/>
      </figure>
    </article>
  );
}
