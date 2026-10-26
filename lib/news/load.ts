import {copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync} from 'node:fs';
import {basename, join} from 'node:path';
import {isPreviewBuild} from '@/lib/deploy';
import {parseFrontmatter, parseNewsBody, type NewsBody} from './parse';
import {newsFrontmatterSchema, REQUIRED_NEWS_FIELDS, type NewsFrontmatter} from './schema';

export const NEWS_DIR = join(process.cwd(), 'content/news');
export const NEWS_MEDIA_PATH = '/news-media';
export const NEWS_FALLBACK_IMAGE = `${NEWS_MEDIA_PATH}/fallback.svg`;

export type NewsItem = NewsFrontmatter & {
  body: NewsBody;
  file: string;
  imageExists: boolean;
  imageSrc: string;
  ogImageSrc: string;
  hasEnglish: boolean;
};

const PUBLIC_MEDIA = join(process.cwd(), 'public/news-media');
const IMAGE_FILE = /\.(jpe?g|png|webp|avif|svg)$/i;

const isNewsMarkdown = (name: string): boolean =>
  name.endsWith('.md') && name.toLowerCase() !== 'readme.md' && !name.startsWith('_');

const syncPublicImages = (): void => {
  if (!existsSync(NEWS_DIR)) return;
  try {
    mkdirSync(PUBLIC_MEDIA, {recursive: true});
    for (const name of readdirSync(NEWS_DIR)) {
      if (!IMAGE_FILE.test(name)) continue;
      copyFileSync(join(NEWS_DIR, name), join(PUBLIC_MEDIA, name));
    }
  } catch {
    // Preview/production runtimes may be read-only; the build already copied the files.
  }
};

const publicSrc = (file: string): string => `${NEWS_MEDIA_PATH}/${encodeURIComponent(file)}`;

const ogName = (heroImage: string): string => {
  const ext = heroImage.slice(heroImage.lastIndexOf('.'));
  return `${heroImage.slice(0, heroImage.lastIndexOf('.'))}.og${ext}`;
};

const resolveImage = (name: string): {exists: boolean; src: string} => {
  const file = basename(name);
  const exists = existsSync(join(NEWS_DIR, file));
  return {exists, src: publicSrc(file)};
};

const loadOne = (name: string): NewsItem => {
  const file = join(NEWS_DIR, name);
  const raw = readFileSync(file, 'utf8');
  const {data, body} = parseFrontmatter(raw, name);
  const missing = REQUIRED_NEWS_FIELDS.filter(field => data[field] === undefined || data[field] === '');
  if (missing.length) throw new Error(`${name}: missing frontmatter fields: ${missing.join(', ')}`);
  const parsed = newsFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    const issue = parsed.error.issues.map(item => `${item.path.join('.') || 'frontmatter'}: ${item.message}`).join('; ');
    throw new Error(`${name}: ${issue}`);
  }
  const fm = parsed.data;
  const hero = resolveImage(fm.heroImage);
  if (!hero.exists && !fm.sample) {
    throw new Error(`${name}: heroImage file content/news/${basename(fm.heroImage)} is required for published items`);
  }
  const ogFile = ogName(basename(fm.heroImage));
  const og = resolveImage(ogFile);
  return {
    ...fm,
    body: parseNewsBody(body, name),
    file: name,
    imageExists: hero.exists,
    imageSrc: hero.exists ? hero.src : NEWS_FALLBACK_IMAGE,
    ogImageSrc: og.exists ? og.src : hero.exists ? hero.src : NEWS_FALLBACK_IMAGE,
    hasEnglish: Boolean(fm.titleEn && fm.dekEn),
  };
};

const loadAll = (): NewsItem[] => {
  if (!existsSync(NEWS_DIR)) return [];
  const items = readdirSync(NEWS_DIR).filter(isNewsMarkdown).map(loadOne);
  const slugs = new Set<string>();
  for (const item of items) {
    if (slugs.has(item.slug)) throw new Error(`duplicate news slug: ${item.slug}`);
    slugs.add(item.slug);
  }
  return items.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : a.slug.localeCompare(b.slug)));
};

/** Every valid briefing, including samples. Throws at import if a file is incomplete. */
syncPublicImages();
export const allNewsItems: NewsItem[] = loadAll();

/** Samples render on Vercel previews and `next dev` only — never on production. */
export const includeSampleNews = (): boolean => isPreviewBuild();

export function visibleNews(): NewsItem[] {
  return includeSampleNews() ? allNewsItems : allNewsItems.filter(item => !item.sample);
}

export function listNews(locale: 'ar' | 'en' = 'ar'): NewsItem[] {
  const items = visibleNews();
  return locale === 'en' ? items.filter(item => item.hasEnglish) : items;
}

export function getNews(slug: string): NewsItem | undefined {
  return visibleNews().find(entry => entry.slug === slug);
}

/** Same tag first, then newest. Never includes the current item. */
export function relatedNews(item: NewsItem, limit = 3): NewsItem[] {
  const others = visibleNews().filter(entry => entry.slug !== item.slug);
  const same = others.filter(entry => entry.tag === item.tag);
  const rest = others.filter(entry => entry.tag !== item.tag);
  return [...same, ...rest].slice(0, limit);
}

export function displayTitle(item: NewsItem, locale: 'ar' | 'en'): string {
  return locale === 'en' && item.titleEn ? item.titleEn : item.title;
}

export function displayDek(item: NewsItem, locale: 'ar' | 'en'): string {
  return locale === 'en' && item.dekEn ? item.dekEn : item.dek;
}

export function displayTag(item: NewsItem, locale: 'ar' | 'en'): string {
  return locale === 'en' && item.tagEn ? item.tagEn : item.tag;
}

export function displayHeroAlt(item: NewsItem, locale: 'ar' | 'en'): string {
  return locale === 'en' && item.heroAltEn ? item.heroAltEn : item.heroAlt;
}

export function displayCredit(item: NewsItem, locale: 'ar' | 'en'): string {
  return locale === 'en' && item.imageCreditEn ? item.imageCreditEn : item.imageCredit;
}

export function hasPublishedNews(): boolean {
  return allNewsItems.some(item => !item.sample);
}
