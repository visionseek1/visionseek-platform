/**
 * Header/footer visibility for «أخبار».
 * Inlined at build from next.config.ts so the client header matches the server HTML.
 * Preview/dev, or a production build that has at least one non-sample briefing, shows the item.
 * Production with only samples hides it — merging samples cannot publish an empty newsroom.
 */
export const showNewsNav = (): boolean => process.env.NEXT_PUBLIC_VS_SHOW_NEWS === '1';
