import {z} from 'zod';

/** ISO-8601 datetime with a numeric offset, e.g. 2026-10-26T09:00:00+04:00. */
export const isoOffset = z
  .string()
  .min(1)
  .refine(value => !Number.isNaN(Date.parse(value)) && /[+-]\d{2}:\d{2}$|Z$/i.test(value), {
    message: 'must be an ISO datetime with a timezone offset',
  });

const imageName = z
  .string()
  .min(1)
  .regex(/^[A-Za-z0-9][A-Za-z0-9._-]*\.(jpe?g|png|webp|avif|svg)$/i, {
    message: 'heroImage must be a filename in content/news/ (jpg, png, webp, avif, svg)',
  });

export const newsCorrectionSchema = z.object({
  at: isoOffset,
  text: z.string().min(1),
});

export const newsFrontmatterSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  dek: z.string().min(1),
  publishedAt: isoOffset,
  updatedAt: isoOffset.optional(),
  tag: z.string().min(1),
  sourceName: z.string().min(1),
  sourceUrl: z.string().url(),
  heroImage: imageName,
  heroAlt: z.string().min(1),
  imageCredit: z.string().min(1),
  readingMinutes: z.number().int().positive(),
  corrections: z.array(newsCorrectionSchema).optional().default([]),
  coverageName: z.string().min(1).optional(),
  coverageUrl: z.string().url().optional(),
  titleEn: z.string().min(1).optional(),
  dekEn: z.string().min(1).optional(),
  heroAltEn: z.string().min(1).optional(),
  tagEn: z.string().min(1).optional(),
  sourceNameEn: z.string().min(1).optional(),
  imageCreditEn: z.string().min(1).optional(),
});

export type NewsFrontmatter = z.infer<typeof newsFrontmatterSchema>;
export type NewsCorrection = z.infer<typeof newsCorrectionSchema>;

export const REQUIRED_NEWS_FIELDS = [
  'slug',
  'title',
  'dek',
  'publishedAt',
  'tag',
  'sourceName',
  'sourceUrl',
  'heroImage',
  'heroAlt',
  'imageCredit',
  'readingMinutes',
] as const;

export {NEWS_PAGE_SIZE, NEWS_TOPICS} from './topics';

export const NEWS_HEADINGS = {
  happened: {ar: 'ما الذي حدث', en: 'What happened'},
  why: {ar: 'لماذا يهم الخليج والعالم العربي', en: 'Why it matters to the Gulf and the Arab world'},
  reading: {ar: 'قراءة VisionSeek', en: 'VisionSeek reading'},
  watching: {ar: 'ما الذي نراقبه', en: 'What we are watching'},
} as const;
