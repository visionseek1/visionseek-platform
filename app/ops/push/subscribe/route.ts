import { cookieIsValid, readCookie } from "@/lib/room-auth";
import { notionConfigured, saveSubscription, expireSubscription, listSubscriptions } from "@/lib/notion-room";
import { endpointId } from "@/lib/webpush";

/** يسجّل اشتراك جهاز في الإشعارات (للمالك). JSON: {subscription, device} أو {unsubscribe: endpoint}. */
export async function POST(request: Request) {
  if (!cookieIsValid(readCookie(request.headers.get("cookie")))) return Response.json({ ok: false }, { status: 401 });
  if (!notionConfigured()) return Response.json({ ok: false, reason: "notion" }, { status: 503 });
  let body: { subscription?: { endpoint?: string; keys?: { p256dh?: string; auth?: string } }; device?: string; unsubscribe?: string } = {};
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  try {
    if (body.unsubscribe) {
      const key = endpointId(String(body.unsubscribe));
      const hit = (await listSubscriptions()).find((s) => s.key === key);
      if (hit) await expireSubscription(hit.id);
      return Response.json({ ok: true });
    }
    const s = body.subscription;
    if (!s || !s.endpoint || !s.keys || !s.keys.p256dh || !s.keys.auth) return Response.json({ ok: false }, { status: 400 });
    await saveSubscription(endpointId(s.endpoint), { endpoint: s.endpoint, keys: { p256dh: s.keys.p256dh, auth: s.keys.auth } }, String(body.device || "").slice(0, 200));
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
