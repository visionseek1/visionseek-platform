import { z } from "zod";
export const taskStates = [
  "queued",
  "in_progress",
  "blocked",
  "submitted",
  "accepted",
  "cancelled",
] as const;
export type TaskState = (typeof taskStates)[number];
export const stateLabels: Record<TaskState, string> = {
  queued: "في الانتظار",
  in_progress: "قيد التنفيذ",
  blocked: "متوقفة",
  submitted: "بانتظار الاعتماد",
  accepted: "معتمدة",
  cancelled: "ملغاة",
};
const httpsUrl = z
  .string()
  .url()
  .max(2000)
  .refine((v) => {
    const u = new URL(v);
    return u.protocol === "https:" && !u.username && !u.password;
  });
const path = z.string().regex(/^\/(?!\/)[a-zA-Z0-9/_-]*$/);
export const manifestSchema = z
  .object({
    schemaVersion: z.literal(1),
    moduleId: z.string().regex(/^[a-z][a-z0-9-]{1,50}$/),
    nameAr: z.string().min(1),
    nameEn: z.string().min(1),
    description: z.string().min(1),
    icon: z.enum(["newspaper", "chart", "compass", "graduation"]),
    sortOrder: z.number().int(),
    publicRoutes: z.array(path),
    adminEntryPoint: path.nullable(),
    owner: z.string(),
    codeRef: z.string(),
    docsUrl: httpsUrl.nullable(),
    readiness: z.enum([
      "planned",
      "development",
      "review",
      "operational",
      "paused",
    ]),
    capabilities: z
      .array(
        z.object({
          action: z.string(),
          enabled: z.boolean(),
          disabledReason: z.string().nullable(),
        }),
      )
      .superRefine((items, ctx) => {
        for (const i of items)
          if (!i.enabled && !i.disabledReason)
            ctx.addIssue({
              code: "custom",
              message: "Disabled action requires reason",
            });
      }),
    permissions: z.array(
      z.enum([
        "read",
        "createDraft",
        "editDraft",
        "review",
        "publish",
        "archive",
        "manageSettings",
      ]),
    ),
    agentTools: z.array(z.never()),
    editorAvailable: z.boolean(),
    healthEvidence: z.object({
      check: z.string(),
      checkedAt: z.string().datetime().nullable(),
      result: z.enum(["passed", "failed", "unknown"]),
      evidence: z.string().nullable(),
    }),
    migrations: z.array(z.string()),
    dependencies: z.array(z.string()),
    rollbackNotes: z.string(),
    acceptanceEvidence: z.array(z.string()),
  })
  .strict()
  .superRefine((m, ctx) => {
    if (m.editorAvailable && !m.adminEntryPoint)
      ctx.addIssue({
        code: "custom",
        message: "Available editor requires entry point",
      });
  });
export type ModuleManifest = z.infer<typeof manifestSchema>;
const uuid = z.string().uuid();
const fields = {
  title: z.string().trim().min(1).max(180),
  goal: z.string().trim().min(1).max(4000),
  inputs: z.string().max(6000),
  acceptance: z.string().trim().min(1).max(4000),
  executorId: uuid,
  approverId: uuid,
  dueAt: z.string().datetime({ offset: true }).nullable(),
};
export const commandSchema = z
  .discriminatedUnion("type", [
    z
      .object({
        type: z.literal("createTask"),
        moduleId: z.string().regex(/^[a-z][a-z0-9-]{1,50}$/),
        ...fields,
      })
      .strict(),
    z
      .object({
        type: z.literal("editTask"),
        taskId: uuid,
        revision: z.number().int().positive(),
        ...fields,
      })
      .strict(),
    z
      .object({
        type: z.literal("setState"),
        taskId: uuid,
        revision: z.number().int().positive(),
        state: z.enum(["queued", "in_progress", "blocked", "cancelled"]),
        note: z.string().trim().min(1).max(2000),
      })
      .strict(),
    z
      .object({
        type: z.literal("submitDeliverable"),
        taskId: uuid,
        revision: z.number().int().positive(),
        summary: z.string().trim().min(1).max(6000),
        version: z.string().trim().min(1).max(160),
        evidence: z.array(httpsUrl).min(1).max(12),
        branch: z.string().trim().min(1).max(200).nullable(),
        commit: z
          .string()
          .regex(/^[a-f0-9]{40}$/i)
          .nullable(),
        workspace: z.string().trim().min(1).max(200),
      })
      .strict(),
    z
      .object({
        type: z.literal("review"),
        taskId: uuid,
        revision: z.number().int().positive(),
        deliverableId: uuid,
        decision: z.enum(["accepted", "changes_requested"]),
        note: z.string().trim().min(1).max(2000),
      })
      .strict(),
  ])
  .superRefine((v, ctx) => {
    if (v.type === "submitDeliverable" && !!v.branch !== !!v.commit)
      ctx.addIssue({
        code: "custom",
        message: "Code requires both branch and full commit",
      });
  });
export type Command = z.infer<typeof commandSchema>;
export type Principal = {
  id: string;
  display_name: string;
  kind: "founder" | "human" | "agent";
  enabled: boolean;
};
export type Grant = {
  principal_id: string;
  module_id: string;
  actions: string[];
};
export type Task = {
  id: string;
  module_id: string;
  title: string;
  goal: string;
  inputs: string;
  acceptance: string;
  executor_id: string;
  approver_id: string;
  due_at: string | null;
  state: TaskState;
  revision: number;
  current_deliverable_id: string | null;
  updated_at: string;
};
export type Deliverable = {
  id: string;
  task_id: string;
  module_id: string;
  submitted_by: string;
  summary: string;
  version: string;
  evidence: string[];
  branch: string | null;
  commit: string | null;
  workspace: string;
  created_at: string;
  task_revision: number;
};
export type Review = {
  id: string;
  task_id: string;
  deliverable_id: string;
  reviewer_id: string;
  decision: "accepted" | "changes_requested";
  note: string;
  created_at: string;
};
export type Activity = {
  id: string;
  module_id: string;
  actor_id: string;
  task_id: string;
  operation: string;
  note: string | null;
  revision: number;
  created_at: string;
  result: string;
};
export type Snapshot = {
  principal: Principal;
  principals: Principal[];
  grants: Grant[];
  tasks: Task[];
  deliverables: Deliverable[];
  reviews: Review[];
  activity: Activity[];
  modules: ModuleManifest[];
  activityLimited: boolean;
};
