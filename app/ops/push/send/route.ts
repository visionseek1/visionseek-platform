import { cookieIsValid, readCookie } from "@/lib/room-auth";
import { changesSince, lastNotificationAt, listSubscriptions, logNotification, notionConfigured, readLiveRoom, expireSubscription } from "@/lib/notion-room";
import { pushConfigured, sendPush } from "@/lib/webpush";

/**
 * يبعت إشعار لكل أجهزة د. أحمد باللي اتغيّر من آخر إشعار.
 * يتنادى من: (أ) Vercel Cron يوميًا (Authorization: Bearer CRON_SECRET)، (ب) المالك من الغرفة (كوكي) — «ابعت دلوقتي» أو إشعار تجريبي.
 */
export async function POST(request: Request) {
  const cron = process.env.CRON_SECRET;
  const byCron = !!cron && request.headers.get("authorization") === `Bearer ${cron}`;
  const byOwner = cookieIsValid(readCookie(request.headers.get("cookie")));
  if (!byCron && !byOwner) return Response.json({ ok: false }, { status: 401 });
  if (!pushConfigured() || !notionConfigured()) return Response.json({ ok: false, reason: "not configured" }, { status: 503 });

  const url = new URL(request.url);
  const test = byOwner && url.searchParams.get("test") === "1";
  try {
    const subs = await listSubscriptions();
    if (!subs.length) return Response.json({ ok: true, sent: 0, reason: "no devices" });
    let payload: { title: string; body: string; url: string };
    if (test) {
      payload = { title: "الغرفة شغالة", body: "ده إشعار تجريبي من غرفة عمليات VisionSeek.", url: "/ops#inbox" };
    } else {
      const live = await readLiveRoom();
      if (!live) return Response.json({ ok: false, reason: "no live data" }, { status: 503 });
      const since = await lastNotificationAt();
      const ch = changesSince(live, since || "1970-01-01");
      if (!ch) return Response.json({ ok: true, sent: 0, reason: "nothing new" });
      payload = { title: ch.title, body: ch.body, url: "/ops#inbox" };
    }
    let sent = 0;
    for (const s of subs) {
      try {
        const code = await sendPush(s.sub, payload);
        if (code === 404 || code === 410) await expireSubscription(s.id);
        else if (code >= 200 && code < 300) sent++;
      } catch {
        /* جهاز واحد يفشل ما يوقفش الباقي */
      }
    }
    if (!test) await logNotification(payload.title, payload.body, sent);
    return Response.json({ ok: true, sent });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}

export const GET = POST;
