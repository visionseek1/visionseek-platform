"""Regenerate the page list and the page-section list offered by /admin «إظهار وإخفاء». Run after adding a section, a page or a hideable block (lib/page-blocks.json):
python3 scripts/archive-options.py   (rewrites the options block in public/admin/config.yml)"""
import glob, json, re

def load(p): return json.load(open(p, encoding='utf-8'))

opts = []
def add(path, label):
    if path not in [o[0] for o in opts]: opts.append((path, label))

nav = load('content/navigation.json')
for s in nav['sections'] + [nav['reports']]:
    add(s['path'], f"{s['ar']} (القسم كله)")
add('/insights', 'بيت القادة (القسم كله)')
add('/method', 'منهجنا')
for s in nav['sections'] + [nav['reports']]:
    for c in s['children']:
        h = c['href'].split('#')[0]
        if h and h != s['path']: add(h, f"{s['ar']} ← {c['ar']}")
for f in sorted(glob.glob('content/programs/*.json')):
    d = load(f); add(f"/programs/{d['slug']}", f"البرامج ← {d['title']['ar']}")
PUBLIC = {'workshops': 'masterclass'}  # section id → public URL segment (lib/institution sectionPath)
for f in sorted(glob.glob('content/guides/*.json')):
    d = load(f); seg = PUBLIC.get(d['section'], d['section']); add(f"/{seg}/{d['slug']}", f"{seg} ← {d['title']['ar']}")
for f in sorted(glob.glob('content/news/*.json')):
    d = load(f); add(f"/news/{d['slug']}", f"الأخبار ← {d['title']['ar']}")
for f in sorted(glob.glob('content/workshops/*.json')):
    d = load(f); add(f"/masterclass/{d['slug']}", f"ماستركلاس ← {d['outcome']['ar'][:50]}")
cat = load('content/projects/catalog.json')
for s in cat['sectors']: add(f"/projects/{s['slug']}", f"المشاريع ← {s['title']['ar']}")
for f in sorted(glob.glob('content/projects/concepts/*.json')):
    d = load(f); add(f"/projects/{d['sector']}/{d['track']}/{d['slug']}", f"المشاريع ← {d['id']} {d['title']['ar']}")
add('/insights/physical-ai', 'بيت القادة ← إحاطة الذكاء الاصطناعي المادي')
add('/reports/physical-ai', 'التقارير ← إحاطة الذكاء الاصطناعي المادي')
add('/reports/agent-governance', 'التقارير ← حوكمة الوكلاء الأذكياء')

def q(s): return '"' + s.replace('\\', '\\\\').replace('"', '\\"') + '"'
lines = ''.join(f"                  - {{label: {q(l + '  ' + p)}, value: {q(p)}}}\n" for p, l in opts)
cfg = open('public/admin/config.yml', encoding='utf-8').read()
start = '                # archive-options:start\n'; end = '                # archive-options:end\n'
cfg = re.sub(re.escape(start) + r'.*?' + re.escape(end), start + lines + end, cfg, flags=re.S)
blocks = load('lib/page-blocks.json')['blocks']
block_lines = ''.join(f"              - {{label: {q(b['label'])}, value: {q(b['id'])}}}\n" for b in blocks)
bstart = '                # block-options:start\n'; bend = '                # block-options:end\n'
cfg = re.sub(re.escape(bstart) + r'.*?' + re.escape(bend), bstart + block_lines + bend, cfg, flags=re.S)
open('public/admin/config.yml', 'w', encoding='utf-8').write(cfg)
print(len(opts), 'pages,', len(blocks), 'page sections')
