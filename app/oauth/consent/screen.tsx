'use client';
import {useEffect,useState,type FormEvent} from 'react';
import {useSearchParams} from 'next/navigation';
import {createSupabaseBrowserClient} from '@/lib/supabase-browser';
type Details={authorization_id:string;client:{id:string;name:string};scope:string;redirect_uri:string};
const client=createSupabaseBrowserClient();
export default function Consent(){
 const id=useSearchParams().get('authorization_id')||'';
 const [details,setDetails]=useState<Details|null>(null),[signedIn,setSignedIn]=useState(false),[busy,setBusy]=useState(false);
 const [email,setEmail]=useState(''),[password,setPassword]=useState(''),[error,setError]=useState('');
 useEffect(()=>{let active=true;
  void client.auth.getUser().then(({data})=>{if(active)setSignedIn(Boolean(data.user));}).catch(()=>{if(active)setError('تعذر التحقق من حسابك.');});
  return()=>{active=false;};
 },[]);
 useEffect(()=>{if(!id||!signedIn)return;let active=true;
  void client.auth.oauth.getAuthorizationDetails(id).then(({data,error})=>{
   if(!active)return;
   if(error||!data){setError('طلب الاتصال غير صالح أو انتهت صلاحيته.');return;}
   if('redirect_url' in data){window.location.assign(data.redirect_url);return;}
   setDetails(data);
  }).catch(()=>{if(active)setError('تعذر تحميل طلب الاتصال.');});
  return()=>{active=false;};
 },[id,signedIn]);
 async function login(event:FormEvent){event.preventDefault();setBusy(true);setError('');
  const result=await client.auth.signInWithPassword({email,password});setPassword('');setBusy(false);
  if(result.error)setError('تعذر تسجيل الدخول.');else setSignedIn(true);
 }
 async function decide(approve:boolean){if(!details)return;setBusy(true);setError('');
  if(approve){
   const {data:user}=await client.auth.getUser();
   if(!user.user){setError('سجّل الدخول مجددًا.');setBusy(false);return;}
   const {data:editor}=await client.from('leaders_editors').select('user_id').eq('user_id',user.user.id).maybeSingle();
   if(!editor){setError('هذا الحساب ليس محررًا في بيت القادة.');setBusy(false);return;}
  }
  const result=approve?await client.auth.oauth.approveAuthorization(details.authorization_id,{skipBrowserRedirect:true})
    :await client.auth.oauth.denyAuthorization(details.authorization_id,{skipBrowserRedirect:true});
  setBusy(false);
  if(result.error||!result.data){setError('تعذر إتمام القرار. حاول مجددًا.');return;}
  window.location.assign(result.data.redirect_url);
 }
 return <main dir="rtl" style={{maxWidth:560,margin:'8vh auto',padding:24,fontFamily:'system-ui'}}>
  <h1>توصيل بيت القادة</h1>
  {!id?<p>طلب الاتصال ناقص.</p>:!signedIn?<><p>سجّل دخولك بحساب محرر بيت القادة لمراجعة طلب الاتصال.</p>
   <form onSubmit={login}><label>البريد الإلكتروني<input type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></label>
   <label>كلمة المرور<input type="password" required value={password} onChange={e=>setPassword(e.target.value)}/></label>
   <button disabled={busy} type="submit">دخول</button></form></>:details?<>
   <p><strong>{details.client.name}</strong> يطلب اتصالًا بحسابك.</p>
   <p>الصلاحيات المطلوبة: {details.scope}</p>
   <p>وجهة العودة: {details.redirect_uri}</p>
   <p>وصلة VisionSeek تسمح بإنشاء مسودات وقراءتها فقط. النشر يظل داخل الاستوديو.</p>
   <button disabled={busy} onClick={()=>void decide(true)}>السماح</button>{' '}
   <button disabled={busy} onClick={()=>void decide(false)}>رفض</button>
  </>:<p>جاري تحميل تفاصيل الاتصال…</p>}
  {error&&<p role="alert">{error}</p>}
 </main>;
}
