'use client';
import {useRef,type ComponentProps} from 'react';
import {X} from 'lucide-react';
import {DialogContent,DialogClose} from '@/components/ui/dialog';
import styles from './leaders.module.css';
/** Controlled reader dialogs have no Radix Trigger: restore their actual opener. */
export function ReaderDialogContent({children,showCloseButton=true,dir,...props}:ComponentProps<typeof DialogContent>){
 const opener=useRef<HTMLElement|null>(null);
 return <DialogContent {...props} dir={dir} showCloseButton={false}
  onOpenAutoFocus={event=>{opener.current=document.activeElement instanceof HTMLElement?document.activeElement:null;props.onOpenAutoFocus?.(event);}}
  onCloseAutoFocus={event=>{props.onCloseAutoFocus?.(event);if(!event.defaultPrevented&&opener.current?.isConnected){event.preventDefault();opener.current.focus({preventScroll:true});}}}>
  {children}{showCloseButton&&<DialogClose className={styles.readerClose} aria-label={dir==='rtl'?'إغلاق':'Close'}><X size={20}/></DialogClose>}
 </DialogContent>;
}
