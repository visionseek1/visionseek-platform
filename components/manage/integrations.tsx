"use client";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import type { IntegrationSnapshot } from "@/lib/manage/integration-contract";
import styles from "./room.module.css";
const labels = { draft: "مسودة", open: "قيد المراجعة", merged: "مدمج في الكود", closed: "مغلق دون دمج", main: "تحديث main" };
const sections = { open: "الشغل الجاري في مساحات المشروع", closed: "آخر طلبات التغيير المغلقة", main: "آخر التحديثات في المصدر الرئيسي" };
const date = (value: string | null) => value ? new Date(value).toLocaleString("ar-EG") : "لم تُقرأ بعد";
export default function Integrations({ session }: { session: Session }) {
  const [data, setData] = useState<IntegrationSnapshot | null>(null);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    void fetch("/api/manage/integrations", {
      headers: { Authorization: `Bearer ${session.access_token}` },
      cache: "no-store", signal: controller.signal,
    }).then(async response => {
      if (!response.ok) throw new Error(response.status === 403 ? "صلاحية متابعة التكامل غير متاحة لهذا الحساب." : "تعذر تحديث متابعة التكامل. أعد المحاولة.");
      return response.json() as Promise<IntegrationSnapshot>;
    }).then(value => { if (active) { setData(value); setError(""); } })
      .catch(e => { if (active) { setData(null); setError(e.message); } });
    return () => { active = false; controller.abort(); };
  }, [session.access_token, refresh]);
  useEffect(() => {
    const refreshVisible = () => { if (!document.hidden) setRefresh(value => value + 1); };
    const timer = setInterval(refreshVisible, 300_000);
    document.addEventListener("visibilitychange", refreshVisible);
    return () => { clearInterval(timer); document.removeEventListener("visibilitychange", refreshVisible); };
  }, []);
  return <div className={styles.integration}>
    <section className={styles.panel}>
      <div className={styles.sectionTitle}><h2>مصدر واحد لمتابعة البناء</h2><button onClick={() => setRefresh(value => value + 1)}>تحديث التكامل</button></div>
      <p>تظهر طلبات التغيير من مساحات المشروع هنا تلقائيًا عند تسجيلها في GitHub. تتحدث القراءة كل خمس دقائق أثناء فتح الصفحة.</p>
      <p className={styles.hint}>الدمج في الكود لا يثبت النشر على الموقع أو اكتمال التشغيل. مخرجات محادثات GPT تُسلّم عبر سجل الوحدة؛ المحادثات نفسها غير متصلة تلقائيًا.</p>
      <a href="https://github.com/visionseek1/visionseek-platform/blob/feat/manage-room-20260927/docs/manage-room/WORKSPACE-INTEGRATION.md" target="_blank" rel="noopener noreferrer">تعليمات التسليم المشتركة لكل مساحة عمل ↗</a>
    </section>
    {error && <p role="alert" className={styles.error}>{error}</p>}
    {!data && !error && <p role="status">جاري قراءة تحديثات مساحات العمل…</p>}
    {data?.sources.map(source => <section className={styles.panel} key={source.key}>
      <div className={styles.sectionTitle}><h2>{sections[source.key]}</h2><small>آخر قراءة ناجحة: {date(source.checkedAt)}</small></div>
      {source.status !== "current" && <p role="status" className={styles.error}>{source.status === "stale" ? "تعذر الاتصال بالمصدر؛ المعروض آخر قراءة محفوظة وقد يكون تغيّر." : "المصدر غير متاح حاليًا. لا يمكن استنتاج عدم وجود شغل."}</p>}
      {source.status === "current" && !source.items.length && <p>لا توجد عناصر في هذه القراءة.</p>}
      <ul className={styles.integrationList}>{source.items.map(item => <li key={item.id}>
        <div><a href={item.url} target="_blank" rel="noopener noreferrer">{item.title} ↗</a><span className={styles.badge}>{labels[item.state]}</span></div>
        <p dir="ltr"><code>{item.branch}</code> · <code>{item.commit.slice(0, 8)}</code></p><small>{date(item.updatedAt)}</small>
      </li>)}</ul>
      {source.limited && <p className={styles.hint}>هذه أحدث قراءة محدودة؛ <a href={`https://github.com/visionseek1/visionseek-platform/${source.key === "main" ? "commits/main" : "pulls"}`} target="_blank" rel="noopener noreferrer">افتح السجل الكامل ↗</a></p>}
    </section>)}
    {!!data?.handovers.length && <section className={styles.panel}>
      <h2>سجلات التسليم في هذه النسخة</h2>
      <p className={styles.hint}>وصف مساحة العمل ومعايير قبولها؛ الأدلة والاعتماد يُراجعان بشكل مستقل.</p>
      <ul className={styles.integrationList}>{data.handovers.map(item => <li key={item.id}>
        <h3>{item.workspace}</h3><p>{item.summary}</p>
        <ul>{item.acceptance.map(line => <li key={line}>{line}</li>)}</ul>
        {item.remaining.length > 0 && <><strong>المتبقي</strong><ul>{item.remaining.map(line => <li key={line}>{line}</li>)}</ul></>}
        {item.evidence.map((url, index) => <a key={url} href={url} target="_blank" rel="noopener noreferrer">مرجع {index + 1} ↗ </a>)}
      </li>)}</ul>
    </section>}
  </div>;
}
