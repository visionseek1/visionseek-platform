"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import styles from "./room.module.css";

const AHMED_EMAIL = "abdelalim@visionseek.org";

type Institution = {
  id: string;
  name: string;
  current_department: string | null;
  status: string;
};

type Cycle = {
  id: string;
  institution_id: string;
  title: string;
  cycle_state: string;
  current_department: string;
};

export default function RoomPage() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [selected, setSelected] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [department, setDepartment] = useState("");
  const [context, setContext] = useState("");
  const [workTitle, setWorkTitle] = useState("");

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (!session) return;
    if (session.user.email?.toLowerCase() !== AHMED_EMAIL) {
      void supabase.auth.signOut();
      return;
    }

    async function loadRoom() {
      const [institutionResult, cycleResult] = await Promise.all([
        supabase
          .from("institutions")
          .select("id,name,current_department,status")
          .order("created_at", { ascending: false }),
        supabase
          .from("room_cycles")
          .select("id,institution_id,title,cycle_state,current_department")
          .order("created_at", { ascending: false }),
      ]);

      if (institutionResult.error || cycleResult.error) {
        setNotice(institutionResult.error?.message || cycleResult.error?.message || "تعذر تحميل الغرفة");
        return;
      }

      setInstitutions((institutionResult.data || []) as Institution[]);
      setCycles((cycleResult.data || []) as Cycle[]);
      setSelected((current) => current || institutionResult.data?.[0]?.id || "");
    }

    void loadRoom();
  }, [session, supabase]);

  async function login(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setNotice("");
    const { error } = await supabase.auth.signInWithPassword({ email: AHMED_EMAIL, password });
    setBusy(false);
    if (error) setNotice("بيانات الدخول غير صحيحة.");
  }

  async function addInstitution(event: FormEvent) {
    event.preventDefault();
    if (!institutionName.trim() || !department.trim()) return;
    setBusy(true);
    const { data, error } = await supabase
      .from("institutions")
      .insert({
        name: institutionName.trim(),
        current_department: department.trim(),
        market_context: context.trim() ? { note: context.trim() } : {},
      })
      .select("id,name,current_department,status")
      .single();
    setBusy(false);

    if (error) {
      setNotice(error.message);
      return;
    }

    setInstitutionName("");
    setContext("");
    setInstitutions((current) => [data as Institution, ...current]);
    setSelected(data.id);
    setNotice("اتسجلت المؤسسة.");
  }

  async function addWork(event: FormEvent) {
    event.preventDefault();
    if (!selected || !workTitle.trim() || !department.trim()) return;
    setBusy(true);
    const { data, error } = await supabase
      .from("room_cycles")
      .insert({
        institution_id: selected,
        title: workTitle.trim(),
        service_stage: "reality",
        cycle_state: "reality",
        current_department: department.trim(),
      })
      .select("id,institution_id,title,cycle_state,current_department")
      .single();
    setBusy(false);

    if (error) {
      setNotice(error.message);
      return;
    }

    setWorkTitle("");
    setCycles((current) => [data as Cycle, ...current]);
    setNotice("اتسجل الشغل وبدأ من الواقع.");
  }

  if (!session) {
    return (
      <main className={styles.shell} dir="rtl">
        <section className={styles.loginCard}>
          <Link className={styles.brand} href="/">VisionSeek</Link>
          <p className={styles.eyebrow}>VisionSeek Room</p>
          <h1>دخول أحمد</h1>
          <p className={styles.muted}>غرفة المؤسسة والفرص والعمل الجاري.</p>
          <form onSubmit={login}>
            <label>البريد</label>
            <input value={AHMED_EMAIL} disabled />
            <label>كلمة السر</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={8}
              required
              autoComplete="current-password"
            />
            <button disabled={busy}>{busy ? "لحظة…" : "دخول"}</button>
          </form>
          {notice && <p className={styles.notice}>{notice}</p>}
        </section>
      </main>
    );
  }

  const activeCycles = cycles.filter((cycle) => cycle.institution_id === selected);

  return (
    <main className={styles.room} dir="rtl">
      <header>
        <div>
          <Link className={styles.brand} href="/">VisionSeek</Link>
          <p className={styles.eyebrow}>VisionSeek Room</p>
          <h1>غرفة المؤسسة</h1>
        </div>
        <button className={styles.ghost} onClick={() => supabase.auth.signOut()}>خروج</button>
      </header>

      <section className={styles.flow} aria-label="مسار العمل">
        {["واقع", "أعمى", "خريطة", "قناعة ودفع", "شغل", "قفل وتعلّم"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <div className={styles.grid}>
        <section className={styles.panel}>
          <h2>المؤسسة</h2>
          <form onSubmit={addInstitution}>
            <label>اسم المؤسسة</label>
            <input value={institutionName} onChange={(event) => setInstitutionName(event.target.value)} required />
            <label>أين يبدأ العمل الآن؟</label>
            <input value={department} onChange={(event) => setDepartment(event.target.value)} placeholder="الإدارة أو الملف الحالي" required />
            <label>الواقع كما هو</label>
            <textarea value={context} onChange={(event) => setContext(event.target.value)} placeholder="ما الذي يحدث؟ وما الذي تريد المؤسسة الوصول إليه؟" />
            <button disabled={busy}>تسجيل المؤسسة</button>
          </form>
        </section>

        <section className={styles.panel}>
          <h2>المؤسسات المسجلة</h2>
          <div className={styles.list}>
            {institutions.length === 0 && <p className={styles.muted}>ابدأ بتسجيل أول مؤسسة.</p>}
            {institutions.map((institution) => (
              <button
                key={institution.id}
                className={`${styles.institution} ${selected === institution.id ? styles.active : ""}`}
                onClick={() => {
                  setSelected(institution.id);
                  setDepartment(institution.current_department || "");
                }}
              >
                <strong>{institution.name}</strong>
                <small>{institution.current_department || "لم يُحدد الملف"}</small>
              </button>
            ))}
          </div>
        </section>

        <section className={`${styles.panel} ${styles.wide}`}>
          <h2>شغل المؤسسة</h2>
          <form className={styles.workForm} onSubmit={addWork}>
            <input value={workTitle} onChange={(event) => setWorkTitle(event.target.value)} placeholder="ما الشغل أو الفرصة التي نبدأ بها؟" required />
            <button disabled={busy || !selected}>إضافة</button>
          </form>
          <div className={styles.workList}>
            {activeCycles.map((cycle) => (
              <article key={cycle.id}>
                <strong>{cycle.title}</strong>
                <span>{cycle.current_department}</span>
                <small>المرحلة: {cycle.cycle_state}</small>
              </article>
            ))}
          </div>
        </section>
      </div>
      {notice && <p className={styles.toast}>{notice}</p>}
    </main>
  );
}
