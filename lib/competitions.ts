import data from '@/content/competitions.json';

/** Copy for the Competitions band on /work-with-us. Edited from /admin («المسابقات»). */
export type Locale = 'en' | 'ar';
export type Bi = {en: string; ar: string};
export type CardStatus = 'open' | 'filled' | 'completed';
export type CompetitionCard = {
  id: string;
  status: CardStatus;
  project: string;
  summary: Bi;
  organizer: string;
  logo: string;
  competition: string;
  role: Bi;
  deadline: string;
  leader: Bi;
  leaderImage: string;
  image: string;
  result?: Bi;
  lessons?: Bi;
};
type Labels = 'now' | 'join' | 'completed' | 'how' | 'empty' | 'competingIn' | 'open' | 'filled' | 'competition' | 'role' | 'deadline' | 'joinTeam' | 'result' | 'lessons';
export type Competitions = {
  hero: {kicker: Bi; title: Bi; text: Bi; image: string};
  labels: Record<Labels, Bi>;
  form: Record<'name' | 'email' | 'role' | 'link' | 'note', Bi>;
  how: Bi[];
  cards: CompetitionCard[];
};

export const competitions = data as Competitions;

/** An open card closes at the end of its deadline day in Korea (UTC+9), where VisionSeek works from. */
const deadlineEnd = (deadline: string) => new Date(`${deadline}T23:59:59.999+09:00`).getTime();

/** «اكتمل / Filled» once the role is filled or the deadline has passed. */
function cardState(card: CompetitionCard, now: number): CardStatus {
  if (card.status !== 'open') return card.status;
  const end = deadlineEnd(card.deadline);
  return Number.isFinite(end) && now > end ? 'filled' : 'open';
}

/** The cards as of render time: current ones (open first) for «الجارية», finished ones for «المكتملة». */
export function cardsNow(now = Date.now()) {
  const current = competitions.cards
    .map(card => ({card, state: cardState(card, now)}))
    .filter(({state}) => state !== 'completed')
    .sort((a, b) => Number(a.state !== 'open') - Number(b.state !== 'open'));
  return {current, completed: competitions.cards.filter(card => card.status === 'completed')};
}

export function formatDeadline(deadline: string, locale: Locale) {
  const day = new Date(`${deadline}T00:00:00Z`);
  if (Number.isNaN(day.getTime())) return deadline;
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'}).format(day);
}
