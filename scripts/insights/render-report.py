import sys
from playwright.sync_api import sync_playwright
src,pdf,png=sys.argv[1:4]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium' if False else None)
    pg=b.new_page(viewport={'width':794,'height':1123},device_scale_factor=1.4)
    pg.goto('file://'+src); pg.wait_for_timeout(800)
    pg.evaluate("document.fonts.ready")
    pg.pdf(path=pdf,format='A4',print_background=True,prefer_css_page_size=True)
    n=pg.evaluate("document.querySelectorAll('.page').length")
    for i in range(n):
        el=pg.query_selector_all('.page')[i]; el.screenshot(path=f"{png}-{i+1}.png")
    print('pages',n)
    b.close()
