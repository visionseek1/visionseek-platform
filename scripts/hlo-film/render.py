#!/usr/bin/env python3
"""Original HLO motion film. Requires Pillow with RAQM, numpy and ffmpeg.

python scripts/hlo-film/render.py --fonts /path/to/fonts --locale ar
Font files: arabic.ttf and arabic-bold.ttf (IBM Plex Sans Arabic, OFL).
Use --stills to inspect the eight scenes before rendering the MP4.
"""
import argparse
import json
import math
import subprocess
from functools import lru_cache
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
STORY = json.loads((ROOT / 'lib/programs/hlo-film.json').read_text())
W, H, FPS = 1280, 720, 24
INK, LIME, WHITE, MUTED = '#0b100e', '#d1ff00', '#f0f3e9', '#b8c5b8'
args = argparse.ArgumentParser()
args.add_argument('--fonts', required=True, type=Path)
args.add_argument('--locale', choices=['ar', 'en'], default='ar')
args.add_argument('--stills', action='store_true')
args.add_argument('--review-dir', type=Path)
A = args.parse_args()
AR = A.locale == 'ar'
OUT = ROOT / 'public/media/hlo'
OUT.mkdir(parents=True, exist_ok=True)


@lru_cache(None)
def font(size, bold=False):
    return ImageFont.truetype(str(A.fonts / ('arabic-bold.ttf' if bold else 'arabic.ttf')), size)


def text(d, xy, words, size=32, fill=WHITE, anchor='mm', bold=False):
    direction = 'rtl' if any('\u0600' <= c <= '\u06ff' for c in words) else 'ltr'
    d.text(xy, words, font=font(size, bold), fill=fill, anchor=anchor, direction=direction)


def fit(d, words, width, size, bold=True):
    while d.textlength(words, font=font(size, bold)) > width and size > 24:
        size -= 1
    return size


def ease(t):
    t = max(0, min(1, t))
    return t * t * (3 - 2 * t)


def mix(a, b, t):
    return tuple(round(x + (y-x)*t) for x, y in zip(a, b))


yy, xx = np.mgrid[:H, :W]
light = np.exp(-(((xx-310)/520)**2 + ((yy-390)/430)**2))
bg = np.stack([10+light*12, 15+light*22, 13+light*10], axis=-1).astype(np.uint8)
BG = Image.fromarray(bg).convert('RGBA')
grid = ImageDraw.Draw(BG)
for x in range(48, W, 64):
    for y in range(104, H-54, 64):
        grid.point((x,y), fill=(78,98,69,95))


def chrome(d, scene, t):
    text(d, (48,42), 'VISIONSEEK', 23, WHITE, 'lm', True)
    text(d, (1232,42), 'HLO / HIGHEST LEVEL ONE', 16, MUTED, 'rm')
    d.line((48,76,1232,76), fill='#3a4934', width=1)
    for i in range(8):
        x=48+i*149
        d.line((x,674,x+136,674),fill='#344331',width=2)
        if i < scene:
            d.line((x,674,x+136,674),fill=LIME,width=2)
        elif i == scene:
            d.line((x,674,x+136*min(t/7,1),674),fill=LIME,width=2)
    text(d, (48,699), f'{scene+1:02d} / 08', 14, MUTED, 'lm')
    text(d, (1232,699), 'MAKE IT POSSIBLE.', 14, LIME, 'rm', True)


def label_layer(scene):
    im=Image.new('RGBA',(W,H));d=ImageDraw.Draw(im)
    c=STORY['chapters'][scene][A.locale]
    if scene == 0:
        for i,line in enumerate(c['title'].split('\n')):
            text(d,(1212 if AR else 698,201+i*76),line,fit(d,line,530,50),anchor='rm' if AR else 'lm',bold=True)
        for i,line in enumerate(c['body'].split('\n')):
            text(d,(1212 if AR else 698,400+i*49),line,fit(d,line,535,31,False),MUTED,'rm' if AR else 'lm')
        text(d,(1212 if AR else 698,531),'HLO — HIGHEST LEVEL ONE',22,LIME,'rm' if AR else 'lm')
    elif scene == 7:
        text(d,(640,248),'HLO',180,LIME,bold=True)
        text(d,(640,377),'HIGHEST LEVEL ONE',24,WHITE)
        text(d,(640,472),c['title'],fit(d,c['title'],1130,47),bold=True)
        text(d,(640,540),c['body'],fit(d,c['body'],1110,32,False),MUTED)
    else:
        text(d,(640,132),f'{scene:02d} / '+c['label'],20,LIME)
        text(d,(640,207),c['title'],fit(d,c['title'],1140,57),bold=True)
        text(d,(640,285),c['body'],fit(d,c['body'],1130,32,False),MUTED)
    return im


