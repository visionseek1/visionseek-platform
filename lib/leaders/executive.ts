import type {Locale, Topic} from './types';

// Product positioning; the separate editorial style methodology remains authoritative.
export const executivePositioning = {
 ar: {
  audience: 'للمديرين التنفيذيين والقادة وصنّاع القرار',
  headline: 'رؤية أوسع. قرار أوضح.',
  description: 'تحولات تستحق انتباهك، وفرص تستحق الدراسة، وأفكار تأخذها إلى فريقك.',
 },
 en: {
  audience: 'FOR EXECUTIVES, LEADERS & DECISION MAKERS',
  headline: 'See further. Decide with clarity.',
  description: 'Understand the shifts, examine opportunities, and bring new ideas to your team.',
 },
};

export const executiveDraftGuidance = 'Address CEOs, institutional leaders and decision makers. Connect the supplied evidence to an organizational decision, responsibility or capability. Identify who needs to act and a bounded next step when supported. Avoid generic consumer advice, invented urgency, unsupported savings or claims that adopting a technology guarantees success. Keep the language engaging and concrete rather than bureaucratic.';

const questions: Record<Topic, Record<Locale, string>> = {
 leadership: {ar:'ما القرار الذي يحتاج فريقك إلى وضوح أكبر بشأنه؟',en:'Which decision does your team need greater clarity on?'},
 ai: {ar:'أي عملية تستحق تجربة هذه التقنية، وبأي معيار ستقيس النتيجة؟',en:'Which process deserves a trial, and how would you measure its outcome?'},
 strategy: {ar:'أي افتراض في خطتك يحتاج إلى إعادة فحص؟',en:'Which assumption in your strategy needs another look?'},
 capabilities: {ar:'ما القدرة التي تحتاجها مؤسستك، وما الذي يمنعها من امتلاكها؟',en:'Which capability does your organization need, and what is stopping it?'},
 innovation: {ar:'ما أصغر تجربة تكشف إن كانت الفكرة تستحق موارد إضافية؟',en:'What is the smallest test that could justify further investment?'},
};
export function discussionQuestion(topic:Topic, locale:Locale){return questions[topic]?.[locale] || questions.leadership[locale];}

export type BriefSection = {kind:'context'|'evidence'|'implication'|'action'; label:string|null; text:string};
const labels = [
 {kind:'evidence' as const,pattern:/^(المرجع|المصدر|The reference|Source):\s*/i},
 {kind:'implication' as const,pattern:/^(ما يهم مؤسستك|لماذا يهم|Why it matters):\s*/i},
 {kind:'action' as const,pattern:/^(خطوة عملية|الخطوة التالية|Try this|Next step):\s*/i},
];
/** Only present sections explicitly supplied by the author. Never infer facts or rewrite claims. */
export function briefSections(body:string):BriefSection[]{
 return body.split(/\r?\n[\t ]*\r?\n/).filter(p=>p.trim()).map(text=>{
  for(const {kind,pattern} of labels){const match=text.match(pattern);if(match)return {kind,label:match[1],text:text.slice(match[0].length)};}
  return {kind:'context',label:null,text};
 });
}
export function briefSummary(body:string){const sections=briefSections(body);return (sections.find(s=>s.kind==='implication')||sections[0])?.text||'';}
