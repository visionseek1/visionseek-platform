export type Locale = 'ar' | 'en';
export type PostKind = 'note' | 'image' | 'video' | 'story';
export type Topic = 'leadership' | 'ai' | 'strategy' | 'capabilities' | 'innovation';
export type LeaderPost = {
  id: string; title: string; title_en: string | null; body: string; body_en: string | null;
  kind: PostKind; topic: Topic; media_path: string | null; media_type: string | null;
  source_url: string | null; source_label: string | null;
  status: 'draft' | 'published' | 'archived'; featured: boolean; highlight: boolean;
  published_at: string | null; expires_at: string | null; created_at: string; author_id?: string;
  character_id?: string | null; sector_ids?: string[];
  cover_url?: string; media_url?: string; media_url_en?: string; poster_url?: string; poster_url_en?: string; caption_url?: string; caption_url_en?: string; seed?: boolean;
};
export const topics: {id: Topic; ar: string; en: string}[] = [
  {id:'leadership', ar:'القيادة', en:'Leadership'}, {id:'ai', ar:'الذكاء الاصطناعي', en:'AI'},
  {id:'strategy', ar:'الاستراتيجية', en:'Strategy'}, {id:'capabilities', ar:'بناء القدرات', en:'Capabilities'},
  {id:'innovation', ar:'الابتكار', en:'Innovation'},
];
export function postText(post: LeaderPost, locale: Locale) {
  return {title: locale === 'en' && post.title_en ? post.title_en : post.title,
    body: locale === 'en' && post.body_en ? post.body_en : post.body};
}
export function safeLink(value: string | null): string | undefined {
  if (!value) return undefined;
  if (value.startsWith('/') && !value.startsWith('//')) return value;
  try { const u = new URL(value); return u.protocol === 'https:' ? u.href : undefined; } catch { return undefined; }
}
export function isVisible(post: LeaderPost, now = Date.now()) {
  return post.status === 'published' && !!post.published_at && Date.parse(post.published_at) <= now &&
    (!post.expires_at || Date.parse(post.expires_at) > now);
}
export const MEDIA_BUCKET = 'leaders-media';
export const MAX_MEDIA_BYTES = 50 * 1024 * 1024;
export const MEDIA_TYPES = ['image/jpeg','image/png','image/webp','video/mp4','video/webm'];
