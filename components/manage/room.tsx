"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  ArrowUpLeft,
  Check,
  CheckCheck,
  Compass,
  FileChartColumn,
  GraduationCap,
  LayoutGrid,
  ListTodo,
  LockKeyhole,
  LogOut,
  Newspaper,
  Plus,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  stateLabels,
  type Command,
  type ModuleManifest,
  type Task,
  type Deliverable,
} from "@/lib/manage/contracts";
import { useRoom } from "./use-room";
import styles from "./room.module.css";
export type View =
  | "overview"
  | "modules"
  | "tasks"
  | "approvals"
  | "activity"
  | "agents";
const nav = [
  { id: "overview", name: "نظرة عامة", icon: LayoutGrid },
  { id: "modules", name: "الوحدات", icon: Compass },
  { id: "tasks", name: "المهام والتسليمات", icon: ListTodo },
  { id: "approvals", name: "الاعتمادات", icon: CheckCheck },
  { id: "activity", name: "سجل النشاط", icon: Workflow },
  { id: "agents", name: "الفريق والوكلاء", icon: Sparkles },
] as const;
const icons = {
  newspaper: Newspaper,
  chart: FileChartColumn,
  compass: Compass,
  graduation: GraduationCap,
};
const readiness = {
  planned: "مخطط",
  development: "قيد البناء",
  review: "بانتظار تحقق التشغيل",
  operational: "تشغيل متحقق",
  paused: "متوقف",
};
const errors: Record<string, string> = {
  SIGN_IN_REQUIRED: "سجّل دخولك بحساب VisionSeek للمتابعة.",
  DATABASE_NOT_CONFIGURED: "اتصال الغرفة غير مهيأ في هذه البيئة بعد.",
  ROOM_NOT_INSTALLED:
    "قاعدة الغرفة لم تُفعّل في هذه البيئة بعد. يلزم استكمال مراجعة التثبيت.",
  ACCESS_DENIED:
    "الحساب لا يملك صلاحية لهذه العملية. عضوية محرر المحتوى لا تمنح إدارة الغرفة.",
  DATABASE_UNAVAILABLE: "تعذر الوصول لبيانات الغرفة. حاول مجددًا.",
  REVISION_CONFLICT:
    "حُفظ تعديل أحدث من مساحة أخرى. بياناتك ما زالت في النموذج؛ قارنها بآخر نسخة قبل المتابعة.",
  STATE_CONFLICT: "حالة المهمة لا تسمح بهذه العملية. راجع آخر نسخة.",
  IDEMPOTENCY_CONFLICT: "معرّف الطلب مستخدم لمحتوى مختلف. أعد فتح المهمة.",
  INVALID_INPUT: "راجع الحقول المطلوبة وروابط الأدلة وإصدار المخرج.",
  ASSIGNMENT_INVALID:
    "اختر منفذًا نشطًا مصرحًا له بالوحدة، والمؤسس صاحب الاعتماد.",
  DELIVERABLE_MISMATCH: "التسليم المحدد ليس النسخة الحالية المطلوب اعتمادها.",
  MODULE_DISABLED: "الوحدة غير مفعلة للعمل بعد.",
  REQUEST_FAILED: "تعذر إكمال الطلب. حاول مجددًا.",
};
const ops: Record<string, string> = {
  createTask: "إنشاء مهمة",
  editTask: "تعديل التكليف",
  submitDeliverable: "تسليم نسخة",
  "review:accepted": "اعتماد تسليم",
  "review:changes_requested": "طلب تعديل",
  "state:queued": "إعادة المهمة للانتظار",
  "state:in_progress": "بدء التنفيذ",
  "state:blocked": "إيقاف المهمة",
  "state:cancelled": "إلغاء المهمة",
};
const date = (v: string | null) =>
  v
    ? new Intl.DateTimeFormat("ar-EG", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Seoul",
      }).format(new Date(v))
    : "دون موعد محدد";
const field = (f: FormData, k: string) => String(f.get(k) || "").trim();
function href(v: string) {
  try {
    const u = new URL(v);
    return u.protocol === "https:" && !u.username && !u.password
      ? v
      : undefined;
  } catch {
    return undefined;
  }
}
type Modal =
  | { type: "create" }
  | { type: "edit" | "detail" | "submit" | "review" | "state"; task: Task }
  | null;
