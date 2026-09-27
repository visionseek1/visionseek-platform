"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import type { Command, Snapshot } from "@/lib/manage/contracts";
export function useRoom() {
  const client = useRef<SupabaseClient | null>(null),
    sequence = useRef(0),
    identity = useRef<string | null>(null),
    retry = useRef<{ body: string; key: string } | null>(null);
  const [session, setSession] = useState<Session | null>(null),
    [checking, setChecking] = useState(true),
    [data, setData] = useState<Snapshot | null>(null),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [busy, setBusy] = useState(false),
    [accountEpoch, setAccountEpoch] = useState(0);
  const load = useCallback(async (token: string) => {
    const current = ++sequence.current;
    const res = await fetch("/api/manage", {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const payload = await res.json();
    if (current !== sequence.current) return;
    if (!res.ok) {
      setData(null);
      throw new Error(payload.error || "REQUEST_FAILED");
    }
    setData(payload);
    setError("");
  }, []);
  useEffect(() => {
    let active = true;
    const invalidate = () => {
      ++sequence.current;
    };
    try {
      client.current = createSupabaseBrowserClient();
      const update = (next: Session | null) => {
        if (!active) return;
        invalidate();
        const id = next?.user.id || null;
        if (identity.current !== id) {
          setData(null);
          setError("");
          setAccountEpoch((n) => n + 1);
          retry.current = null;
        }
        identity.current = id;
        setSession(next);
        setChecking(false);
      };
      void client.current.auth
        .getSession()
        .then(({ data }) => update(data.session))
        .catch(() => {
          if (active) {
            setChecking(false);
            setError("DATABASE_UNAVAILABLE");
          }
        });
      const { data } = client.current.auth.onAuthStateChange((_event, next) =>
        update(next),
      );
      return () => {
        active = false;
        invalidate();
        data.subscription.unsubscribe();
      };
    } catch {
      queueMicrotask(() => {
        if (active) {
          setChecking(false);
          setError("DATABASE_NOT_CONFIGURED");
        }
      });
    }
    return () => {
      active = false;
      invalidate();
    };
  }, []);
  useEffect(() => {
    if (!session) return;
    let active = true;
    queueMicrotask(() => {
      if (active)
        void load(session.access_token).catch((e) => {
          if (active) setError(e.message);
        });
    });
    return () => {
      active = false;
    };
  }, [session, load]);
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      if (!client.current) throw new Error();
      const { error } = await client.current.auth.signInWithPassword({
        email: String(form.get("email") || "").trim(),
        password: String(form.get("password") || ""),
      });
      if (error) throw error;
    } catch {
      setError("تعذر تسجيل الدخول. راجع بيانات حسابك واتصالك.");
    } finally {
      setBusy(false);
    }
  }
  async function refresh() {
    if (!session) return;
    setBusy(true);
    setError("");
    try {
      await load(session.access_token);
    } catch (e) {
      setError(e instanceof Error ? e.message : "DATABASE_UNAVAILABLE");
    } finally {
      setBusy(false);
    }
  }
  async function mutate(command: Command) {
    if (!session) return false;
    setBusy(true);
    setError("");
    setNotice("");
    const body = JSON.stringify(command);
    if (retry.current?.body !== body)
      retry.current = { body, key: crypto.randomUUID() };
    try {
      const res = await fetch("/api/manage", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
          "Idempotency-Key": retry.current.key,
        },
        body,
      });
      const result = await res.json();
      if (!res.ok) {
        if (res.status === 409) await load(session.access_token);
        throw new Error(result.error || "REQUEST_FAILED");
      }
      retry.current = null;
      setNotice("تم الحفظ.");
      await load(session.access_token);
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "DATABASE_UNAVAILABLE");
      return false;
    } finally {
      setBusy(false);
    }
  }
  return {
    session,
    checking,
    data,
    error,
    setError,
    notice,
    setNotice,
    busy,
    login,
    refresh,
    mutate,
    accountEpoch,
    signOut: () => client.current?.auth.signOut(),
  };
}
