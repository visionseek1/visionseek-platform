'use client';
import {Analytics} from '@vercel/analytics/react';
import {publicAnalyticsUrl} from '@/lib/public-analytics';
export default function PublicAnalytics(){
 return <Analytics beforeSend={event=>{
  if(navigator.doNotTrack==='1'||(navigator as Navigator & {globalPrivacyControl?:boolean}).globalPrivacyControl)return null;
  if(event.type!=='pageview')return null;
  const url=publicAnalyticsUrl(event.url);return url?{...event,url}:null;
 }}/>;
}
