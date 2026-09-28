import { z } from "zod";
const id = z.string().regex(/^[a-z][a-z0-9-]{1,80}$/);
export const handoverSchema = z.object({
  schemaVersion: z.literal(1),
  id,
  moduleIds: z.array(id).min(1),
  workspace: z.string().trim().min(1).max(160),
  summary: z.string().trim().min(1).max(1600),
  changedPaths: z.array(z.string().regex(/^(app|components|lib|db|modules)\/[a-zA-Z0-9_./\[\]()-]*$/).refine(p => !p.includes(".."))).min(1),
  acceptance: z.array(z.string().trim().min(1).max(1200)).min(1),
  evidence: z.array(z.string().url().max(2000).refine(value => {
    const u = new URL(value);
    return u.protocol === "https:" && !u.username && !u.password;
  })),
  dependencies: z.array(z.string().max(500)),
  remaining: z.array(z.string().max(1200)),
}).strict();
export type Handover = z.infer<typeof handoverSchema>;
export type IntegrationItem = {
  id: string;
  title: string;
  url: string;
  state: "draft" | "open" | "merged" | "closed" | "main";
  branch: string;
  commit: string;
  updatedAt: string;
};
export type IntegrationSource = {
  key: "open" | "closed" | "main";
  items: IntegrationItem[];
  checkedAt: string | null;
  status: "current" | "stale" | "unavailable";
  limited: boolean;
};
export type IntegrationSnapshot = { sources: IntegrationSource[]; handovers: Handover[] };
