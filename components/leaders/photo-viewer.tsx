'use client';
import {Dialog,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {ReaderDialogContent} from './reader-dialog';
import type {Locale} from '@/lib/leaders/types';
import styles from './photo-viewer.module.css';

export function PhotoViewer({photo,locale,onClose}:{photo:{url:string;title:string}|null;locale:Locale;onClose:()=>void}) {
 return <Dialog open={!!photo} onOpenChange={open=>{if(!open)onClose();}}><ReaderDialogContent className={styles.viewer} dir={locale==='ar'?'rtl':'ltr'}>
  <DialogTitle className={styles.title}>{photo?.title||''}</DialogTitle>
  <DialogDescription className={styles.srOnly}>{locale==='ar'?'الصورة كاملة. أغلق للعودة إلى نفس المنشور.':'Full image. Close to return to the same post.'}</DialogDescription>
  {/* User media has no intrinsic dimensions in the current catalog. */}
  {/* eslint-disable-next-line @next/next/no-img-element */}
  {photo&&<img className={styles.image} src={photo.url} alt={photo.title}/>}
 </ReaderDialogContent></Dialog>;
}