export default function ManageRoom({ view }: { view: View }) {
  const room = useRoom();
  return <RoomView key={room.accountEpoch} view={view} room={room} />;
}
function RoomView({
  view,
  room,
}: {
  view: View;
  room: ReturnType<typeof useRoom>;
}) {
  const {
    data,
    session,
    checking,
    error,
    setError,
    notice,
    setNotice,
    busy,
    login,
    refresh,
    mutate,
    signOut,
  } = room;
  const [modal, setModal] = useState<Modal>(null),
    [formKey, setFormKey] = useState(0),
    [unit, setUnit] = useState("leaders"),
    [filter, setFilter] = useState("all"),
    [query, setQuery] = useState("");
  const can = (module: string, action: string) =>
    !!data &&
    (data.principal.kind === "founder" ||
      data.grants.some(
        (g) =>
          g.principal_id === data.principal.id &&
          g.module_id === module &&
          g.actions.includes(action),
      ));
  const person = (id: string) =>
    data?.principals.find((p) => p.id === id)?.display_name || "عضو غير متاح";
  const unitName = (id: string) =>
    data?.modules.find((m) => m.moduleId === id)?.nameAr || id;
  const canSubmit = (t: Task) =>
    !!data &&
    can(t.module_id, "submitDeliverable") &&
    (data.principal.kind === "founder" ||
      data.principal.id === t.executor_id) &&
    ["queued", "in_progress", "blocked"].includes(t.state);
  function open(next: Modal) {
    setModal(next);
    setError("");
    setNotice("");
    setFormKey((k) => k + 1);
    if (next?.type === "create")
      setUnit(
        data?.modules.find(
          (m) =>
            !["planned", "paused"].includes(m.readiness) &&
            can(m.moduleId, "createTask"),
        )?.moduleId || "",
      );
    if (next && "task" in next) setUnit(next.task.module_id);
  }
  async function save(command: Command) {
    if (await mutate(command)) setModal(null);
  }
  const selected = modal && "task" in modal ? modal.task : null,
    current = selected ? data?.tasks.find((t) => t.id === selected.id) : null,
    conflict = !!current && current.revision !== selected?.revision;
  const pending = data?.tasks.filter((t) => t.state === "submitted") || [],
    title = nav.find((n) => n.id === view)!.name;
  function taskForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!modal) return;
    const f = new FormData(event.currentTarget),
      due = field(f, "due");
    const values = {
      title: field(f, "title"),
      goal: field(f, "goal"),
      inputs: field(f, "inputs"),
      acceptance: field(f, "acceptance"),
      executorId: field(f, "executor"),
      approverId: field(f, "approver"),
      dueAt: due ? new Date(`${due}:00+09:00`).toISOString() : null,
    };
    if (modal.type === "create")
      void save({ type: "createTask", moduleId: unit, ...values });
    if (modal.type === "edit")
      void save({
        type: "editTask",
        taskId: modal.task.id,
        revision: modal.task.revision,
        ...values,
      });
  }
  function deliveryForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (modal?.type !== "submit") return;
    const f = new FormData(event.currentTarget);
    void save({
      type: "submitDeliverable",
      taskId: modal.task.id,
      revision: modal.task.revision,
      summary: field(f, "summary"),
      version: field(f, "version"),
      evidence: field(f, "evidence")
        .split("\n")
        .map((v) => v.trim())
        .filter(Boolean),
      workspace: field(f, "workspace"),
      branch: field(f, "branch") || null,
      commit: field(f, "commit") || null,
    });
  }
  function moduleCard(m: ModuleManifest) {
    const Icon = icons[m.icon],
      latest = data?.deliverables.find((d) => d.module_id === m.moduleId);
    return (
      <article key={m.moduleId} className={styles.module}>
        <div className={styles.cardTop}>
          <span className={styles.moduleIcon}>
            <Icon size={24} />
          </span>
          <span className={styles.badge}>{readiness[m.readiness]}</span>
        </div>
        <h3>{m.nameAr}</h3>
        <p>{m.description}</p>
        <div className={styles.moduleMeta}>
          <span>آخر تسليم</span>
          <strong>
            {latest
              ? `${latest.version} · ${date(latest.created_at)}`
              : "لا يوجد تسليم مسجل"}
          </strong>
        </div>
        <div className={styles.moduleFoot}>
          {m.editorAvailable && m.adminEntryPoint ? (
            <Link href={m.adminEntryPoint}>
              فتح المحرر <ArrowUpLeft size={17} />
            </Link>
          ) : (
            <span>المحرر تحت البناء</span>
          )}
          <small>
            التحقق:{" "}
            {m.healthEvidence.result === "unknown"
              ? "لم يُجرَ"
              : m.healthEvidence.result === "passed"
                ? "اجتاز"
                : "لم يجتز"}
          </small>
        </div>
      </article>
    );
  }
  function taskList(rows: Task[]) {
    return rows.length ? (
      <div className={styles.taskList}>
        {rows.map((t) => (
          <button
            key={t.id}
            className={styles.taskRow}
            onClick={() => open({ type: "detail", task: t })}
          >
            <span className={styles.taskMark}>
              {t.state === "accepted" ? (
                <Check size={20} />
              ) : t.state === "submitted" ? (
                <ShieldCheck size={20} />
              ) : (
                <ListTodo size={20} />
              )}
            </span>
            <span className={styles.taskText}>
              <strong>{t.title}</strong>
              <small>
                {unitName(t.module_id)} · {person(t.executor_id)}
              </small>
            </span>
            <span className={styles.taskDue}>{date(t.due_at)}</span>
            <span
              className={`${styles.badge} ${t.state === "submitted" ? styles.highlight : ""}`}
            >
              {stateLabels[t.state]}
            </span>
            <ArrowUpLeft size={17} />
          </button>
        ))}
      </div>
    ) : (
      <div className={styles.empty}>
        <ListTodo size={28} />
        <h3>
          {view === "approvals"
            ? "لا توجد تسليمات تنتظر الاعتماد"
            : "لا توجد مهام في هذا العرض"}
        </h3>
        <p>
          {view === "approvals"
            ? "التسليمات الجديدة تظهر هنا مع نسختها وأدلتها."
            : "ابدأ بتكليف واضح، ومنفذ، ومعيار قبول."}
        </p>
      </div>
    );
  }
  function deliverable(d: Deliverable) {
    return (
      <article key={d.id} className={styles.delivery}>
        <strong>
          {d.version}
          {selected?.current_deliverable_id === d.id ? " · النسخة الحالية" : ""}
        </strong>
        <p>{d.summary}</p>
        <small>
          {person(d.submitted_by)} · {d.workspace} · {date(d.created_at)}
        </small>
        {d.commit && (
          <p dir="ltr" className={styles.code}>
            {d.branch}
            <br />
            {d.commit}
          </p>
        )}
        <ul>
          {d.evidence.map((v, i) => (
            <li key={i}>
              <a href={href(v)} target="_blank" rel="noopener noreferrer">
                دليل {i + 1}
                <ArrowUpLeft size={14} />
              </a>
            </li>
          ))}
        </ul>
        {data?.reviews
          .filter((r) => r.deliverable_id === d.id)
          .map((r) => (
            <p key={r.id} className={styles.reviewNote}>
              {r.decision === "accepted" ? "اعتماد" : "طلب تعديل"}: {r.note} ·{" "}
              {person(r.reviewer_id)}
            </p>
          ))}
      </article>
    );
  }
  if (checking)
    return (
      <main className={styles.gate} dir="rtl" lang="ar">
        <p role="status">جاري التحقق من الدخول…</p>
      </main>
    );
  if (!data)
    return (
      <main className={styles.gate} dir="rtl" lang="ar">
        <div className={styles.gateBrand}>
          <Image
            src="/visionseek-symbol-color.png"
            width={48}
            height={48}
            alt=""
          />
          <span>
            VISIONSEEK<small>غرفة الإدارة</small>
          </span>
        </div>
        <section className={styles.loginCard}>
          <LockKeyhole size={28} />
          <p className={styles.eyebrow}>مساحة عمل خاصة</p>
          <h1>
            من الرؤية
            <br />
            <em>إلى الخطوة التالية.</em>
          </h1>
          <p>مكان واحد لمتابعة الوحدات، تكليف العمل، ومراجعة ما تم إنجازه.</p>
          {!session ? (
            <form className={styles.form} onSubmit={login}>
              <label>
                البريد الإلكتروني
                <input
                  name="email"
                  type="email"
                  autoComplete="username"
                  defaultValue="abdelalim@visionseek.org"
                  required
                />
              </label>
              <label>
                كلمة المرور
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </label>
              <button
                className={styles.primary}
                disabled={busy || error === "DATABASE_NOT_CONFIGURED"}
              >
                {busy ? "جاري الدخول…" : "دخول إلى الغرفة"}
                <ArrowUpLeft size={18} />
              </button>
              <small>استخدم حساب VisionSeek الحالي.</small>
            </form>
          ) : (
            <div className={styles.actions}>
              <button
                className={styles.primary}
                onClick={refresh}
                disabled={busy}
              >
                إعادة التحقق <RefreshCw size={17} />
              </button>
              <button onClick={() => void signOut()}>تغيير الحساب</button>
            </div>
          )}
          {error && (
            <p className={styles.error} role="alert">
              {errors[error] || error}
            </p>
          )}
          {session && !error && (
            <p role="status">جاري التحقق من صلاحية الغرفة…</p>
          )}
        </section>
        <Link href="/ar" className={styles.back}>
          العودة إلى VisionSeek <ArrowUpLeft size={16} />
        </Link>
      </main>
    );
  return (
    <main className={styles.room} dir="rtl" lang="ar">
      <aside className={styles.sidebar}>
        <Link href="/manage" className={styles.brand}>
          <Image
            src="/visionseek-symbol-color.png"
            width={38}
            height={38}
            alt=""
          />
          <span>
            VISIONSEEK<small>غرفة الإدارة</small>
          </span>
        </Link>
        <p className={styles.navLabel}>مساحة العمل</p>
        <nav aria-label="أقسام غرفة الإدارة">
          {nav.map((n) => (
            <Link
              key={n.id}
              href={n.id === "overview" ? "/manage" : `/manage/${n.id}`}
              className={view === n.id ? styles.active : ""}
              aria-current={view === n.id ? "page" : undefined}
            >
              <n.icon size={19} />
              {n.name}
              {n.id === "approvals" && pending.length > 0 && (
                <span className={styles.count}>{pending.length}</span>
              )}
            </Link>
          ))}
        </nav>
        <div className={styles.sidebarBottom}>
          <div className={styles.manual}>
            <ShieldCheck size={18} />
            <span>
              الاعتماد بيد المؤسس<small>النشر من محرر كل وحدة</small>
            </span>
          </div>
          <Link href="/ar">
            عرض الموقع <ArrowUpLeft size={17} />
          </Link>
        </div>
      </aside>
      <section className={styles.workspace}>
        <header className={styles.topbar}>
          <span>
            <span className={styles.kicker}>VISIONSEEK / MANAGE</span>
            <strong>{title}</strong>
          </span>
          <div>
            <span className={styles.identity}>
              {data.principal.display_name}
              <small>
                {data.principal.kind === "founder" ? "المؤسس" : "عضو فريق"}
              </small>
            </span>
            <button
              aria-label="تحديث البيانات"
              onClick={refresh}
              disabled={busy}
            >
              <RefreshCw size={18} />
            </button>
            <button aria-label="تسجيل الخروج" onClick={() => void signOut()}>
              <LogOut size={18} />
            </button>
          </div>
        </header>
        <div className={styles.content}>
          {error && !modal && (
            <p role="alert" className={styles.error}>
              {errors[error] || error}
            </p>
          )}
          {notice && (
            <p className={styles.success} role="status">
              <Check size={17} />
              {notice}
            </p>
          )}
          <section className={styles.heading}>
            <div>
              <p className={styles.eyebrow}>
                {view === "overview"
                  ? "كل فرصة لها خطوة تالية"
                  : "غرفة الإدارة المشتركة"}
              </p>
              <h1>{view === "overview" ? "ما الذي يحتاج انتباهك؟" : title}</h1>
              <p>
                {view === "overview"
                  ? "راجع التسليمات، حرّك العمل، وافتح الوحدة التي تحتاجك."
                  : view === "approvals"
                    ? "راجع المخرج والأدلة قبل اعتماد هذه النسخة."
                    : view === "modules"
                      ? "لكل وحدة محررها وبياناتها. الغرفة تجمع متابعة العمل."
                      : view === "agents"
                        ? "هوية واضحة وصلاحيات محددة لكل مشارك."
                        : view === "activity"
                          ? "من نفّذ ماذا، وفي أي نسخة؟"
                          : "تكليفات واضحة ونسخ محفوظة من كل تسليم."}
              </p>
            </div>
            {["overview", "tasks"].includes(view) &&
              data.modules.some(
                (m) =>
                  !["planned", "paused"].includes(m.readiness) &&
                  can(m.moduleId, "createTask"),
              ) && (
                <button
                  className={styles.primary}
                  onClick={() => open({ type: "create" })}
                >
                  <Plus size={18} />
                  مهمة جديدة
                </button>
              )}
          </section>
          {view === "overview" && (
            <>
              <div className={styles.overviewGrid}>
                <section className={styles.focus}>
                  <span className={styles.eyebrow}>بانتظار قرارك</span>
                  <div className={styles.focusNumber}>
                    {pending.length.toLocaleString("ar-EG")}
                    <ShieldCheck size={32} />
                  </div>
                  <h2>
                    {pending.length
                      ? "تسليمات تحتاج مراجعة"
                      : "لا توجد اعتمادات معلّقة"}
                  </h2>
                  <p>
                    {pending.length
                      ? "كل قرار مرتبط بنسخة محددة ودليل قابل للمراجعة."
                      : "عندما تصل نسخة جديدة، ستجدها هنا."}
                  </p>
                  <Link href="/manage/approvals">
                    مراجعة الاعتمادات <ArrowUpLeft size={18} />
                  </Link>
                </section>
                <section className={styles.panel}>
                  <div className={styles.sectionTitle}>
                    <h2>العمل الجاري</h2>
                    <Link href="/manage/tasks">
                      كل المهام <ArrowUpLeft size={16} />
                    </Link>
                  </div>
                  {taskList(
                    data.tasks
                      .filter(
                        (t) => !["accepted", "cancelled"].includes(t.state),
                      )
                      .slice(0, 4),
                  )}
                </section>
              </div>
              <div className={styles.sectionTitle}>
                <h2>وحدات VisionSeek</h2>
                <Link href="/manage/modules">
                  عرض الوحدات <ArrowUpLeft size={16} />
                </Link>
              </div>
              <div className={styles.modules}>
                {data.modules.map(moduleCard)}
              </div>
            </>
          )}
          {view === "modules" && (
            <>
              <div className={styles.modules}>
                {data.modules.map(moduleCard)}
              </div>
              <section className={styles.note}>
                <Compass size={22} />
                <div>
                  <h2>إضافة وحدة جديدة</h2>
                  <p>
                    تُسلّم الوحدة بعقد تسجيل، ومدخل إدارة، وصلاحيات، وأدلة قبول.
                    ظهورها هنا لا يمنحها صلاحيات ولا يشغّل وكلاءها.
                  </p>
                </div>
              </section>
            </>
          )}
          {view === "tasks" && (
            <>
              <div className={styles.filters}>
                <label>
                  بحث في المهام
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="عنوان المهمة أو هدفها"
                  />
                </label>
                <label>
                  الوحدة
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="all">كل الوحدات</option>
                    {data.modules.map((m) => (
                      <option key={m.moduleId} value={m.moduleId}>
                        {m.nameAr}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {taskList(
                data.tasks.filter(
                  (t) =>
                    (filter === "all" || t.module_id === filter) &&
                    `${t.title} ${t.goal}`.includes(query),
                ),
              )}
            </>
          )}
          {view === "approvals" && (
            <>
              {taskList(pending)}
              <p className={styles.hint}>
                اعتماد التسليم لا يدمج الكود ولا ينشر المحتوى.
              </p>
            </>
          )}
          {view === "activity" &&
            (data.activity.length ? (
              <>
                <ol className={styles.timeline}>
                  {data.activity.map((a) => (
                    <li key={a.id}>
                      <span className={styles.eventIcon}>
                        <Check size={17} />
                      </span>
                      <div>
                        <strong>{ops[a.operation] || "تحديث مهمة"}</strong>
                        <p>
                          {data.tasks.find((t) => t.id === a.task_id)?.title ||
                            "مهمة"}{" "}
                          · {unitName(a.module_id)}
                        </p>
                        <small>
                          {person(a.actor_id)} · مراجعة {a.revision}
                        </small>
                        {a.note && <p>{a.note}</p>}
                      </div>
                      <time>{date(a.created_at)}</time>
                    </li>
                  ))}
                </ol>
                {data.activityLimited && (
                  <p className={styles.hint}>
                    يُعرض آخر ٢٠٠ حدث. السجل الكامل محفوظ بقاعدة البيانات.
                  </p>
                )}
              </>
            ) : (
              <div className={styles.empty}>
                <Workflow size={30} />
                <h2>لم يُسجل نشاط بعد</h2>
                <p>تظهر هنا العمليات التي حُفظت بنجاح.</p>
              </div>
            ))}
          {view === "agents" && (
            <>
              <section className={styles.note}>
                <LockKeyhole size={23} />
                <div>
                  <h2>ربط الوكلاء مؤجل</h2>
                  <p>
                    لا يوجد اتصال MCP أو تشغيل تلقائي. التسليم اليدوي يسجل
                    الحساب الذي أدخله، ومساحة العمل المذكورة كمصدر.
                  </p>
                </div>
              </section>
              <div className={styles.people}>
                {data.principals.map((p) => (
                  <article key={p.id} className={styles.person}>
                    <span className={styles.avatar}>
                      {p.display_name.slice(0, 1)}
                    </span>
                    <div>
                      <h3>{p.display_name}</h3>
                      <p>
                        {p.kind === "founder"
                          ? "المؤسس · اعتماد ومتابعة جميع الوحدات"
                          : p.kind === "agent"
                            ? "وكيل مسجل · غير متصل"
                            : "عضو فريق"}
                      </p>
                      <small>
                        {p.kind === "founder"
                          ? "صلاحية مؤسسية"
                          : data.grants
                              .filter((g) => g.principal_id === p.id)
                              .map((g) => unitName(g.module_id))
                              .join("، ") || "لم تُمنح صلاحيات وحدات"}
                      </small>
                    </div>
                    <span className={styles.badge}>
                      {p.enabled ? "حساب مفعّل" : "غير مفعّل"}
                    </span>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
        <footer className={styles.footer}>
          <span>VisionSeek · هندسة الفرص</span>
          <span>المواعيد بتوقيت كوريا</span>
        </footer>
      </section>
      <Dialog
        open={!!modal}
        onOpenChange={(v) => {
          if (!v && !busy) {
            setModal(null);
            setError("");
          }
        }}
      >
        <DialogContent className={styles.dialog} dir="rtl" lang="ar">
          <DialogTitle>
            {modal?.type === "create"
              ? "مهمة جديدة"
              : modal?.type === "edit"
                ? "تعديل التكليف"
                : modal?.type === "submit"
                  ? "تسليم نسخة جديدة"
                  : modal?.type === "review"
                    ? "مراجعة التسليم"
                    : modal?.type === "state"
                      ? "تحديث حالة المهمة"
                      : selected?.title || "تفاصيل المهمة"}
          </DialogTitle>
          <DialogDescription>
            {selected
              ? `${unitName(selected.module_id)} · مراجعة ${selected.revision}`
              : "حدّد النتيجة ومن ينفذها وكيف نتحقق منها."}
          </DialogDescription>
          {error && (
            <div role="alert" className={styles.error}>
              {errors[error] || error}
            </div>
          )}
          {conflict && current && (
            <div className={styles.conflict}>
              <h3>النسخة المحفوظة الأحدث · مراجعة {current.revision}</h3>
              <p>{current.title}</p>
              <p>{current.goal}</p>
              <p>معيار القبول: {current.acceptance}</p>
              <p>
                الحالة: {stateLabels[current.state]} · المنفذ:{" "}
                {person(current.executor_id)}
              </p>
              <button
                onClick={() => {
                  if (modal && "task" in modal) {
                    setModal({ ...modal, task: current });
                    setFormKey((k) => k + 1);
                    setError("");
                  }
                }}
              >
                استخدم النسخة الأحدث وابدأ التعديل منها
              </button>
            </div>
          )}
          {(modal?.type === "create" || modal?.type === "edit") && (
            <form key={formKey} className={styles.form} onSubmit={taskForm}>
              <fieldset disabled={busy}>
                <label>
                  الوحدة
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    disabled={modal.type === "edit"}
                  >
                    {data.modules
                      .filter(
                        (m) =>
                          !["planned", "paused"].includes(m.readiness) &&
                          can(
                            m.moduleId,
                            modal.type === "edit" ? "editTask" : "createTask",
                          ),
                      )
                      .map((m) => (
                        <option key={m.moduleId} value={m.moduleId}>
                          {m.nameAr}
                        </option>
                      ))}
                  </select>
                </label>
                <label>
                  عنوان المهمة
                  <input
                    name="title"
                    defaultValue={selected?.title}
                    maxLength={180}
                    required
                  />
                </label>
                <label>
                  النتيجة المطلوبة
                  <textarea
                    name="goal"
                    defaultValue={selected?.goal}
                    maxLength={4000}
                    required
                    rows={3}
                  />
                </label>
                <label>
                  المدخلات والمراجع
                  <textarea
                    name="inputs"
                    defaultValue={selected?.inputs}
                    maxLength={6000}
                    rows={2}
                  />
                </label>
                <label>
                  معيار القبول
                  <textarea
                    name="acceptance"
                    defaultValue={selected?.acceptance}
                    maxLength={4000}
                    required
                    rows={2}
                  />
                </label>
                <div className={styles.formGrid}>
                  <label>
                    المنفذ
                    <select
                      name="executor"
                      defaultValue={selected?.executor_id || data.principal.id}
                      required
                    >
                      {data.principals
                        .filter(
                          (p) =>
                            p.enabled &&
                            p.kind !== "agent" &&
                            (p.kind === "founder" ||
                              data.grants.some(
                                (g) =>
                                  g.principal_id === p.id &&
                                  g.module_id === unit &&
                                  g.actions.includes("submitDeliverable"),
                              )),
                        )
                        .map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.display_name}
                          </option>
                        ))}
                    </select>
                  </label>
                  <label>
                    صاحب الاعتماد
                    <select
                      name="approver"
                      defaultValue={selected?.approver_id}
                      required
                    >
                      {data.principals
                        .filter((p) => p.kind === "founder" && p.enabled)
                        .map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.display_name}
                          </option>
                        ))}
                    </select>
                  </label>
                </div>
                <label>
                  الموعد بتوقيت كوريا (اختياري)
                  <input
                    name="due"
                    type="datetime-local"
                    defaultValue={
                      selected?.due_at
                        ? new Date(
                            new Date(selected.due_at).getTime() + 9 * 3600000,
                          )
                            .toISOString()
                            .slice(0, 16)
                        : ""
                    }
                  />
                </label>
                <button className={styles.primary} disabled={busy || conflict}>
                  حفظ التكليف <Check size={17} />
                </button>
              </fieldset>
            </form>
          )}
          {modal?.type === "detail" && selected && (
            <div className={styles.details}>
              <span className={styles.badge}>
                {stateLabels[selected.state]}
              </span>
              <h3>النتيجة المطلوبة</h3>
              <p>{selected.goal}</p>
              <h3>المدخلات</h3>
              <p>{selected.inputs || "لم تُضف مدخلات."}</p>
              <h3>معيار القبول</h3>
              <p>{selected.acceptance}</p>
              <p>
                المنفذ: {person(selected.executor_id)} · الاعتماد:{" "}
                {person(selected.approver_id)}
              </p>
              <p>{date(selected.due_at)}</p>
              <div className={styles.actions}>
                {canSubmit(selected) && (
                  <button
                    className={styles.primary}
                    onClick={() => open({ type: "submit", task: selected })}
                  >
                    تسليم مخرج <ArrowUpLeft size={17} />
                  </button>
                )}
                {selected.state === "submitted" &&
                  selected.approver_id === data.principal.id &&
                  data.principal.kind === "founder" && (
                    <button
                      className={styles.primary}
                      onClick={() => open({ type: "review", task: selected })}
                    >
                      مراجعة واعتماد <ShieldCheck size={17} />
                    </button>
                  )}
                {can(selected.module_id, "editTask") &&
                  ["queued", "in_progress", "blocked"].includes(
                    selected.state,
                  ) && (
                    <button
                      onClick={() => open({ type: "edit", task: selected })}
                    >
                      تعديل التكليف
                    </button>
                  )}
                {can(selected.module_id, "editTask") &&
                  selected.state !== "cancelled" &&
                  (data.principal.kind === "founder" ||
                    data.principal.id === selected.executor_id) && (
                    <button
                      onClick={() => open({ type: "state", task: selected })}
                    >
                      تحديث الحالة
                    </button>
                  )}
              </div>
              <h3>نسخ التسليم</h3>
              {data.deliverables
                .filter((d) => d.task_id === selected.id)
                .map(deliverable)}
              {!data.deliverables.some((d) => d.task_id === selected.id) && (
                <p>لم يُسلّم مخرج بعد.</p>
              )}
            </div>
          )}
          {modal?.type === "submit" && (
            <form key={formKey} className={styles.form} onSubmit={deliveryForm}>
              <fieldset disabled={busy}>
                <label>
                  ما الذي تم تسليمه؟
                  <textarea name="summary" rows={4} maxLength={6000} required />
                </label>
                <div className={styles.formGrid}>
                  <label>
                    إصدار المخرج
                    <input
                      name="version"
                      maxLength={160}
                      placeholder="مثال: v1.0"
                      required
                    />
                  </label>
                  <label>
                    مساحة العمل المصدر
                    <input
                      name="workspace"
                      maxLength={200}
                      placeholder="اسم المساحة التي أنجزت العمل"
                      required
                    />
                  </label>
                </div>
                <label>
                  روابط الأدلة — رابط https في كل سطر
                  <textarea name="evidence" dir="ltr" rows={3} required />
                </label>
                <details>
                  <summary>لو المخرج كود</summary>
                  <label>
                    اسم الفرع
                    <input name="branch" maxLength={200} dir="ltr" />
                  </label>
                  <label>
                    بصمة commit كاملة
                    <input name="commit" pattern="[a-fA-F0-9]{40}" dir="ltr" />
                  </label>
                </details>
                <p className={styles.hint}>
                  اسم مساحة العمل بيان يدوي. هوية المسلّم المسجلة هي حسابك
                  الحالي.
                </p>
                <button className={styles.primary} disabled={busy || conflict}>
                  إرسال للمراجعة <ArrowUpLeft size={17} />
                </button>
              </fieldset>
            </form>
          )}
          {modal?.type === "review" && selected && (
            <div className={styles.details}>
              {data.deliverables
                .filter((d) => d.id === selected.current_deliverable_id)
                .map(deliverable)}
              <h3>معيار القبول</h3>
              <p>{selected.acceptance}</p>
              <form
                className={styles.form}
                onSubmit={(e) => {
                  e.preventDefault();
                  const f = new FormData(e.currentTarget);
                  void save({
                    type: "review",
                    taskId: selected.id,
                    revision: selected.revision,
                    deliverableId: selected.current_deliverable_id!,
                    decision: field(f, "decision") as
                      | "accepted"
                      | "changes_requested",
                    note: field(f, "note"),
                  });
                }}
              >
                <fieldset disabled={busy}>
                  <label>
                    القرار
                    <select name="decision">
                      <option value="changes_requested">طلب تعديل</option>
                      <option value="accepted">اعتماد هذه النسخة</option>
                    </select>
                  </label>
                  <label>
                    سبب القرار أو التعديل المطلوب
                    <textarea name="note" maxLength={2000} required rows={3} />
                  </label>
                  <p className={styles.hint}>
                    هذا القرار لا ينشر المحتوى ولا يدمج الفرع.
                  </p>
                  <button
                    className={styles.primary}
                    disabled={busy || conflict}
                  >
                    تسجيل القرار <CheckCheck size={17} />
                  </button>
                </fieldset>
              </form>
            </div>
          )}
          {modal?.type === "state" && selected && (
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget);
                void save({
                  type: "setState",
                  taskId: selected.id,
                  revision: selected.revision,
                  state: field(f, "state") as "queued",
                  note: field(f, "note"),
                });
              }}
            >
              <fieldset disabled={busy}>
                <label>
                  الحالة
                  <select name="state">
                    {(
                      ["queued", "in_progress", "blocked", "cancelled"] as const
                    )
                      .filter(
                        (s) =>
                          !["accepted", "submitted"].includes(selected.state) ||
                          ["queued", "cancelled"].includes(s),
                      )
                      .map((s) => (
                        <option key={s} value={s}>
                          {stateLabels[s]}
                        </option>
                      ))}
                  </select>
                </label>
                <label>
                  سبب التحديث
                  <textarea name="note" maxLength={2000} required rows={3} />
                </label>
                {["accepted", "submitted"].includes(selected.state) && (
                  <p className={styles.hint}>
                    إعادة الفتح تزيل الاعتماد الحالي كحالة تشغيلية، مع حفظ
                    القرار والنسخة في السجل.
                  </p>
                )}
                <button className={styles.primary} disabled={busy || conflict}>
                  حفظ الحالة
                </button>
              </fieldset>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
