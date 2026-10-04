import type {LeaderPost, Topic} from './types';

// Reversible public editorial scope. Keep original records, identities and assets.
export const medicalCharacterId = 'medo';
export const medicalPostFilter = 'character_id.eq.medo';
export function isMedicalPost(post: Pick<LeaderPost, 'character_id' | 'sector_ids'>) {
  return post.character_id === medicalCharacterId || post.sector_ids?.includes(medicalCharacterId) === true;
}
export const medicalTopics: {id:Topic;ar:string;en:string;description:{ar:string;en:string}}[] = [
  {id:'capabilities',ar:'نقل التقنية',en:'Technology transfer',description:{ar:'من خبرة موجودة إلى قدرة تعمل محليًا.',en:'From existing expertise to a locally working capability.'}},
  {id:'strategy',ar:'التصنيع الدوائي',en:'Pharma manufacturing',description:{ar:'تقنيات الإنتاج وما تحتاجه لتعمل.',en:'Production technologies and what they need to work.'}},
  {id:'ai',ar:'الذكاء الاصطناعي في الدواء',en:'AI in pharma',description:{ar:'البحث والتطوير وحدود الدليل.',en:'Research, development and the limits of the evidence.'}},
  {id:'leadership',ar:'الجودة والكفاءات',en:'Quality & skills',description:{ar:'المعرفة والفرق التي تحمل القدرة.',en:'The knowledge and teams behind the capability.'}},
  {id:'innovation',ar:'من البحث إلى التطبيق',en:'Research to practice',description:{ar:'ما الذي يقرّب الاكتشاف من الاستخدام؟',en:'What brings a discovery closer to use?'}},
];
