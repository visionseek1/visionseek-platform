import { z } from "zod";
import type { IntegrationItem, IntegrationSource } from "./integration-contract";

const repository = "visionseek1/visionseek-platform";
const web = `https://github.com/${repository}`;
const sha = z.string().regex(/^[a-f0-9]{40}$/i);
const timestamp = z.string().datetime({ offset: true });
const pullSchema = z.object({
  number: z.number().int().positive(), title: z.string().max(2000),
  state: z.enum(["open", "closed"]), draft: z.boolean().optional(),
  merged_at: timestamp.nullable(), updated_at: timestamp,
  head: z.object({ ref: z.string().max(300), sha }),
  base: z.object({ repo: z.object({ full_name: z.literal(repository) }) }),
});
const commitSchema = z.object({
  sha,
  commit: z.object({
    message: z.string().max(100000),
    committer: z.object({ date: timestamp }).nullable(),
    author: z.object({ date: timestamp }).nullable(),
  }),
});
const sources = [
  { key: "open", path: "pulls?state=open&sort=updated&direction=desc&per_page=50", limit: 50 },
  { key: "closed", path: "pulls?state=closed&sort=updated&direction=desc&per_page=20", limit: 20 },
  { key: "main", path: "commits?sha=main&per_page=20", limit: 20 },
] as const;
export function parseActivity(key: IntegrationSource["key"], input: unknown): IntegrationItem[] {
  if (key === "main") return z.array(commitSchema).max(20).parse(input).map(c => ({
    id: c.sha, title: c.commit.message.split("\n")[0].slice(0, 300),
    url: `${web}/commit/${c.sha}`, state: "main", branch: "main", commit: c.sha,
    updatedAt: c.commit.committer?.date || c.commit.author?.date || "",
  }));
  return z.array(pullSchema).max(key === "open" ? 50 : 20).parse(input).map(p => ({
    id: `pr-${p.number}`, title: p.title.slice(0, 300), url: `${web}/pull/${p.number}`,
    state: p.merged_at ? "merged" : p.state === "closed" ? "closed" : p.draft ? "draft" : "open",
    branch: p.head.ref, commit: p.head.sha, updatedAt: p.updated_at,
  }));
}

// This caches only public GitHub metadata. Caller identity is checked on every API request.
// No user bearer token or Supabase key is ever forwarded to GitHub.
export function createActivityReader(fetcher: typeof fetch = fetch, now = Date.now) {
  const cache = new Map<string, { result: IntegrationSource; nextRead: number }>();
  const pending = new Map<string, Promise<IntegrationSource>>();
  async function read(source: typeof sources[number]): Promise<IntegrationSource> {
    const previous = cache.get(source.key);
    if (previous && previous.nextRead > now()) return previous.result;
    const underway = pending.get(source.key);
    if (underway) return underway;
    const work = (async (): Promise<IntegrationSource> => {
      try {
        const res = await fetcher(`https://api.github.com/repos/${repository}/${source.path}`, {
          headers: { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
          cache: "no-store", redirect: "error", signal: AbortSignal.timeout(15000),
        });
        if (!res.ok || !res.body) throw new Error("SOURCE_UNAVAILABLE");
        const reader = res.body.getReader(), chunks: Uint8Array[] = [];
        let bytes = 0;
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          bytes += value.byteLength;
          if (bytes > 6_000_000) { await reader.cancel(); throw new Error("SOURCE_TOO_LARGE"); }
          chunks.push(value);
        }
        const input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
        const result: IntegrationSource = {
          key: source.key, items: parseActivity(source.key, input),
          checkedAt: new Date(now()).toISOString(), status: "current",
          limited: /rel="next"/.test(res.headers.get("link") || ""),
        };
        cache.set(source.key, { result, nextRead: now() + 300_000 });
        return result;
      } catch {
        const old = previous?.result;
        const recent = old?.checkedAt && now() - Date.parse(old.checkedAt) < 86_400_000;
        const result: IntegrationSource = recent ? { ...old, status: "stale" } : {
          key: source.key, items: [], checkedAt: null, status: "unavailable", limited: false,
        };
        cache.set(source.key, { result, nextRead: now() + 60_000 });
        return result;
      } finally { pending.delete(source.key); }
    })();
    pending.set(source.key, work);
    return work;
  }
  return () => Promise.all(sources.map(read));
}
export const readGithubActivity = createActivityReader();
