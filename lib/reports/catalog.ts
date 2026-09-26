import { z } from 'zod';

// The published catalogue must contain only versioned, approved research.
export const reportSchema = z.object({
  id: z.string().min(1),
  title: z.object({ ar: z.string().min(1), en: z.string().min(1) }),
  version: z.string().min(1),
  publishedAt: z.string().datetime(),
  question: z.string().min(1),
  methodology: z.string().min(1),
  limitations: z.string().min(1),
  sources: z.array(z.object({ url: z.string().url(), accessedAt: z.string().datetime(), version: z.string().min(1), rights: z.string().min(1) })).min(1),
  evidencePackage: z.string().url(),
  reviewer: z.object({ name: z.string().min(1), reviewRecord: z.string().url() }),
  approval: z.object({ name: z.string().min(1), record: z.string().url() }),
  correctionHistory: z.array(z.object({ date: z.string().datetime(), reason: z.string().min(1) })),
});
export type ResearchReport = z.infer<typeof reportSchema>;
// No reviewed research has been supplied for this release. Never seed fictitious findings.
export const publishedReports: ResearchReport[] = z.array(reportSchema).parse([]);

export const references = [
  { name: 'OECD', url: 'https://www.oecd.org/en/data/methods.html', ar: 'جودة الإحصاءات وقابلية المقارنة', en: 'Statistical quality and comparability' },
  { name: 'World Bank · DIME', url: 'https://github.com/worldbank/dime-standards', ar: 'معايير البحث وإعادة إنتاج الحسابات', en: 'Research standards and computational reproducibility' },
];
export const toolkit = [
  { name: 'Jupyter', url: 'https://jupyter.org/', ar: 'دفاتر تجمع الشرح والكود ونتائج التحليل في سجل واحد.', en: 'Notebooks that connect narrative, code and analytical outputs.' },
  { name: 'DuckDB', url: 'https://duckdb.org/', ar: 'تحليل البيانات الجدولية باستخدام SQL وملفات قابلة للنقل.', en: 'Analytical SQL over portable tabular data files.' },
  { name: 'Quarto', url: 'https://quarto.org/', ar: 'إنتاج المخرجات العلمية من مصدر قابل لإعادة الاستخدام.', en: 'Scientific publishing from a reusable source document.' },
];
