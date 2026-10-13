import { cookieIsValid, readCookie } from "@/lib/room-auth";
import { buildBrief, expireSubscription, listSubscriptions, logBrief, logNotification, notionConfigured, readLiveRoom } from "@/lib/notion-room";
import { pushConfigured, sendPush } from "@/lib/webpush";

/**
 * تقرير الصباح — كود خالص، صفر توكنز. Vercel Cron يناديه 23:00 UTC = 8:00 صباحًا بتوقيت كوريا.
 * الخميس (بتوقيت كوريا) بيطلع النسخة الأسبوعية «نبض الأسبوع» بأرقام اللوحة.
 * التسليم: إشعار Push لأجهزة د. أحمد (لو الإشعارات متفعلة) + سطر في صفحة «تقرير الصباح — سجل» دايمًا.
 */
export async function POST(request: Request) {
  const cron = process.env.CRON_SECRET;
  const byCron = (!!cron && request.headers.get("authorization") === `Bearer ${cron}`) || !!request.headers.get("x-vercel-cron");
  const byOwner = cookieIsValid(readCookie(request.headers.get("cookie")));
  if (!byCron && !byOwner) return Response.json({ ok: false }, { status: 401 });
  if (!notionConfigured()) return Response.json({ ok: false, reason: "no notion" }, { status: 503 });

  try {
    // التاريخ واليوم بتوقيت كوريا (بيت د. أحمد)
    const kst = new Date(Date.now() + 9 * 3600 * 1000);
    const today = kst.toISOString().slice(0, 10);
    const weekly = kst.getUTCDay() === 4; // الخميس

    const live = await readLiveRoom();
    if (!live) return Response.json({ ok: false, reason: "no live data" }, { status: 503 });
    const brief = buildBrief(live, weekly, today);

    await logBrief(brief.title, brief.body, today);

    let sent = 0;
    if (pushConfigured()) {
      const subs = await listSubscriptions();
      for (const s of subs) {
        try {
          const code = await sendPush(s.sub, { title: `☀️ ${brief.title}`, body: brief.body.slice(0, 400), url: "/ops#open" });
          if (code === 404 || code === 410) await expireSubscription(s.id);
          else if (code >= 200 && code < 300) sent++;
        } catch {
          /* جهاز يفشل ما يوقفش الباقي */
        }
      }
      if (sent) await logNotification(`☀️ ${brief.title}`, brief.body.slice(0, 400), sent);
    }
    return Response.json({ ok: true, weekly, sent, logged: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}

export const GET = POST;
