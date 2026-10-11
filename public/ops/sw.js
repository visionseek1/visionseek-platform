/* غرفة العمليات — عامل خدمة بسيط: شبكة أولًا دايمًا (الصفحة خاصة ومتغيّرة)، ومفيش تخزين لمحتوى الغرفة.
   وجوده يسمح بتثبيت الغرفة على الموبايل كتطبيق. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (e) => {
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).catch(() => new Response("<!doctype html><html lang=\"ar\" dir=\"rtl\"><meta charset=\"utf-8\"><body style=\"font-family:system-ui;padding:24px;text-align:center\"><h2>مفيش إنترنت</h2><p>الغرفة بتقرأ من Notion، فمحتاجة اتصال. حاول تاني.</p></body></html>", { headers: { "content-type": "text/html; charset=utf-8" } })));
  }
});
self.addEventListener("push", (e) => {
  let d = { title: "غرفة العمليات", body: "", url: "/ops#inbox" };
  try { d = Object.assign(d, e.data ? e.data.json() : {}); } catch (x) {}
  e.waitUntil(self.registration.showNotification(d.title, { body: d.body, icon: "/ops/icon-192.png", badge: "/ops/icon-192.png", dir: "rtl", lang: "ar", data: { url: d.url }, tag: "vs-room" }));
});
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || "/ops";
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((cs) => { for (const c of cs) { if (c.url.includes("/ops") && "focus" in c) { c.navigate(url); return c.focus(); } } return self.clients.openWindow(url); }));
});
