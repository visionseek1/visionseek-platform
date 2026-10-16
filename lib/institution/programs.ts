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
  challenge?: Text;
  approach?: Text;
  steps?: Step[];
};
/** Programs. Edited from /admin («البرامج»). Aegis is the first field program. */
export const concepts: Concept[] = readContentDir<Concept & {position: number}>('programs');

export const programEntries: Entry[] = concepts.map(c => ({
  section: 'programs',
  slug: c.slug,
  code: c.code,
  title: c.title,
  summary: c.summary,
  category: c.classification ?? t('Program', 'برنامج'),
  status: c.status ?? t('Pilot-Ready', 'جاهز للتجربة'),
  image: c.image,
  action: 'concept',
  cta: {
    title: t('Request an Aegis Immersion Brief', 'اطلب موجز استكشاف نظام إيجيس'),
    label: t('Request an Aegis Immersion Brief', 'اطلب موجز استكشاف نظام إيجيس'),
    href: '/#capability-brief',
  },
  facts: [
    {label: t('Official name', 'الاسم الرسمي'), value: c.name ?? c.title},
    {label: t('Classification', 'التصنيف'), value: c.classification ?? t('Institutional AI', 'ذكاء اصطناعي مؤسسي')},
    {label: t('Status', 'الحالة'), value: c.status ?? t('Pilot-Ready', 'جاهز للتجربة')},
  ],
  blocks: [
    {title: t('The operational reality', 'التحدي المؤسسي'), body: c.challenge},
    {title: t('The grounded approach', 'منهجيتنا الميدانية لتشغيل Aegis'), body: c.approach},
    ...(c.steps ?? []).map(step => ({title: step.title, body: step.body})),
  ],
  related: ['/programs'],
}));

export const opportunityEntries: Entry[] = [];
