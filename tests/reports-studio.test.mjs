import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import ts from 'typescript';
import {JSDOM} from 'jsdom';
import React,{act} from 'react';

// A local component test only: no network, real identity, or production auth bypass.
const dom=new JSDOM('<!doctype html><html><body></body></html>',{url:'https://studio.test'});
Object.assign(globalThis,{window:dom.window,document:dom.window.document,HTMLElement:dom.window.HTMLElement,IS_REACT_ACT_ENVIRONMENT:true});
const {createRoot}=await import('react-dom/client');
const require=createRequire(import.meta.url);
function compile(path,overrides={}){
 const source=readFileSync(new URL(path,import.meta.url),'utf8');
 const output=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true,target:ts.ScriptTarget.ES2022}}).outputText;
 const compiled={exports:{}};
 new Function('require','module','exports',output)(name=>name in overrides?overrides[name]:require(name),compiled,compiled.exports);
 return compiled.exports;
}
const contract=compile('../lib/reports/drafts.ts');
const validation=compile('../lib/reports/draft-validation.ts',{'./drafts':contract});
const pause=()=>{let resolve;const promise=new Promise(r=>{resolve=r;});return {promise,resolve};};
const response=(body,status=200)=>({ok:status<400,status,json:async()=>body});
const session={user:{id:'local-editor'},access_token:'mock-token-no-network'};
let records=[],requests=[],pendingGet=null,pendingWrite=null,writeError=null,currentSession=session,authChange,pendingSession=null;
const client={auth:{getSession:async()=>{if(pendingSession)await pendingSession.promise;return {data:{session:currentSession}};},onAuthStateChange:callback=>{authChange=callback;return {data:{subscription:{unsubscribe(){}}}};}}};
const Studio=compile('../components/reports/studio.tsx',{
 'next/link':({href,children,...props})=>React.createElement('a',{href,...props},children),
 '@/lib/leaders/client':{leadersClient:()=>client},
 '@/lib/reports/drafts':contract,
 '@/lib/reports/draft-validation':validation,
 './studio.module.css':{__esModule:true,default:new Proxy({},{get:(_,key)=>String(key)})},
}).default;
let root,container;
async function flush(action=()=>{}){await act(async()=>{action();await new Promise(resolve=>setImmediate(resolve));});}
function button(text){const result=[...container.querySelectorAll('button')].find(b=>b.textContent.trim()===text||b.getAttribute('aria-label')===text);assert.ok(result,`Button: ${text}`);return result;}
async function click(text){await flush(()=>button(text).click());}
function field(text){const result=[...container.querySelectorAll('label')].find(l=>l.textContent.trim().startsWith(text))?.querySelector('input,textarea,select');assert.ok(result,`Field: ${text}`);return result;}
async function input(text,value){const el=field(text);await flush(()=>{const prototype=el.tagName==='TEXTAREA'?dom.window.HTMLTextAreaElement.prototype:dom.window.HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(prototype,'value').set.call(el,value);el.dispatchEvent(new dom.window.Event('input',{bubbles:true}));});}
async function mount(t){
 records=[];requests=[];pendingGet=null;pendingWrite=null;writeError=null;currentSession=session;pendingSession=null;window.confirm=()=>true;
 globalThis.fetch=async(path,options={})=>{
  assert.ok(path.startsWith('/api/reports/drafts'));requests.push({method:options.method,path,body:options.body?JSON.parse(options.body):null});
  if(options.method==='GET'){if(pendingGet)await pendingGet.promise;return response({items:structuredClone(records.filter(item=>item.owner_id===currentSession?.user.id))});}
  if(pendingWrite)await pendingWrite.promise;
  if(writeError)return response({error:writeError},409);
  const payload=JSON.parse(options.body),old=records.find(r=>path.endsWith(r.id));
  const saved={id:old?.id||payload.id,owner_id:'local-editor',status:payload.status||'draft',content:payload.content,revision:old?old.revision+1:0,created_at:'2026-09-27T00:00:00Z',updated_at:'2026-09-27T00:00:00Z'};
  records=[saved,...records.filter(r=>r.id!==saved.id)];return response({item:structuredClone(saved)});
 };
 container=document.createElement('div');document.body.append(container);root=createRoot(container);
 t.after(async()=>{await act(async()=>root.unmount());container.remove();});
 await flush(()=>root.render(React.createElement(Studio,{locale:'ar'})));
}

