import { cookieIsOwner, cookieIsValid, isPreview, readCookie } from "@/lib/room-auth";
import { createSolution, notionConfigured, updateSolution } from "@/lib/notion-room";

/**
 * حلول من كوريا (16 أكتوبر 2026): إضافة حل (بيبدأ مخفي)، تعديل «وصل المنطقة» و«فين» والترتيب، وإظهار أو إخفاء.
 * الكتابة في قاعدة «حلول من كوريا» بس. لا حذف. للمالك فقط. في المعاينة مفيش أي كتابة.
 */
export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  const cookie = readCookie(request.headers.get("cookie"));
  if (!cookieIsValid(cookie)) return Response.redirect(`${origin}/ops`, 303);
  let f: FormData;
  try { f = await request.formData(); } catch { return Response.redirect(`${origin}/ops?r=err#solutions`, 303); }
  const g = (k: string) => { const v = f.get(k); return typeof v === "string" ? v.trim() : ""; };
  const hash = "#" + (g("back").replace(/[^a-z0-9._\-/]/gi, "").slice(0, 80) || "solutions");
  const to = (r: string) => Response.redirect(`${origin}/ops?r=${r}${hash}`, 303);
  if (isPreview()) return to("preview");
  if (!cookieIsOwner(cookie)) return to("readonly");
  if (!notionConfigured()) return to("err");
  try {
    const action = g("action");
    if (action === "create") {
      await createSolution({
        titleAr: g("titleAr"), titleEn: g("titleEn"), slug: g("slug").toLowerCase(), type: g("kind"), sector: g("sector"), maker: g("maker"),
        region: g("region"), whereAr: g("whereAr"), whereEn: g("whereEn"), problemAr: g("problemAr"), problemEn: g("problemEn"),
        solutionAr: g("solutionAr"), solutionEn: g("solutionEn"), proofAr: g("proofAr"), proofEn: g("proofEn"),
        opportunityAr: g("opportunityAr"), opportunityEn: g("opportunityEn"),
        routes: f.getAll("routes").filter((v): v is string => typeof v === "string"), order: g("order"), visible: false,
      });
      return to("sol");
    }
    if (action === "update") {
      await updateSolution(g("id"), { region: g("region") || undefined, whereAr: f.has("whereAr") ? g("whereAr") : undefined, whereEn: f.has("whereEn") ? g("whereEn") : undefined, order: f.has("order") ? g("order") : undefined });
      return to("saved");
    }
    if (action === "visible") {
      await updateSolution(g("id"), { visible: g("visible") === "yes" });
      return to("saved");
    }
    return to("err");
  } catch {
    return to("err");
  }
}
