"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import type { Locale } from "@/lib/brief";

const hideKey = "visionseek.leaders.subscribe-hide";

function subscribeHide(onChange: () => void) {
  window.addEventListener("visionseek-leaders-subscribe-hide", onChange);
  return () => window.removeEventListener("visionseek-leaders-subscribe-hide", onChange);
}

function readHide() {
  return window.sessionStorage.getItem(hideKey) === "1";
}

export function useSubscribeHidden() {
  return useSyncExternalStore(subscribeHide, readHide, () => false);
}

export function dismissSubscribeCta() {
  window.sessionStorage.setItem(hideKey, "1");
  window.dispatchEvent(new Event("visionseek-leaders-subscribe-hide"));
}

export function SubscribeButton({ locale, onOpen }: { locale: Locale; onOpen: () => void }) {
  const ar = locale === "ar";
  return (
    <button type="button" className="leaders-subscribe" onClick={onOpen}>
      {ar ? "اشترك" : "Subscribe"}
    </button>
  );
}

export function SubscribeCta({ locale, onOpen }: { locale: Locale; onOpen: () => void }) {
  const ar = locale === "ar";
  return (
    <aside className="leaders-cta">
      <p>{ar ? "محتوى تجريبي. الاشتراك لا يحفظ البريد ولا يرسل شيئًا." : "Demo content. Subscribe does not save an address or send anything."}</p>
      <div>
        <button type="button" onClick={onOpen}>{ar ? "اشترك" : "Subscribe"}</button>
        <button type="button" onClick={dismissSubscribeCta}>{ar ? "إغلاق" : "Dismiss"}</button>
      </div>
    </aside>
  );
}

export function SubscribeModal({ locale, open, onClose }: { locale: Locale; open: boolean; onClose: () => void }) {
  const ar = locale === "ar";
  const titleId = useId();
  const noteId = useId();
  const emailId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [reviewed, setReviewed] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function close() {
    setReviewed(false);
    onClose();
  }

  function preview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    form.reset();
    setReviewed(true);
  }

  return (
    <dialog ref={dialogRef} className="leaders-modal" aria-labelledby={titleId} onClose={close}>
      <form onSubmit={preview}>
        <p className="leaders-mock">{ar ? "محتوى تجريبي" : "Demo content"}</p>
        <h2 id={titleId}>{ar ? "اشترك" : "Subscribe"}</h2>
        <p id={noteId}>{ar ? "معاينة فقط. لا يُحفظ البريد ولا يُرسَل شيء." : "Preview only. The address is not saved and nothing is sent."}</p>
        <label htmlFor={emailId}>{ar ? "البريد الإلكتروني" : "Email"}</label>
        <input id={emailId} name="email" type="email" required maxLength={180} autoComplete="email" dir="ltr" aria-describedby={noteId} />
        <label className="leaders-check"><input type="checkbox" name="digest" />{ar ? "ملخص أسبوعي" : "Weekly digest"}</label>
        <label className="leaders-check"><input type="checkbox" name="alerts" />{ar ? "تنبيهات مهمة فقط" : "Important alerts only"}</label>
        <div className="leaders-modal-actions">
          <button type="submit">{ar ? "مراجعة المعاينة" : "Review preview"}</button>
          <button type="button" onClick={close}>{ar ? "إغلاق" : "Close"}</button>
        </div>
        {reviewed ? (
          <p role="status">{ar ? "لم يُحفظ البريد ولم يُرسَل شيء. لست مشتركًا." : "Nothing was saved or sent. You are not subscribed."}</p>
        ) : null}
      </form>
    </dialog>
  );
}