test('Arabic report entry, reload, preview, review, archive and restore preserve content',async t=>{
 await mount(t);await click('تقرير جديد');
 await input('العنوان ·','تقرير اختبار المكوّن');await input('الملخص التنفيذي','ملخص محلي للاختبار');await input('النص','متن التقرير التجريبي');
 await input('المنهج المستخدم','منهج الاختبار');await input('حدود النتائج','حدود الاختبار');await click('إضافة مرجع');
 await input('عنوان المرجع والجهة','مرجع اختبار');await input('رابط المرجع','https://example.org/source');
 await click('حفظ مسودة');assert.equal(records.length,1);assert.equal(records[0].content.sections[0].body_ar,'متن التقرير التجريبي');
 assert.match(container.querySelector('.saveBar [role=status]').textContent,/تم الحفظ/);
 await click('تحديث القائمة');const queue=container.querySelector('.queueItem');await flush(()=>queue.click());
 assert.equal(field('العنوان ·').value,'تقرير اختبار المكوّن');
 await input('العنوان ·','عنوان معدّل');await click('معاينة');assert.match(container.querySelector('article').textContent,/عنوان معدّل/);
 await click('جاهز للمراجعة');assert.equal(records[0].status,'review');assert.equal(records[0].revision,1);
 await click('أرشفة');assert.equal(records[0].status,'archived');await click('استعادة');assert.equal(records[0].status,'draft');
 assert.equal(records[0].content.title_ar,'عنوان معدّل');assert.equal(records[0].revision,3);
});

test('field-level errors do not submit or echo private URL values',async t=>{
 await mount(t);await click('تقرير جديد');await click('حفظ مسودة');
 assert.match(container.querySelector('.saveBar [role=alert]').textContent,/أضف عنوانًا/);
 await input('العنوان ·','عنوان');await input('رابط صورة الغلاف','https://secret:credential@example.org');await click('حفظ مسودة');
 const message=container.querySelector('.saveBar [role=alert]').textContent;
 assert.match(message,/رابط الغلاف/);assert.doesNotMatch(message,/secret|credential/);assert.equal(requests.filter(r=>r.method==='POST').length,0);
});

test('refresh locks editing and document changes until the response settles',async t=>{
 await mount(t);await click('تقرير جديد');await input('العنوان ·','احتفظ بالنص');
 window.confirm=()=>false;await click('تحديث القائمة');assert.equal(requests.length,1);assert.equal(field('العنوان ·').value,'احتفظ بالنص');
 window.confirm=()=>true;pendingGet=pause();await click('تحديث القائمة');
 assert.equal(field('العنوان ·').matches(':disabled'),true);assert.equal(button('تقرير جديد').disabled,true);assert.equal(button('حفظ مسودة').disabled,true);
 await flush(()=>pendingGet.resolve());assert.ok(container.querySelector('.welcome'));
});

test('double save sends one request and failed updates preserve unsaved text',async t=>{
 await mount(t);await click('تقرير جديد');await input('العنوان ·','نسخة أولى');pendingWrite=pause();
 const save=button('حفظ مسودة');await flush(()=>{save.click();save.click();});assert.equal(requests.filter(r=>r.method==='POST').length,1);
 await flush(()=>pendingWrite.resolve());pendingWrite=null;
 await input('العنوان ·','تعديل محلي لم يُحفظ');writeError='REVISION_CONFLICT';await click('حفظ مسودة');
 assert.equal(field('العنوان ·').value,'تعديل محلي لم يُحفظ');assert.equal(records[0].content.title_ar,'نسخة أولى');
 assert.match(container.querySelector('.saveBar [role=alert]').textContent,/جلسة أخرى/);assert.equal(button('تصدير نسخة JSON').disabled,false);
});

test('review readiness rejects unnamed references and whitespace-only content',()=>{
 const d={...contract.emptyReportDraft(),title_ar:'عنوان',summary_ar:'ملخص',methodology_ar:'منهج',limitations_ar:'حدود',sources:[{title:' ',url:'https://example.org',note:''}]};
 d.sections[0].body_ar='نص';assert.equal(contract.reviewGaps(d).sources,false);d.sources[0].title='مرجع';assert.equal(contract.reviewGaps(d).sources,true);
 d.summary_ar='   ';assert.equal(contract.reviewGaps(d).language,false);
});


test('a late save response cannot display private content after an account switch',async t=>{
 await mount(t);await click('تقرير جديد');await input('العنوان ·','بيانات المحرر الأول');pendingWrite=pause();await click('حفظ مسودة');
 await flush(()=>{currentSession={user:{id:'different-local-editor'},access_token:'another-mock'};authChange('SIGNED_IN',currentSession);});
 await flush(()=>pendingWrite.resolve());
 assert.ok(container.querySelector('.welcome'));assert.doesNotMatch(container.textContent,/بيانات المحرر الأول/);
});

test('an account switch while obtaining the session cannot submit another editor’s text',async t=>{
 await mount(t);await click('تقرير جديد');await input('العنوان ·','محتوى خاص بالحساب الأول');pendingSession=pause();await click('حفظ مسودة');
 await flush(()=>{currentSession={user:{id:'different-local-editor'},access_token:'another-mock'};authChange('SIGNED_IN',currentSession);});
 await flush(()=>pendingSession.resolve());
 assert.equal(requests.filter(r=>r.method==='POST').length,0);assert.doesNotMatch(container.textContent,/محتوى خاص بالحساب الأول/);
});
