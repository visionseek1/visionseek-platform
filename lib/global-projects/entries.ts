export type GlobalProjectStage = 'preparing' | 'submitted' | 'selected' | 'commissioned';
type Copy = { ar: string; en: string };
export type GlobalProjectEntry = {
  id: string;
  organization: string;
  logo: { src: string; width: number; height: number; permission: 'pending' | 'approved' };
  stage: GlobalProjectStage;
  title: Copy;
  context: Copy;
  opportunity: Copy;
  officialUrl: string;
  checkedAt: string;
};

// Review-only candidate. Publication needs both mark permission and founder approval.
// Internal evidence and approval requirements are in docs/global-projects/BRIEF.md.
export const globalProjectEntries: GlobalProjectEntry[] = [{
  id: 'VS-F-14',
  organization: 'MIT Solve',
  logo: {
    src: 'https://info.solve.mit.edu/hs-fs/hubfs/MIT%20Solve%20Logo%20White-1.png?height=48&name=MIT+Solve+Logo+White-1.png&width=311',
    width: 311,
    height: 48,
    permission: 'pending',
  },
  stage: 'preparing',
  title: { ar: 'مشروع VisionSeek للاختراق المناخي', en: 'VisionSeek Climate Breakthrough Project' },
  opportunity: { ar: 'تحدي المناخ العالمي 2027', en: '2027 Global Climate Challenge' },
  context: {
    ar: 'نبحث عن مشكلة مناخية كبيرة وحل يمكن إثبات أثره، وندرس أهلية المشروع للتقديم إلى هذا التحدي. لم يُقدَّم طلب بعد، ولا توجد شراكة أو موافقة من الجهة.',
    en: 'We are researching a major climate problem and a solution with demonstrable impact, while assessing eligibility for this challenge. No application has been submitted; no partnership or endorsement is claimed.',
  },
  officialUrl: 'https://solve.mit.edu/challenges/2027-global-climate-challenge',
  checkedAt: '2026-09-29',
}];

export const stageLabels: Record<GlobalProjectStage, Copy> = {
  preparing: { ar: 'فرصة قيد التأهيل', en: 'Opportunity under evaluation' },
  submitted: { ar: 'تم تقديم الطلب', en: 'Application submitted' },
  selected: { ar: 'تم اختيار المشروع', en: 'Project selected' },
  commissioned: { ar: 'مشروع بتكليف', en: 'Commissioned project' },
};
