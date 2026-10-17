import {createLead, notionConfigured, validEmail} from '@/lib/notion-room';

export const dynamic = 'force-dynamic';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {status, headers: {'content-type': 'application/json', 'cache-control': 'no-store'}});

const KINDS = new Map([
  ['government', 'جهة حكومية / هيئة صحية سيادية'],
  ['plant', 'منشأة تصنيع دوائي / حيوي'],
  ['hospital', 'مدينة طبية / مستشفى تخصصي'],
  ['fund', 'صندوق استثمار قطاعي / جهة تمويل'],
]);

const TRACKS = new Map([
  ['bioprocess', 'هندسة وتوطين التصنيع الحيوي'],
  ['diagnostics', 'ذكاء اصطناعي تشخيصي سيادي'],
  ['insilico', 'حوسبة الأبحاث الدوائية'],
]);

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ok: false, error: 'origin'}, 403);
  let body: Record<string, unknown> = {};
  try { body = await request.json(); } catch { return json({ok: false, error: 'bad'}, 400); }
  const s = (key: string, max: number) => (typeof body[key] === 'string' ? (body[key] as string).replace(/\s+/g, ' ').trim().slice(0, max) : '');
  if (s('website', 200)) return json({ok: true});
  const org = s('org', 200);
  const kind = KINDS.get(s('kind', 40));
  const track = TRACKS.get(s('track', 40));
  const email = s('email', 254).toLowerCase();
  const challenge = s('challenge', 800);
  if (!org || !kind || !track || !validEmail(email)) return json({ok: false, error: 'missing'}, 400);
  if (!notionConfigured()) return json({ok: false, error: 'unavailable'}, 503);
  try {
    await createLead({
      name: org,
      source: 'الموقع',
      email,
      sector: 'الشراكات ونقل التكنولوجيا',
      next: 'موجز استكشاف حيوي',
      note: `الذراع الحيوي\nالصفة: ${kind}\nالمسار: ${track}${challenge ? `\nالتحدي: ${challenge}` : ''}\nلغة الصفحة: ${s('locale', 4) === 'ar' ? 'عربي' : 'إنجليزي'}\nمفيش رد آلي.`,
    });
    return json({ok: true});
  } catch {
    return json({ok: false, error: 'save'}, 502);
  }
}
