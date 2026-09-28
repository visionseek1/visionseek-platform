import {t,type Entry} from './schema';

// Ordered public catalogue. Add only real programs with approved content and an accurate stage.
// Supporting methodology guides live separately in guides.ts.
export const programEntries:Entry[]=[{
  section:'programs',slug:'hlo',code:'HLO',
  title:t('HLO — Highest Level One','HLO — Highest Level One'),
  summary:t('Connect your institution’s ambition with global capabilities. Reveal the opportunities that matter, test their value and define a path to application.','نصل طموح مؤسستك بما وصل إليه العالم. نكشف الفرص المناسبة لها، ونختبر قيمتها، ونحدد معها طريق التطبيق.'),
  category:t('Institutional development','تطوير المؤسسات'),
  status:t('In development · preparing the first pilot','قيد التطوير · إعداد التجربة الأولى'),
  image:'chips',
  facts:[{label:t('For','لمن؟'),value:t('Institutions and governments','المؤسسات والحكومات')}],
  blocks:[],related:['/programs/program-lifecycle','/about/what-we-do'],
}];
