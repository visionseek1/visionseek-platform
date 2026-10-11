/* غرفة العمليات — عامل خدمة بسيط: شبكة أولًا دايمًا (الصفحة خاصة ومتغيّرة)، ومفيش تخزين لمحتوى الغرفة.
   وجوده يسمح بتثبيت الغرفة على الموبايل كتطبيق. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (e) => {
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).catch(() => new Response("<!doctype html><html lang=\"ar\" dir=\"rtl\"><meta charset=\"utf-8\"><body style=\"font-family:system-ui;padding:24px;text-align:center\"><h2>مفيش إنترنت</h2><p>الغرفة بتقرأ من Notion، فمحتاجة اتصال. حاول تاني.</p></body></html>", { headers: { "content-type": "text/html; charset=utf-8" } })));
  }
});
