/** Allow media assets, HTTPS downloads and local object URLs, never executable URLs. */
export function safeMediaUrl(value: string | null | undefined, origin?: string): string | undefined {
  // URLs reaching media elements must not contain markup, controls or backslashes.
  // Non-ASCII names are represented by URL percent encoding.
  if (!value || !/^[a-zA-Z0-9/:._~!$&()*+,;=%?@#-]+$/.test(value)) return undefined;
  if (value.startsWith('/') && !value.startsWith('//')) return value;
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' && !url.username && !url.password) return value;
    if (url.protocol === 'blob:' && origin && url.origin === origin &&
        /^blob:https?:\/\/[^/]+\/[a-fA-F0-9-]+$/.test(value)) return value;
  } catch { /* Invalid URLs are not renderable media. */ }
  return undefined;
}
