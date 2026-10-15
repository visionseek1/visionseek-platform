import { cookieIsOwner, readCookie } from "@/lib/room-auth";
import { addComment, createWorkCard, notionConfigured, proposeMethodUpdate, updateWorkCard } from "@/lib/notion-room";

/**
 * كروت الغرفة (الإصدار 3.1): إضافة كارت، تحديث حالته/مسؤوله/موعده/خطواته، وتعليق عليه.
 * الكتابة محصورة في قاعدتي «الشغل» و«تعليقات الغرفة» في Notion. لا حذف. للمالك فقط.
 */
export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  if (!cookieIsOwner(readCookie(request.headers.get("cookie")))) return Response.redirect(`${origin}/ops`, 303);

  let f: FormData;
  try {
    f = await request.formData();
  } catch {
    return Response.redirect(`${origin}/ops?r=err`, 303);
  }
  const g = (k: string) => {
    const v = f.get(k);
    return typeof v === "string" ? v.trim() : "";
  };
  const back = g("back").replace(/[^a-z0-9._\-/]/gi, "").slice(0, 80);
  const to = (r: string) => Response.redirect(`${origin}/ops?r=${r}${back ? "#" + back : ""}`, 303);
  if (!notionConfigured()) return to("err");

  try {
    const action = g("action");
    if (action === "create") {
      // مفيش عنصر من غير مسار: الإضافة دايمًا من جوه مسار، والعنصر بيورث منه القطاع والقسم
      if (!g("track")) return to("err");
      await createWorkCard({
        title: g("title"),
        type: g("type"),
        owner: g("owner"),
        due: g("due"),
        desc: g("desc"),
        sec: g("sec"),
        appetite: g("appetite"),
        blockedBy: g("blocked"),
        milestone: g("milestone") === "1",
        track: g("track"),
        goal: g("goal"),
        filter: g("filter"),
        next: g("next"),
      });
      return to("card");
    }
    if (action === "update") {
      await updateWorkCard(g("id"), {
        stage: g("stage") || undefined,
        owner: g("owner") || undefined,
        due: f.has("due") ? g("due") : undefined,
        steps: f.has("steps") ? g("steps") : undefined,
        blockedBy: f.has("blocked") ? g("blocked") : undefined,
        next: f.has("next") ? g("next") : undefined,
        sec: g("sec") || undefined,
        milestone: f.has("milestone_set") ? g("milestone") === "1" : undefined,
        goal: f.has("goal") ? g("goal") : undefined,
        filter: f.has("filter") ? g("filter") : undefined,
      });
      return to("saved");
    }
    if (action === "propose") {
      // عنصر خلص وطريقته نجحت ← طلب تحديث منهجية المسار، ومستني موافقة د. أحمد
      await proposeMethodUpdate(g("id"), g("method"), g("note"));
      return to("proposed");
    }
    if (action === "comment") {
      await addComment(g("id"), g("title"), g("text"));
      return to("comment");
    }
    return to("err");
  } catch {
    return to("err");
  }
}
