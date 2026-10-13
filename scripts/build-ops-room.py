#!/usr/bin/env python3
"""يولّد app/ops/room-html.ts من مصدر منصة الإدارة: scripts/ops-room/room.html.
الاستخدام: python3 scripts/build-ops-room.py [المسار]  — من غير مسار بياخد المصدر اللي في الريبو."""
import json, sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent
src_path = Path(sys.argv[1]) if len(sys.argv) > 1 else root / "scripts" / "ops-room" / "room.html"
html = src_path.read_text(encoding="utf-8")
# السيرفر بيحقن البيانات الحية قبل العلامة دي بالظبط (app/ops/route.ts)
assert "<script>\n// ---------- DATA" in html, "missing DATA marker"
assert "/ops/logout" in html
# البرنامج القديم اتلغى من المنصة كلها: الحروف ما تظهرش في الصفحة ولا في الكود
assert "HLO" not in html, "the cancelled programme must not appear"
ts = ("/* منصة الإدارة كصفحة واحدة مستقلة. تتولّد بـ scripts/build-ops-room.py من scripts/ops-room/room.html ولا تُعدَّل يدويًا هنا. */\n"
      "export const roomHtml: string = " + json.dumps(html, ensure_ascii=False) + ";\n")
(root / "app" / "ops" / "room-html.ts").write_text(ts, encoding="utf-8")
print("ok", len(html))
