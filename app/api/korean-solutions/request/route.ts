import {createLead, notionConfigured, validEmail} from '@/lib/notion-room';
import {getSolution} from '@/lib/korean-solutions';

/**
 * Site requests: Korean Solutions needs, and Masterclass interest.
 * Every request becomes a new lead in the clients board (source «الموقع»), with the details in its note.
 * Nothing is sent to the visitor or anyone else from here: the team replies by hand (Dr. Ahmed's rule).
 */
export const dynamic = 'force-dynamic';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {status, headers: {'content-type': 'application/json', 'cache-control': 'no-store'}});

const PLACES: Record<string, string> = {
  'مصر': 'مصر', 'egypt': 'مصر', 'السعودية': 'السعودية', 'saudi arabia': 'السعودية', 'ksa': 'السعودية', 'المملكة العربية السعودية': 'السعودية',
  'الإمارات': 'الإمارات', 'الامارات': 'الإمارات', 'uae': 'الإمارات', 'united arab emirates': 'الإمارات', 'قطر': 'قطر', 'qatar': 'قطر',
  'الكويت': 'باقي الخليج', 'kuwait': 'باقي الخليج', 'البحرين': 'باقي الخليج', 'bahrain': 'باقي الخليج', 'عمان': 'باقي الخليج', 'عُمان': 'باقي الخليج', 'oman': 'باقي الخليج',
};
const SECTORS = new Set(['الصحة', 'الرعاية الاجتماعية', 'الأمن والمدن', 'الزراعة والغذاء', 'الطاقة', 'التصنيع', 'الكهرباء والإلكترونيات', 'السيارات', 'مجال آخر']);

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ok: false, error: 'origin'}, 403);
  let body: Record<string, unknown> = {};
  try { body = await request.json(); } catch { return json({ok: false, error: 'bad'}, 400); }
  const s = (k: string, max: number) => (typeof body[k] === 'string' ? (body[k] as string).replace(/\s+/g, ' ').trim().slice(0, max) : '');
  // Hidden field: people leave it empty, bots fill it.
  if (s('website', 200)) return json({ok: true});
  const kindRaw = s('kind', 20);
  const kind = kindRaw === 'solution' ? 'solution' : kindRaw === 'interest' ? 'interest' : 'need';
  const org = s('org', 200); const country = s('country', 80); const email = s('email', 254).toLowerCase();
  const name = s('name', 120);
  const need = typeof body.need === 'string' ? body.need.trim().slice(0, 2000) : '';
  const sector = SECTORS.has(s('sector', 40)) ? s('sector', 40) : '';
  const locale = s('locale', 4) === 'en' ? 'en' : 'ar';
  if (kind === 'interest') {
    if (!name || !org) return json({ok: false, error: 'missing'}, 400);
    if (!validEmail(email)) return json({ok: false, error: 'email'}, 400);
  } else if (!org || (kind === 'need' && !need)) return json({ok: false, error: 'missing'}, 400);
  if (kind !== 'interest' && !validEmail(email)) return json({ok: false, error: 'email'}, 400);
  let title = '';
  if (kind === 'solution') {
    const sol = await getSolution(s('solution', 80));
    if (!sol) return json({ok: false, error: 'missing'}, 400);
    title = sol.title.ar;
  }
  if (!notionConfigured()) return json({ok: false, error: 'unavailable'}, 503);
  const topic = s('topic', 200);
  const page = s('page', 300);
  const note = kind === 'interest'
    ? [
        `تسجيل اهتمام — ${topic || 'ماستر كلاس'}`,
        `الاسم: ${name}`,
        `المؤسسة: ${org}`,
        page ? `الصفحة: ${page}` : '',
        `لغة الصفحة: ${locale === 'ar' ? 'عربي' : 'إنجليزي'}`,
      ].filter(Boolean).join('\n')
    : [
        kind === 'solution' ? `حلول من كوريا — طلب حل: ${title}` : `حلول من كوريا — احتياج${sector ? ` (${sector})` : ''}`,
        country ? `البلد: ${country}` : '',
        need ? (kind === 'need' ? `الاحتياج: ${need}` : `الرسالة: ${need}`) : '',
        `لغة الصفحة: ${locale === 'ar' ? 'عربي' : 'إنجليزي'} · مفيش رد آلي — الرد من الفريق بالإيد.`,
      ].filter(Boolean).join('\n');
  try {
    await createLead({
      name: org, source: 'الموقع', email, note,
      place: kind === 'interest' ? undefined : PLACES[country.toLowerCase()],
      sector: kind === 'interest' ? 'المعرفة وبناء القادة' : 'الشراكات ونقل التكنولوجيا',
    });
    return json({ok: true});
  } catch {
    return json({ok: false, error: 'save'}, 502);
  }
}