LAYERS=[label_layer(i) for i in range(8)]


def globe(d, t):
    cx,cy,r=338,372,240
    def p(lat,lon):
        lon+=t*.035
        x=math.cos(lat)*math.sin(lon);z=math.cos(lat)*math.cos(lon)
        y=math.sin(lat)
        return (cx+r*x,cy+r*(y*.94-z*.18),z)
    for lat in np.linspace(-1.25,1.25,9):
        pts=[p(lat,lon) for lon in np.linspace(0,2*math.pi,120)]
        for a,b in zip(pts,pts[1:]):
            d.line((a[0],a[1],b[0],b[1]), fill='#436046' if a[2]>0 else '#1b2e21',width=1)
    for lon in np.linspace(0,math.pi*2,13):
        pts=[p(lat,lon) for lat in np.linspace(-math.pi/2,math.pi/2,80)]
        for a,b in zip(pts,pts[1:]):
            d.line((a[0],a[1],b[0],b[1]),fill='#354c37' if a[2]>0 else '#1b2e21',width=1)
    nodes=[p(lat,lon) for lat,lon in [(-.4,-.7),(.4,.3),(-.9,.4),(.6,-.8),(-.1,.9),(.1,-.2)]]
    for i,(x,y,z) in enumerate(nodes):
        if z>0:
            rad=5+3*math.sin(t*1.1+i)**2
            d.ellipse((x-13,y-13,x+13,y+13),outline='#526e35',width=1)
            d.ellipse((x-rad,y-rad,x+rad,y+rad),fill=LIME)
    for i in range(len(nodes)-1):
        a,b=nodes[i],nodes[i+1]
        if a[2]>0 and b[2]>0:
            d.line((a[0],a[1],b[0],b[1]),fill='#809c3d',width=1)
            u=(t*.17+i*.23)%1;x=a[0]+(b[0]-a[0])*u;y=a[1]+(b[1]-a[1])*u
            d.ellipse((x-3,y-3,x+3,y+3),fill=WHITE)


def box(d, x,y,w,h,words,active=False):
    d.rounded_rectangle((x-w/2,y-h/2,x+w/2,y+h/2),radius=6,fill='#1c2c19' if active else '#111d16',outline=LIME if active else '#4a5e41',width=2 if active else 1)
    text(d,(x,y),words,fit(d,words,w-25,28),LIME if active else WHITE)


def connector(d,a,b,t=0):
    d.line((*a,*b),fill='#546b3b',width=2)
    u=t%1;x=a[0]+(b[0]-a[0])*u;y=a[1]+(b[1]-a[1])*u
    d.ellipse((x-4,y-4,x+4,y+4),fill=LIME)


