#!/usr/bin/env python3
"""يولّد app/ops/room-html.ts من ملف غرفة العمليات (نسخة Claude المنشورة). الاستخدام: python3 scripts/build-ops-room.py <ops-room.html>"""
import json, sys
src = open(sys.argv[1], encoding="utf-8").read()
src = src.replace('<div class="live ${LIVE?"on":""}"><i></i>${LIVE?(DB?"متصل · تقدر تعدّل من هنا":"متصل · قراءة"):"لقطة Notion"}</div>',
                  '<div class="live ${LIVE?"on":""}"><i></i>${LIVE?(DB?"متصل · تقدر تعدّل من هنا":"متصل · قراءة"):"لقطة من Notion · التعديل الحي في نسخة Claude"}</div>')
src = src.replace('<a href="${NOTION.root}" target="_blank" rel="noreferrer">افتح القواعد</a></div>',
                  '<a href="${NOTION.root}" target="_blank" rel="noreferrer">افتح القواعد</a> · <a href="/ops/logout">خروج</a></div>')
assert "/ops/logout" in src
title, rest = src.split("\n", 1)
head_part, markup = rest.split("</style>", 1)
html = ('<!doctype html>\n<html lang="ar" dir="rtl">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        '<meta name="robots" content="noindex, nofollow">\n<link rel="icon" href="/favicon.ico">\n'
        '<link rel="manifest" href="/ops/manifest.webmanifest">\n<meta name="theme-color" content="#1b1a17">\n'
        '<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-status-bar-style" content="default">\n'
        '<meta name="apple-mobile-web-app-title" content="الغرفة">\n<link rel="apple-touch-icon" href="/ops/icon-192.png">\n'
        + title + "\n" + head_part + "</style>\n</head>\n<body>" + markup + "\n</body>\n</html>\n")
ts = ("/* الغرفة كصفحة واحدة مستقلة (نفس نسخة Claude المنشورة). تتولّد بـ scripts/build-ops-room.py ولا تُعدَّل يدويًا هنا. */\n"
      "export const roomHtml: string = " + json.dumps(html, ensure_ascii=False) + ";\n")
open("app/ops/room-html.ts", "w", encoding="utf-8").write(ts)
print("ok", len(html))
