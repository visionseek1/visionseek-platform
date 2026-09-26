'use client';
import {useCallback,useEffect,useState} from 'react';
import {Pause,Play,RefreshCw,ShieldCheck} from 'lucide-react';
import {leadersClient} from '@/lib/leaders/client';
import type {AutomationSnapshot} from '@/lib/leaders/editorial/automation-contract';
import type {Locale} from '@/lib/leaders/types';
import styles from './editorial-room.module.css';
const states:Record<string,[string,string]>={queued:['في الانتظار','Queued'],running:['يكتب الآن','Drafting'],succeeded:['جاهزة لمراجعتك','Ready for your review'],failed:['تحتاج تدخلًا','Needs attention'],cancelled:['متوقفة','Stopped']};
const messages:Record<string,[string,string]>={AUTOMATION_NOT_CONFIGURED:['أكمل إعداد الاتصال أولًا.','Finish connection setup first.'],MODEL_NOT_CONFIGURED:['OpenRouter لم يُربط بعد.','OpenRouter is not connected yet.'],MODEL_ACCESS_FAILED:['تعذّر التحقق من مفتاح OpenRouter.','OpenRouter key verification failed.'],MODEL_CREDIT_REQUIRED:['رصيد المفتاح المتاح لا يكفي.','The key has no remaining credit.'],MODEL_UNSUPPORTED:['النموذج المحدد لا يدعم صيغة المسودة المطلوبة.','The selected model does not support structured drafts.'],EDITOR_REQUIRED:['هذا التشغيل مخصص لحساب المالك المحدد.','This automation belongs to the configured owner.'],ROOM_NOT_INSTALLED:['قاعدة بيانات الأتمتة لم تُجهّز بعد.','Automation database is not installed.'],SIGN_IN_REQUIRED:['سجّل الدخول للاستوديو.','Sign in to the studio.']};
export default function EditorialAutomation({locale,onComplete}:{locale:Locale;onComplete:()=>void}){
 const ar=locale==='ar',t=(a:string,b:string)=>ar?a:b;
 const [snapshot,setSnapshot]=useState<AutomationSnapshot|null>(null),[busy,setBusy]=useState(false),[message,setMessage]=useState(''),[error,setError]=useState('');
 const call=useCallback(async(body?:unknown)=>{
  const {data:{session}}=await leadersClient().auth.getSession();if(!session)throw new Error('SIGN_IN_REQUIRED');
  const response=await fetch('/api/leaders/editorial/automation',{method:body?'POST':'GET',headers:{Authorization:`Bearer ${session.access_token}`,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{}),cache:'no-store'});
  const data=await response.json();if(!response.ok)throw new Error(data.error||'REQUEST_FAILED');return data;
 },[]);
 const explain=useCallback((e:unknown)=>{const code=e instanceof Error?e.message:'';return messages[code]?.[ar?0:1]||(ar?'تعذّر تنفيذ الخطوة. حدّث الحالة وحاول مجددًا.':'Could not complete the step. Refresh and retry.');},[ar]);
 const refresh=useCallback(async()=>{try{setSnapshot(await call());setError('');}catch(e){setError(explain(e));}},[call,explain]);
 useEffect(()=>{let alive=true;void call().then(data=>{if(alive)setSnapshot(data);}).catch(e=>{if(alive)setError(explain(e));});return()=>{alive=false;};},[call,explain]);
 useEffect(()=>{
  if(!snapshot?.jobs.some(j=>j.status==='queued'||j.status==='running'))return;
  const timer=setInterval(()=>{if(document.visibilityState==='visible')void refresh();},10000);
  return()=>clearInterval(timer);
 },[snapshot,refresh]);
 async function act(action:'run_once'|'set_enabled'|'check_model'){
  setBusy(true);setError('');setMessage('');
  try{
   const result=await call(action==='set_enabled'?{action,enabled:!snapshot?.enabled}:{action});
   if(action==='check_model')setMessage(t('اتصال OpenRouter والنموذج اتأكدوا. الاختبار ده لم يولّد محتوى.','OpenRouter key and model verified. This check did not generate content.'));
   else if(action==='set_enabled')setMessage(result.enabled?t('استقبال الدورات المجدولة مفعّل.','Scheduled cycles enabled.'):t('أُوقف بدء الدورات التلقائية.','New automatic cycles paused.'));
   else setMessage(result.dispatched?t(`أُرسلت ${result.dispatched} مهمة. يمكنك متابعة حالتها أدناه.`,`${result.dispatched} job(s) dispatched. Track them below.`):result.status==='daily_limit'?t('وصلنا لحد المسودتين اليوم.','The two-draft daily limit has been reached.'):result.status==='dispatch_pending'?t('حُفظت المهام، لكن الاتصال بـ Trigger.dev يحتاج مراجعة.','Jobs saved; Trigger.dev dispatch needs attention.'):t('لا توجد مصادر جديدة جاهزة للكتابة. أضف مصدرًا أولًا.','No new sources to draft. Add a source first.'));
   await refresh();onComplete();
  }catch(e){setError(explain(e));}finally{setBusy(false);}
 }
 return <section className={styles.automation} aria-label={t('تشغيل الشخصيات','Character automation')}>
  <div className={styles.automationHeading}><div><span className={styles.eyebrow}>{t('التشغيل والمتابعة','OPERATIONS')}</span><h2>{t('المصادر تدخل. المسودات تصل لمراجعتك.','Sources in. Drafts ready for your review.')}</h2></div><span className={styles.badge}>{snapshot?.enabled?t('الدورات مفعّلة','Cycles enabled'):t('الدورات متوقفة','Cycles paused')}</span></div>
  <p>{t('نبدأ بالمصادر الجديدة المحفوظة لتيكو ولابو، بحد أقصى مسودتين يوميًا وثلاث محاولات لكل مهمة. كل ناتج يحتاج مراجعتك قبل النشر.','Starts with new saved sources for Tiko and Labo: up to two drafts daily and three attempts per job. Every result needs your review before publication.')}</p>
  <div className={styles.actions}>
   <button className={styles.primary} disabled={busy||!snapshot?.configured||!snapshot.owner_matches} onClick={()=>void act('run_once')}><Play size={15}/>{t('شغّل دورة الآن','Run one cycle')}</button>
   <button className={styles.secondary} disabled={busy||!snapshot||(!snapshot.enabled&&(!snapshot.configured||!snapshot.owner_matches))} onClick={()=>void act('set_enabled')}><Pause size={15}/>{snapshot?.enabled?t('أوقف الدورات','Pause cycles'):t('فعّل استقبال الدورات','Enable cycles')}</button>
   <button className={styles.secondary} disabled={busy} onClick={()=>void act('check_model')}><ShieldCheck size={15}/>{t('اختبر اتصال النموذج','Check model connection')}</button>
   <button className={styles.secondary} disabled={busy} onClick={()=>{void refresh();onComplete();}}><RefreshCw size={15}/>{t('حدّث الحالة','Refresh status')}</button>
  </div>
  {error&&<p role="alert" className={styles.error}>{error}</p>}{message&&<p role="status" className={styles.notice}>{message}</p>}
  {snapshot&&<><div className={styles.automationTimes}><span>{t('آخر إشارة من الجدولة: ','Last scheduler signal: ')}{snapshot.last_tick_at?new Date(snapshot.last_tick_at).toLocaleString(ar?'ar-EG':'en-GB'):t('لم تصل بعد','Not received')}</span><span>{t('آخر بدء تنفيذ: ','Last worker start: ')}{snapshot.last_worker_at?new Date(snapshot.last_worker_at).toLocaleString(ar?'ar-EG':'en-GB'):t('لم يبدأ بعد','Not started')}</span></div>
   {!snapshot.configured&&<details className={styles.automationSetup}><summary>{t('ما الذي ينقص الاتصال؟','What is missing?')}</summary><p>{t('أضف القيم من إعدادات الخادم، ثم أعد نشر النسخة.','Set these values in server settings, then redeploy.')}</p><ul>{snapshot.missing.map(key=><li key={key}><code>{key}</code></li>)}</ul></details>}
   <details className={styles.automationLog} open={snapshot.jobs.length>0}><summary>{t('سجل التشغيل','Run history')} · {snapshot.jobs.length}</summary>{snapshot.jobs.length===0?<p>{t('ستظهر أول مهمة هنا عند بدء الدورة.','Your first job will appear here when a cycle starts.')}</p>:snapshot.jobs.map(job=><div key={job.id} className={styles.automationJob}><strong>{states[job.status]?.[ar?0:1]}</strong><span>{t('المحاولة','Attempt')} {job.attempts}/3</span><time>{new Date(job.created_at).toLocaleString(ar?'ar-EG':'en-GB')}</time>{job.last_error&&<code>{job.last_error}</code>}{job.usage?.total_tokens!=null&&<span>{job.usage.total_tokens} {t('توكن','tokens')}</span>}{job.usage?.cost!=null&&<span>${job.usage.cost.toFixed(4)}</span>}</div>)}</details>
  </>}
 </section>;
}
