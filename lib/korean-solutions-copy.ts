/**
 * Words and types for «حلول من كوريا» / Korean Solutions, shared by the server pages and the client finder.
 * No data access here, so the browser bundle stays small.
 */
export type Bi = {ar: string; en: string};
export type SolutionType = 'منتج' | 'حل' | 'تكنولوجيا';
export type Region = 'نعم' | 'تجربة' | 'لسه';
export type Route = 'شراء' | 'توزيع' | 'ترخيص' | 'مشروع مشترك';
export type Proof = {ar: string; en: string; url: string};
export type Solution = {
  slug: string; type: SolutionType; sector: string; order: number;
  title: Bi; maker: string; problem: Bi; solution: Bi; proof: Proof[];
  region: Region; where: Bi; opportunity: Bi; routes: Route[];
};

export const TYPES: SolutionType[] = ['منتج', 'حل', 'تكنولوجيا'];
export const REGIONS: Region[] = ['نعم', 'تجربة', 'لسه'];
export const ROUTES: Route[] = ['شراء', 'توزيع', 'ترخيص', 'مشروع مشترك'];

export const TYPE_COPY: Record<SolutionType, {one: Bi; many: Bi; key: string; line: Bi}> = {
  'منتج': {key: 'products', one: {ar: 'منتج', en: 'Product'}, many: {ar: 'منتجات', en: 'Products'}, line: {ar: 'أجهزة وأنظمة جاهزة، معتمدة ومجرّبة في كوريا، تصل وتعمل.', en: 'Ready devices and systems, approved and proven in Korea, that arrive and work.'}},
  'حل': {key: 'solutions', one: {ar: 'حل', en: 'Solution'}, many: {ar: 'حلول', en: 'Solutions'}, line: {ar: 'خدمات وأنظمة تُطبَّق داخل المؤسسة مع الشريك الكوري، لتحل مشكلة بعينها.', en: 'Services and systems put to work inside an organisation with the Korean partner, to solve one specific problem.'}},
  'تكنولوجيا': {key: 'technology', one: {ar: 'تكنولوجيا', en: 'Technology'}, many: {ar: 'تكنولوجيا', en: 'Technology'}, line: {ar: 'معرفة وتقنيات تُنقل وتُوطَّن، لتُصنع وتُطوَّر في المنطقة.', en: 'Know-how and technology transferred and localised, to be made and developed in the region.'}},
};

export const SECTOR_EN: Record<string, string> = {
  'الصحة': 'Health', 'الرعاية الاجتماعية': 'Social care', 'الأمن والمدن': 'Security & cities',
  'الزراعة والغذاء': 'Agriculture & food', 'الطاقة': 'Energy', 'التصنيع': 'Manufacturing',
};

export const REGION_COPY: Record<Region, {chip: Bi; lead: Bi}> = {
  'نعم': {chip: {ar: 'وصل المنطقة', en: 'In the region'}, lead: {ar: 'وصل المنطقة', en: 'In the region'}},
  'تجربة': {chip: {ar: 'تجربة في المنطقة', en: 'Pilot in the region'}, lead: {ar: 'تجربة في المنطقة', en: 'Pilot in the region'}},
  'لسه': {chip: {ar: 'لم يصل بعد', en: 'Not yet in the region'}, lead: {ar: 'لم يصل المنطقة بعد', en: 'Not yet in the region'}},
};

export const ROUTE_COPY: Record<Route, {name: Bi; line: Bi}> = {
  'شراء': {name: {ar: 'شراء', en: 'Purchase'}, line: {ar: 'المؤسسة تشتري وتشغّل', en: 'The organisation buys and runs it'}},
  'توزيع': {name: {ar: 'توزيع', en: 'Distribution'}, line: {ar: 'شريك محلي يوزّع ويدعم', en: 'A local partner distributes and supports'}},
  'ترخيص': {name: {ar: 'ترخيص', en: 'Licensing'}, line: {ar: 'التقنية تُرخَّص وتُشغَّل أو تُصنع محليًا', en: 'The technology is licensed and run or made locally'}},
  'مشروع مشترك': {name: {ar: 'مشروع مشترك', en: 'Joint venture'}, line: {ar: 'شركة مشتركة بين الطرف الكوري وشريك في المنطقة', en: 'A joint company between the Korean side and a regional partner'}},
};

/** The one line every Korean Solutions page carries (Dr. Ahmed's wording). */
export const NO_PARTNERSHIP: Bi = {
  ar: 'هذه حلول كورية نرصدها ونقترحها. وجودها هنا لا يعني شراكة بيننا وبين الشركة، إلا إذا ذكرنا ذلك.',
  en: 'These are Korean solutions we track and suggest. Being listed here does not mean we have a partnership with the company, unless we say so.',
};
