"""Original editorial graphics and silent clips; no stock or third-party assets."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import subprocess, tempfile, math

out=Path(__file__).resolve().parents[1]/'public/leaders'
regular='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
bold='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
ink=(22,44,36); lime=(207,245,94); light=(242,246,237)
items={
 'transfer': {'ar':('التقنية تعبر الحدود.','والمعرفة تجعلها تعمل.'),'en':('Technology crosses borders.','Knowledge makes it work.'),'source':'Samsung Biologics'},
 'training': {'ar':('المعرفة تنتقل.','والفريق يبني القدرة.'),'en':('Knowledge travels.','People build the capability.'),'source':'WHO / Korea training hub'},
 'ai': {'ar':('ذكاء اصطناعي. معرفة دوائية.','احتمالات تستحق الدراسة.'),'en':('AI meets drug expertise.','Possibilities worth exploring.'),'source':'NVIDIA / Lilly'},
 'manufacturing': {'ar':('مصنع الدواء يتغيّر.','ما الذي يستحق انتباهك؟'),'en':('Manufacturing is changing.','What deserves your attention?'),'source':'FDA / FRAME'},
}
def text(d,xy,value,size,color,lang='en',weight=False,anchor='mm',max_width=620):
 direction='rtl' if lang=='ar' else 'ltr'
 f=ImageFont.truetype(bold if weight else regular,size)
 while d.textlength(value,font=f,direction=direction)>max_width:
  size-=1; f=ImageFont.truetype(bold if weight else regular,size)
 d.text(xy,value,font=f,fill=color,anchor=anchor,direction=direction)

def draw_graphic(d,key,cx,cy):
 # Abstract editorial illustration: networks around a capsule, not a molecule model.
 for i in range(8):
  a=i*math.pi/4; x=cx+math.cos(a)*146;y=cy+math.sin(a)*125
  d.line((cx,cy,x,y),fill=(196,211,187),width=3)
  d.ellipse((x-10,y-10,x+10,y+10),fill=lime if i%2 else ink)
 d.rounded_rectangle((cx-92,cy-45,cx+92,cy+45),radius=45,fill=ink)
 d.rounded_rectangle((cx-89,cy-42,cx+89,cy+42),radius=42,outline=lime,width=3)
 d.line((cx,cy-39,cx,cy+39),fill=lime,width=3)
 text(d,(cx+44,cy),'+',44,lime,weight=True)

out.mkdir(exist_ok=True)
for key,data in items.items():
 for lang in ('ar','en'):
  im=Image.new('RGB',(1000,620),light);d=ImageDraw.Draw(im)
  d.rectangle((0,0,1000,7),fill=lime)
  text(d,(60,52),'KAPSULA / VISIONSEEK',21,ink,weight=True,anchor='lm')
  draw_graphic(d,key,500,255)
  for y,value in zip((475,538),data[lang]):text(d,(500,y),value,36 if lang=='ar' else 34,ink,lang,True,max_width=890)
  im.save(out/f'kapsula-{key}-{lang}.jpg',quality=87,optimize=True)

clips={
 'transfer': {'ar':[('القدرة لا تنتقل في صندوق.','التقنية تحتاج معرفة تشغّلها.'),('نقل معرفة. فريق. جودة.','قراءة في ممارسة نقل التقنية.'),('ماذا سيبقى داخل مؤسستك؟','اقرأ المثال ومصدره أسفل المقطع.')], 'en':[('Capability is more than equipment.','Technology needs operating knowledge.'),('Knowledge. People. Quality.','A reading on technology transfer.'),('What stays in your institution?','Read the example and source below.')]},
 'ai': {'ar':[('الذكاء الاصطناعي يلتقي بالدواء.','تعاون بحثي بين Lilly وNVIDIA.'),('إعلان بحثي.','لا يعني دواءً ثبت نجاحه.'),('أين يستحق انتباه فريقك؟','اقرأ الفكرة وحدودها ومصدرها.')], 'en':[('AI meets drug expertise.','A Lilly and NVIDIA research collaboration.'),('A research announcement.','Not evidence of a proven medicine.'),('Where could your team learn?','Read the brief, limits and source.')]},
}
with tempfile.TemporaryDirectory() as tmp:
 tmp=Path(tmp)
 for key,data in clips.items():
  for lang in ('ar','en'):
   frames=[];captions=['WEBVTT','']
   for i,(title,body) in enumerate(data[lang]):
    im=Image.new('RGB',(720,1280),ink);d=ImageDraw.Draw(im)
    d.line((48,126,672,126),fill=(67,94,74),width=2)
    text(d,(48,84),'KAPSULA / VISIONSEEK',22,lime,weight=True,anchor='lm')
    text(d,(54,210),f'0{i+1} / 03',22,light,anchor='lm')
    for j in range(8):d.ellipse((90+j*75,290+(j%2)*40,102+j*75,302+(j%2)*40),fill=lime)
    text(d,(360,465),title,43,lime,lang,True)
    text(d,(360,570),body,31,light,lang)
    text(d,(360,870),'قراءة تحريرية · مقطع صامت' if lang=='ar' else 'EDITORIAL READING / SILENT CLIP',21,light,lang)
    text(d,(360,935),items[key]['source'],23,lime)
    d.rounded_rectangle((52,1045,668,1054),radius=4,fill=(67,94,74))
    d.rounded_rectangle((52,1045,52+int(616*(i+1)/3),1054),radius=4,fill=lime)
    text(d,(360,1140),'MAKE IT POSSIBLE.',23,light,weight=True)
    frame=tmp/f'{key}-{lang}-{i}.png';im.save(frame);frames.append(frame)
    if i==0:im.save(out/f'kapsula-{key}-{lang}-poster.jpg',quality=85,optimize=True)
    captions.extend([f'00:00:{i*6:02}.000 --> 00:00:{(i+1)*6:02}.000',title+'\n'+body,''])
   (out/f'kapsula-{key}-{lang}.vtt').write_text('\n'.join(captions))
   manifest=tmp/f'{key}-{lang}.txt';manifest.write_text(''.join(f"file '{f}'\nduration 6\n" for f in frames)+f"file '{frames[-1]}'\n")
   subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-f','concat','-safe','0','-i',str(manifest),'-vf','fps=24','-t','18','-c:v','libx264','-preset','fast','-crf','26','-pix_fmt','yuv420p','-movflags','+faststart',str(out/f'kapsula-{key}-{lang}.mp4')],check=True)
   print('Rendered',key,lang,flush=True)
