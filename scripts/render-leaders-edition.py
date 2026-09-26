"""Render original, silent VisionSeek editorial clips. Requires Pillow+RAQM and ffmpeg."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import subprocess, tempfile, json
root=Path(__file__).resolve().parents[1]
out=root/'public/leaders'
font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
bold='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
clips={
 'proof': {
  'source':'DARPA / Heilmeier Catechism',
  'ar': [('الفكرة الكبيرة\nتحتاج اختبارًا واضحًا.', 'ما النتيجة التي تريدها؟\nولمن ستصنع فرقًا؟'),('حدّد ما يمنعك اليوم.', 'ما الجديد في مسارك؟\nولماذا تتوقع أن ينجح؟'),('اتفق على الدليل.', 'حدّد تجربة أولى،\nومعيارًا للاستمرار أو التوقف.')],
  'en': [('A big idea needs\na clear test.', 'What outcome do you want?\nWho will benefit?'),('Name the limit\nyou face today.', 'What is new in your approach?\nWhy might it work?'),('Agree on\nthe evidence.', 'Define a first experiment\nand a continue-or-stop criterion.')]
 },
 'action': {
  'source':'Palantir / Ontology overview',
  'ar': [('البيانات تبدأ الرحلة.', 'ما القرار الذي يجب\nأن تتحسن نتيجته؟'),('اربط المعرفة بالعمل.', 'في مثال صيانة مصنع:\nآلة، عطل، قطعة غيار،\nومسؤول عن الإجراء.'),('تتبّع النتيجة.', 'من اكتشاف العطل إلى إغلاقه:\nأين تتوقف المعلومة؟\nوأين يتأخر الإجراء؟')],
  'en': [('Data starts\nthe journey.', 'Which decision needs\na better outcome?'),('Connect knowledge\nto action.', 'An illustrative factory workflow:\nequipment, fault, spare part\nand an accountable operator.'),('Follow the result.', 'From detection to closure:\nwhere does information stop?\nWhere does action stall?')]
 }
}
out.mkdir(exist_ok=True)
with tempfile.TemporaryDirectory() as tmp:
 tmp=Path(tmp)
 for key,data in clips.items():
  for lang in ['ar','en']:
   files=[]; captions=['WEBVTT','']
   for i,(title,body) in enumerate(data[lang]):
    im=Image.new('RGB',(720,1280),(14,23,16));d=ImageDraw.Draw(im)
    for y in range(1280):
     mix=1-abs(y-530)/900
     d.line((0,y,720,y),fill=(int(14+9*max(0,mix)),int(23+15*max(0,mix)),int(16+6*max(0,mix))))
    d.rounded_rectangle((48,56,672,120),radius=24,outline=(78,100,56),width=2)
    d.text((78,74),'VISIONSEEK / LEADERS HOUSE',font=ImageFont.truetype(bold,20),fill=(216,249,165))
    d.text((50,177),f'0{i+1} / 03',font=ImageFont.truetype(font,21),fill=(176,199,147))
    d.line((50,232,670,232),fill=(74,98,53),width=2)
    size=51 if lang=='ar' else 48
    direction='rtl' if lang=='ar' else 'ltr'
    while max(d.textlength(line,font=ImageFont.truetype(bold,size),direction=direction) for line in title.split('\n'))>620:size-=1
    y=330
    for line in title.split('\n'):
     d.text((360,y),line,font=ImageFont.truetype(bold,size),fill=(223,255,108),anchor='mt',direction=direction);y+=size*1.7
    y=max(660,y+70)
    bsize=36 if lang=='ar' else 30
    while max(d.textlength(line,font=ImageFont.truetype(font,bsize),direction=direction) for line in body.split('\n'))>615:bsize-=1
    for line in body.split('\n'):
     d.text((360,y),line,font=ImageFont.truetype(font,bsize),fill=(228,236,219),anchor='mt',direction=direction);y+=bsize*1.9
    d.line((50,1057,670,1057),fill=(74,98,53),width=2)
    d.text((360,1090),'قراءة تحريرية • التفاصيل والمصدر أسفل المقطع' if lang=='ar' else 'EDITORIAL BRIEF / SOURCE BELOW',font=ImageFont.truetype(font,19),fill=(171,192,151),anchor='mt',direction=direction)
    d.text((360,1132),data['source'],font=ImageFont.truetype(font,18),fill=(171,192,151),anchor='mt')
    d.text((360,1200),'MAKE IT POSSIBLE.',font=ImageFont.truetype(bold,22),fill=(225,255,77),anchor='mt')
    f=tmp/f'{key}-{lang}-{i}.png';im.save(f);files.append(f)
    if i==0:im.save(out/f'{key}-{lang}.jpg',quality=85)
    captions.extend([f'00:00:{i*10:02}.000 --> 00:00:{(i+1)*10:02}.000',title.replace('\n',' ')+'\n'+body.replace('\n',' '),''])
   (out/f'{key}-{lang}.vtt').write_text('\n'.join(captions))
   manifest=tmp/f'{key}-{lang}.txt'
   manifest.write_text(''.join(f"file '{f}'\nduration 10\n" for f in files)+f"file '{files[-1]}'\n")
   subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-f','concat','-safe','0','-i',str(manifest),'-vf','fps=24','-t','30','-c:v','libx264','-preset','fast','-crf','25','-pix_fmt','yuv420p','-movflags','+faststart',str(out/f'{key}-{lang}.mp4')],check=True)
   print(f'Rendered {key}-{lang}',flush=True)
print(json.dumps({p.name:p.stat().st_size for p in out.iterdir()}))
