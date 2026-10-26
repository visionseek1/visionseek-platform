export type NewsLocale = 'ar' | 'en';

export const newsCopy = {
  brandline: {ar: 'VisionSeek News', en: 'VisionSeek News'},
  title: {ar: 'أخبار', en: 'News'},
  intro: {
    ar: 'قراءة موجزة لما يحدث في التقنية والقدرة: ما الذي جرى، ولماذا يعني ذلك شيئًا للخليج والعالم العربي.',
    en: 'Short briefings on technology and capability: what happened, and why it matters to the Gulf and the Arab world.',
  },
  allTags: {ar: 'الكل', en: 'All'},
  sample: {ar: 'عيّنة تجريبية', en: 'Sample'},
  updated: {ar: 'محدَّث', en: 'Updated'},
  source: {ar: 'المصدر الأصلي', en: 'Original source'},
  sourceBox: {ar: 'المصدر', en: 'Source'},
  coverage: {ar: 'تغطية إضافية', en: 'Further coverage'},
  back: {ar: 'العودة إلى الأخبار', en: 'Back to News'},
  crumbsNews: {ar: 'أخبار', en: 'News'},
  crumbsHome: {ar: 'الرئيسية', en: 'Home'},
  more: {ar: 'المزيد', en: 'Load more'},
  byline: {ar: 'تحرير VisionSeek', en: 'Edited by VisionSeek'},
  opinion: {ar: 'رأي', en: 'Opinion'},
  related: {ar: 'أخبار ذات صلة', en: 'Related'},
  corrections: {ar: 'تصحيح', en: 'Correction'},
  emptyTitle: {ar: 'لا توجد أخبار في هذا الملف', en: 'No briefings in this file'},
  emptyBody: {
    ar: 'لم يُنشر في هذا القسم خبر مكتمل. العيّنات التجريبية لا تظهر على الموقع الحي.',
    en: 'No published briefing is live in this language. Sample items never appear on the production site.',
  },
  emptyEn: {
    ar: 'لا توجد مواد إنجليزية بعد. غرفة الأخبار بالعربية على /ar/news.',
    en: 'No English briefings yet. The Arabic newsroom is at /ar/news.',
  },
  emptyFilter: {
    ar: 'لا خبر في هذا الملف الآن.',
    en: 'Nothing in this file yet.',
  },
  enFallback: {
    ar: 'هذه المادة بالعربية. لم تُرفق لها صياغة إنجليزية.',
    en: 'This briefing is in Arabic. An English version has not been added.',
  },
  happened: {ar: 'ما الذي حدث', en: 'What happened'},
  why: {ar: 'لماذا يهم الخليج والعالم العربي', en: 'Why it matters to the Gulf and the Arab world'},
  reading: {ar: 'قراءة VisionSeek', en: 'VisionSeek reading'},
  watching: {ar: 'ما الذي نراقبه', en: 'What we are watching'},
  published: {ar: 'النشر', en: 'Published'},
  tag: {ar: 'المجال', en: 'Field'},
  sourceName: {ar: 'المصدر', en: 'Source'},
  topics: {ar: 'الملفات', en: 'Files'},
} as const;

export const t = (locale: NewsLocale, key: keyof typeof newsCopy): string => newsCopy[key][locale];

export function readingLabel(minutes: number, locale: NewsLocale): string {
  if (locale === 'en') return minutes === 1 ? '1 minute read' : `${minutes} minute read`;
  if (minutes === 1) return 'دقيقة قراءة';
  if (minutes === 2) return 'دقيقتا قراءة';
  if (minutes <= 10) return `${minutes} دقائق قراءة`;
  return `${minutes} دقيقة قراءة`;
}

export function newsCountLabel(count: number, locale: NewsLocale): string {
  if (locale === 'en') return count === 1 ? 'One briefing' : `${count} briefings`;
  if (count === 0) return 'لا توجد أخبار';
  if (count === 1) return 'خبر واحد';
  if (count === 2) return 'خبران';
  if (count <= 10) return `${count} أخبار`;
  return `${count} خبرًا`;
}
