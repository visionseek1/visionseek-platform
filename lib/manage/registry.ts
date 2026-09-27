import { manifestSchema, type ModuleManifest } from "./contracts";
const base = {
  schemaVersion: 1 as const,
  owner: "مساحة الوحدة — يلزم تثبيت المسؤول عند التسليم",
  docsUrl: null,
  agentTools: [],
  permissions: [
    "read",
    "createDraft",
    "editDraft",
    "review",
    "publish",
    "archive",
  ] as ModuleManifest["permissions"],
  healthEvidence: {
    check: "فتح المحرر وحفظ مخرج بحساب مصرح",
    checkedAt: null,
    result: "unknown" as const,
    evidence: null,
  },
  migrations: [],
  dependencies: [],
  rollbackNotes: "إلغاء التسجيل لا يحذف المحتوى. الاستعادة مسؤولية الوحدة.",
  acceptanceEvidence: [],
};
const pending = [
  {
    action: "read",
    enabled: false,
    disabledReason: "المحرر لم يندمج في هذا الإصدار بعد.",
  },
];
export function validateRegistry(values: unknown[]): ModuleManifest[] {
  const parsed = values.map((v) => manifestSchema.parse(v));
  if (new Set(parsed.map((v) => v.moduleId)).size !== parsed.length)
    throw new Error("DUPLICATE_MODULE");
  return parsed.sort((a, b) => a.sortOrder - b.sortOrder);
}
export const modules = validateRegistry([
  {
    ...base,
    moduleId: "leaders",
    nameAr: "بيت القادة",
    nameEn: "Leaders House",
    description: "المحتوى والمنشورات والشخصيات التحريرية.",
    icon: "newspaper",
    sortOrder: 10,
    publicRoutes: ["/ar/insights"],
    adminEntryPoint: "/ar/insights/studio",
    readiness: "review",
    editorAvailable: true,
    codeRef: "main @ 108c883",
    capabilities: [
      "read",
      "createDraft",
      "editDraft",
      "publish",
      "archive",
    ].map((action) => ({ action, enabled: true, disabledReason: null })),
    dependencies: ["صلاحيات leaders_editors مستقلة عن الغرفة"],
    acceptanceEvidence: ["كود المحرر موجود؛ الحفظ الحي عبر الغرفة غير متحقق."],
  },
  {
    ...base,
    moduleId: "reports",
    nameAr: "التقارير",
    nameEn: "Reports",
    description: "الأبحاث والتقارير ومراجعة الأدلة.",
    icon: "chart",
    sortOrder: 20,
    publicRoutes: ["/ar/reports", "/reports"],
    adminEntryPoint: "/ar/reports/studio",
    readiness: "review",
    editorAvailable: true,
    codeRef: "main @ 8feafd696046dece5fa7da3a69572efb4a3a8c81",
    capabilities: ["read", "createDraft", "editDraft", "archive"].map(
      (action) => ({ action, enabled: true, disabledReason: null }),
    ),
    dependencies: ["صلاحيات محرر التقارير مستقلة عن الغرفة"],
    acceptanceEvidence: ["كود المحرر مدمج؛ الحفظ الحي عبر الغرفة غير متحقق."],
  },
  {
    ...base,
    moduleId: "programs",
    nameAr: "البرامج",
    nameEn: "Programs",
    description: "تصميم البرامج ومتابعة تطوير الخدمة.",
    icon: "compass",
    sortOrder: 30,
    publicRoutes: ["/ar/programs"],
    adminEntryPoint: null,
    readiness: "development",
    editorAvailable: false,
    codeRef:
      "feat/ihsan-program-system @ dcaa5eb1b8a186a8b2c6280e21b6039300b2a4f6",
    capabilities: pending,
  },
  {
    ...base,
    moduleId: "training",
    nameAr: "التدريب",
    nameEn: "Training",
    description: "وحدة تجريبية لاختبار إضافة أقسام جديدة.",
    icon: "graduation",
    sortOrder: 40,
    publicRoutes: [],
    adminEntryPoint: null,
    readiness: "planned",
    editorAvailable: false,
    codeRef: "docs/manage-room/MODULE-CONTRACT.md",
    capabilities: [
      {
        action: "read",
        enabled: false,
        disabledReason: "لا توجد عمليات تشغيلية.",
      },
    ],
    permissions: ["read"],
  },
]);
