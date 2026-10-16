import {createLead, notionConfigured, validEmail} from '@/lib/notion-room';

export const dynamic = 'force-dynamic';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {status, headers: {'content-type': 'application/json', 'cache-control': 'no-store'}});

const CAPABILITIES = new Set([
  'Biohealth & Medical AI',
  'Institutional AI',
  'Industrial Autonomy',
  'Cross-Border Sourcing',
]);

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ok: false, error: 'origin'}, 403);
  let body: Record<string, unknown> = {};
  try { body = await request.json(); } catch { return json({ok: false, error: 'bad'}, 400); }
  const s = (key: string, max: number) => (typeof body[key] === 'string' ? (body[key] as string).replace(/\s+/g, ' ').trim().slice(0, max) : '');
  if (s('website', 200)) return json({ok: true});
  const org = s('org', 200);
  const capability = s('capability', 80);
  const email = s('email', 254).toLowerCase();
  if (!org || !CAPABILITIES.has(capability) || !validEmail(email)) return json({ok: false, error: 'missing'}, 400);
  if (!notionConfigured()) return json({ok: false, error: 'unavailable'}, 503);
  try {
    await createLead({
      name: org,
      source: 'الموقع',
      email,
      sector: 'الشراكات ونقل التكنولوجيا',
      next: 'إرسال موجز القدرة',
      note: `موجز قدرة · ${capability}\nلغة الصفحة: ${s('locale', 4) === 'ar' ? 'عربي' : 'إنجليزي'}\nمفيش رد آلي.`,
    });
    return json({ok: true});
  } catch {
    return json({ok: false, error: 'save'}, 502);
  }
}
