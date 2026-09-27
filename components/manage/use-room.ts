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
    mounted = useRef(false),
    sequence = useRef(0),
    generation = useRef(0),
    identity = useRef<string | null>(null),
    liveSession = useRef<Session | null>(null),
    operation = useRef<symbol | null>(null),
    retry = useRef<{ body: string; key: string } | null>(null);
  const [session, setSession] = useState<Session | null>(null),
    [checking, setChecking] = useState(true),
    [data, setData] = useState<Snapshot | null>(null),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [busy, setBusy] = useState(false),
    [accountEpoch, setAccountEpoch] = useState(0);
  const isCurrent = useCallback(
    (epoch: number, id: string | null) =>
      mounted.current &&
      generation.current === epoch &&
      identity.current === id,
    [],
  );
  const load = useCallback(
    async (target: Session, epoch: number) => {
      if (!isCurrent(epoch, target.user.id)) return false;
      const current = ++sequence.current;
      try {
        const res = await fetch("/api/manage", {
          headers: { Authorization: `Bearer ${target.access_token}` },
          cache: "no-store",
        });
        const payload = await res.json();
        if (current !== sequence.current || !isCurrent(epoch, target.user.id))
          return false;
        if (!res.ok) {
          setData(null);
          throw new Error(payload.error || "REQUEST_FAILED");
        }
        setData(payload);
        setError("");
        return true;
      } catch (e) {
        if (current !== sequence.current || !isCurrent(epoch, target.user.id))
          return false;
        throw e;
      }
    },
    [isCurrent],
  );
  useEffect(() => {
    let active = true,
      authEvents = 0;
    mounted.current = true;
    const invalidate = () => {
      ++sequence.current;
    };
    const retireAccount = () => {
      ++generation.current;
      operation.current = null;
      identity.current = null;
      liveSession.current = null;
      retry.current = null;
    };
    let unsubscribe: (() => void) | undefined;
    try {
      client.current = createSupabaseBrowserClient();
      const update = (next: Session | null) => {
        if (!active) return;
        invalidate();
        const id = next?.user.id || null;
        if (identity.current !== id) {
          ++generation.current;
          setData(null);
          setError("");
          setNotice("");
          setBusy(false);
          setAccountEpoch(generation.current);
          retry.current = null;
          operation.current = null;
        }
        identity.current = id;
        liveSession.current = next;
        setSession(next ? { ...next } : null);
        setChecking(false);
      };
      const { data } = client.current.auth.onAuthStateChange((_event, next) => {
        ++authEvents;
        update(next);
      });
      unsubscribe = () => data.subscription.unsubscribe();
      const startedAt = authEvents;
      void client.current.auth
        .getSession()
        .then(({ data, error }) => {
          if (!active || authEvents !== startedAt) return;
          if (error) throw error;
          update(data.session);
        })
        .catch(() => {
          if (active && authEvents === startedAt) {
            setChecking(false);
            setError("DATABASE_UNAVAILABLE");
          }
        });
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
      mounted.current = false;
      invalidate();
      retireAccount();
      unsubscribe?.();
    };
  }, []);
  useEffect(() => {
    if (!session) return;
    let active = true;
    const epoch = generation.current;
    queueMicrotask(() => {
      if (active)
        void load(session, epoch).catch((e) => {
          if (active && isCurrent(epoch, session.user.id)) setError(e.message);
        });
    });
    return () => {
      active = false;
    };
  }, [session, load, isCurrent]);
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (operation.current) return;
    const id = identity.current,
      epoch = generation.current,
      ticket = Symbol();
    operation.current = ticket;
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
      if (isCurrent(epoch, id))
        setError("تعذر تسجيل الدخول. راجع بيانات حسابك واتصالك.");
    } finally {
      if (operation.current === ticket) {
        operation.current = null;
        if (isCurrent(epoch, id)) setBusy(false);
      }
    }
  }
  async function refresh() {
    if (
      !session ||
      operation.current ||
      !isCurrent(accountEpoch, session.user.id)
    )
      return;
    const epoch = accountEpoch,
      id = session.user.id,
      ticket = Symbol();
    operation.current = ticket;
    setBusy(true);
    setError("");
    try {
      const fresh = await client.current?.auth.getSession();
      if (!isCurrent(epoch, id)) return;
      if (fresh?.error || fresh?.data.session?.user.id !== id)
        throw new Error("SIGN_IN_REQUIRED");
      await load(fresh.data.session, epoch);
    } catch (e) {
      if (isCurrent(epoch, id))
        setError(e instanceof Error ? e.message : "DATABASE_UNAVAILABLE");
    } finally {
      if (operation.current === ticket) {
        operation.current = null;
        if (isCurrent(epoch, id)) setBusy(false);
      }
    }
  }
  async function mutate(command: Command) {
    if (
      !session ||
      operation.current ||
      !isCurrent(accountEpoch, session.user.id)
    )
      return false;
    const epoch = accountEpoch,
      id = session.user.id,
      ticket = Symbol();
    operation.current = ticket;
    setBusy(true);
    setError("");
    setNotice("");
    const body = JSON.stringify(command);
    if (retry.current?.body !== body)
      retry.current = { body, key: crypto.randomUUID() };
    const requestKey = retry.current.key;
    try {
      const fresh = await client.current?.auth.getSession();
      if (!isCurrent(epoch, id)) return false;
      if (fresh?.error || fresh?.data.session?.user.id !== id)
        throw new Error("SIGN_IN_REQUIRED");
      const res = await fetch("/api/manage", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${fresh.data.session.access_token}`,
          "Content-Type": "application/json",
          "Idempotency-Key": requestKey,
        },
        body,
      });
      const result = await res.json();
      if (!isCurrent(epoch, id)) return false;
      if (!res.ok) {
        if (res.status === 409 && liveSession.current)
          await load(liveSession.current, epoch);
        throw new Error(result.error || "REQUEST_FAILED");
      }
      retry.current = null;
      setNotice("تم الحفظ.");
      try {
        if (liveSession.current) await load(liveSession.current, epoch);
      } catch {
        if (isCurrent(epoch, id)) setError("SAVED_REFRESH_FAILED");
      }
      return isCurrent(epoch, id);
    } catch (e) {
      if (isCurrent(epoch, id))
        setError(e instanceof Error ? e.message : "DATABASE_UNAVAILABLE");
      return false;
    } finally {
      if (operation.current === ticket) {
        operation.current = null;
        if (isCurrent(epoch, id)) setBusy(false);
      }
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
