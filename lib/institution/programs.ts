import {t, type Entry, type Text} from './schema';
import {readContentDir} from './content-files';

type Step = {title: Text; body: Text};
type Concept = {
  slug: string;
  code: string;
  title: Text;
  summary: Text;
  image: string;
  name?: Text;
  classification?: Text;
  status?: Text;
  challengeTitle?: Text;
  challenge?: Text;
  approachTitle?: Text;
  approach?: Text;
  steps?: Step[];
  principlesTitle?: Text;
  principles?: Text[];
  related?: Array<string | {href: string}>;
  cta?: Text;
};
/** Programs. Edited from /admin («البرامج»). Aegis is the first field program. */
export const concepts: Concept[] = readContentDir<Concept & {position: number}>('programs');

export const programEntries: Entry[] = concepts.map(c => ({
  section: 'programs',
  slug: c.slug,
  code: c.code,
  title: c.title,
  name: c.name,
  summary: c.summary,
  category: c.classification ?? t('Program', 'برنامج'),
  status: c.status ?? t('Pilot-Ready', 'جاهز للتجريب'),
  image: c.image,
  action: 'concept',
  cta: {
    title: c.cta ?? t('Request a capability brief', 'اطلب موجز القدرة'),
    label: c.cta ?? t('Request a capability brief', 'اطلب موجز القدرة'),
    href: '/start',
  },
  facts: [
    {label: t('Official name', 'الاسم الرسمي'), value: c.name ?? c.title},
    {label: t('Classification', 'التصنيف'), value: c.classification ?? t('Institutional AI', 'ذكاء اصطناعي مؤسسي')},
    {label: t('Status', 'الحالة'), value: c.status ?? t('Pilot-Ready', 'جاهز للتجريب')},
  ],
  blocks: [
    {title: c.challengeTitle ?? t('The operational reality', 'التحدي المؤسسي'), body: c.challenge},
    {title: c.approachTitle ?? t('The field method', 'المنهج الميداني'), body: c.approach},
    ...(c.principles?.length ? [{title: c.principlesTitle ?? t('Principles', 'المبادئ'), items: c.principles}] : []),
    ...(c.steps ?? []).map(step => ({title: step.title, body: step.body})),
  ],
  related: (() => {
    const paths = (c.related ?? []).map(item => typeof item === 'string' ? item : item.href).filter(Boolean);
    return paths.length ? paths : ['/programs'];
  })(),
}));

export const opportunityEntries: Entry[] = [];
