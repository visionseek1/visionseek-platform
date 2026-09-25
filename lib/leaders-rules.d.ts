declare module "./leaders-rules.mjs" {
  export const approvedHosts: Set<string>;
  export const weeklySlug: string;
  export const weeklyPublishedAt: string;
  export const learnSlug: string;
  export const learnPublishedAt: string;
  export const physicalSlug: string;
  export const physicalPublishedAt: string;
  export const physicalFieldId: string;
  export function safeSourceUrl(value: unknown): string | null;
  export function primaryField(categoryEn: string): string | null;
  export function hashSlug(slug: string): number;
  export function byNewest(a: { publishedAt: string; slug: string }, b: { publishedAt: string; slug: string }): number;
  export function orderedCoverRows(items: readonly unknown[]): {
    slug: string;
    publishedAt: string;
    fieldId: string | null;
    image: string;
    imageAlt: string;
  }[];
}
