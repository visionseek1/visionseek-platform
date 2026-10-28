/**
 * Desktop header fitting. Secondary sections move into «المزيد» / More
 * before the row wraps or the gaps collapse. Every path stays in the result.
 */
export const HEADER_COLLAPSE_ORDER = [
  "/about",
  "/frameworks",
  "/observatory",
  "/executive-masterclass",
  "/standards",
  "/diagnostic",
  "/pillars",
] as const;

/** Safe first paint from 1024px up: the four longer labels leave the row until it is measured. */
export const HEADER_COLLAPSE_DEFAULT = [
  "/about",
  "/frameworks",
  "/observatory",
  "/executive-masterclass",
];

export function headerCollapseKey(paths: Iterable<string>): string {
  return [...paths].filter(Boolean).sort().join("|");
}

export const HEADER_COLLAPSE_DEFAULT_KEY = headerCollapseKey(HEADER_COLLAPSE_DEFAULT);

/**
 * Returns the paths that must leave the bar, or null when a width was not measured yet.
 * `moreWidth` is the «المزيد» control. It is reserved only once something is collapsed.
 */
export function chooseCollapsed(
  paths: readonly string[],
  widths: ReadonlyMap<string, number>,
  available: number,
  gap: number,
  moreWidth: number,
): Set<string> | null {
  if (available <= 0 || paths.some(path => !widths.has(path) || (widths.get(path) ?? 0) <= 0)) return null;
  const widthOf = (path: string) => widths.get(path) ?? 0;
  const collapsed = new Set<string>();
  const fits = () => {
    const visible = paths.filter(path => !collapsed.has(path));
    const count = visible.length + (collapsed.size > 0 ? 1 : 0);
    const gaps = Math.max(0, count - 1) * gap;
    const sum = visible.reduce((total, path) => total + widthOf(path), 0) + (collapsed.size > 0 ? moreWidth : 0);
    return sum + gaps <= available - 12;
  };
  if (fits()) return collapsed;
  for (const path of HEADER_COLLAPSE_ORDER) {
    if (!paths.includes(path) || collapsed.has(path)) continue;
    collapsed.add(path);
    if (fits()) return collapsed;
  }
  for (const path of paths) {
    if (collapsed.has(path)) continue;
    if (paths.filter(item => !collapsed.has(item)).length <= 1) break;
    collapsed.add(path);
    if (fits()) return collapsed;
  }
  return collapsed;
}
