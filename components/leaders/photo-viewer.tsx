'use client';
import {useRef} from 'react';
import {Dialog} from 'radix-ui';
import {X} from 'lucide-react';
import type {Locale} from '@/lib/leaders/types';
import styles from './photo-viewer.module.css';

/** Immersive content uses its own positioning, without the centered reader dialog's transforms. */
export function PhotoViewer({photo,locale,onClose}:{photo:{url:string;title:string}|null;locale:Locale;onClose:()=>void}) {
 const opener=useRef<HTMLElement|null>(null);
 return <Dialog.Root open={!!photo} onOpenChange={open=>{if(!open)onClose();}}><Dialog.Portal><Dialog.Overlay className={styles.overlay}/><Dialog.Content className={styles.viewer} dir={locale==='ar'?'rtl':'ltr'} onOpenAutoFocus={()=>{opener.current=document.activeElement instanceof HTMLElement?document.activeElement:null;}} onCloseAutoFocus={event=>{if(opener.current?.isConnected){event.preventDefault();opener.current.focus({preventScroll:true});}}}>
  <Dialog.Title className={styles.title}>{photo?.title||''}</Dialog.Title>
  <Dialog.Description className={styles.srOnly}>{locale==='ar'?'الصورة كاملة. أغلق للعودة إلى نفس المنشور.':'Full image. Close to return to the same post.'}</Dialog.Description>
  {/* User media has no intrinsic dimensions in the current catalog. */}
  {/* eslint-disable-next-line @next/next/no-img-element */}
  {photo&&<img className={styles.image} src={photo.url} alt={photo.title}/>}
  <Dialog.Close className={styles.close} aria-label={locale==='ar'?'إغلاق الصورة':'Close image'}><X size={22}/></Dialog.Close>
 </Dialog.Content></Dialog.Portal></Dialog.Root>;
}