def diagram(d,s,t):
    # No invented metrics: these are conceptual representations of the method.
    phase=ease(t/2)
    if s==0:
        globe(d,t)
    elif s==1:
        left,right=((1000,530),(280,445)) if AR else ((280,530),(1000,445))
        connector(d,left,right,phase)
        box(d,*left,240,90,'المؤسسة اليوم' if AR else 'TODAY')
        box(d,*right,265,90,'النتيجة المطلوبة' if AR else 'YOUR AMBITION',True)
        text(d,(640,605),'نكتشف ما يحدّك. ونحدّد ما تريد تغييره.' if AR else 'Understand the limits. Define what needs to change.',26,MUTED)
    elif s==2:
        center=(640,480)
        d.ellipse((478,318,802,642),outline='#354b2f',width=1)
        labels=['تقنيات','معرفة','شركاء','أسواق','نماذج عمل','أبحاث'] if AR else ['TECHNOLOGY','KNOWLEDGE','PARTNERS','MARKETS','OPERATING MODELS','RESEARCH']
        for i,word in enumerate(labels):
            ang=math.pi*2*i/6; x=640+420*math.cos(ang);y=480+116*math.sin(ang)
            connector(d,center,(x,y),t*.16+i*.17)
            box(d,x,y,222,64,word, i==int(t)%6)
        box(d,*center,236,85,'هدف مؤسستك' if AR else 'YOUR GOAL',True)
    elif s==3:
        words=['الملاءمة','إمكانية الوصول','الأثر المتوقع'] if AR else ['FIT','ACCESS','POTENTIAL IMPACT']
        for i,word in enumerate(words):
            x=310+i*330
            d.ellipse((x-30,369,x+30,429),outline=LIME,width=2)
            text(d,(x,399),f'0{i+1}',23,LIME)
            box(d,x,487,294,78,word,phase>.25+i*.25)
        text(d,(640,604),'الأولوية لما يخدم مؤسستك فعلًا.' if AR else 'Prioritize what actually serves your institution.',28,MUTED)
    elif s==4:
        labels=['الأشخاص','البيانات','التقنية','الشركاء'] if AR else ['PEOPLE','DATA','TECHNOLOGY','PARTNERS']
        for i,word in enumerate(labels):
            x=202+i*292
            connector(d,(x,434),(640,573),t*.15+i*.21)
            box(d,x,423,235,74,word)
        box(d,640,581,400,78,'حلّ يعمل داخل مؤسستك' if AR else 'ONE WORKING SOLUTION',True)
    elif s==5:
        labels=['فرضية','اختبار','دليل','قرار'] if AR else ['HYPOTHESIS','TEST','EVIDENCE','DECISION']
        for i,word in enumerate(labels):
            x=(1080-i*294) if AR else (200+i*294)
            if i<3:
                nxt=x-294 if AR else x+294
                connector(d,(x,468),(nxt,468),t*.19)
            box(d,x,468,220,90,word, i<=int(t/1.6))
        text(d,(640,600),'نستمر. نعدّل. أو نتوقف — بحسب الدليل.' if AR else 'Proceed. Adapt. Or stop — according to the evidence.',28,MUTED)
    elif s==6:
        points=[(180,580),(470,530),(780,450),(1080,379)]
        if AR:points=[(W-x,y) for x,y in points]
        labels=['تشغيل','قياس','تعلّم','تطوير'] if AR else ['OPERATE','MEASURE','LEARN','EVOLVE']
        for i,(x,y) in enumerate(points):
            if i<3:connector(d,(x,y),points[i+1],t*.15)
            d.ellipse((x-12,y-12,x+12,y+12),fill=LIME)
            text(d,(x,y+42),labels[i],27,WHITE)
    else:
        # A restrained orbit frames the brand end card.
        for i in range(2):
            d.arc((260-i*80,100-i*24,1020+i*80,624+i*24),int(t*4)+20,150+int(t*4),fill='#425734',width=1)
            d.arc((260-i*80,100-i*24,1020+i*80,624+i*24),200+int(t*4),330+int(t*4),fill='#425734',width=1)


def frame(time):
    s=min(7,int(time//7));t=time-s*7
    im=BG.copy();d=ImageDraw.Draw(im)
    content=Image.new('RGBA',(W,H));draw=ImageDraw.Draw(content)
    diagram(draw,s,t)
    content=Image.alpha_composite(content,LAYERS[s])
    opacity=min(ease(t/.7),ease((7-t)/.5))
    if opacity<1:content.putalpha(content.getchannel('A').point(lambda a:round(a*opacity)))
    im=Image.alpha_composite(im,content)
    chrome(ImageDraw.Draw(im),s,t)
    return im.convert('RGB')


if A.review_dir:
    A.review_dir.mkdir(parents=True,exist_ok=True)
    for s in range(8):frame(s*7+3).save(A.review_dir/f'{A.locale}-{s:02d}.jpg',quality=92)
# Poster is the opening scene, fully visible; native player replaces it on play.
frame(2.5).save(OUT/f'hlo-film-{A.locale}-poster.jpg',quality=90,optimize=True)
if not A.stills:
    target=OUT/f'hlo-film-{A.locale}.mp4'
    cmd=['ffmpeg','-y','-hide_banner','-loglevel','error','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','slow','-crf','27','-pix_fmt','yuv420p','-movflags','+faststart',str(target)]
    p=subprocess.Popen(cmd,stdin=subprocess.PIPE)
    for n in range(STORY['duration']*FPS):
        p.stdin.write(frame(n/FPS).tobytes())
        if n%(FPS*7)==0:print(f'{A.locale}: scene {n//(FPS*7)+1}/8',flush=True)
    p.stdin.close()
    if p.wait()!=0:raise RuntimeError('Video encoding failed')
    print(f'{target}: {target.stat().st_size:,} bytes',flush=True)
