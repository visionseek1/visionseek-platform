import type {PublicLocale} from './locale';
import {pick} from './locale';
import styles from './focus.module.css';
type Achievement = {id:string; title:Record<PublicLocale,string>; documentUrl:string; signedAt:string; publicationApproved:boolean};
// No entries until a signed document AND permission to disclose it are recorded.
export const achievements:Achievement[]=[];
export function Achievements({locale}:{locale:PublicLocale}) {
 const visible=achievements.filter(a=>a.publicationApproved&&a.documentUrl&&a.signedAt);
 return <section id="achievements" className={styles.section} hidden={!visible.length} aria-label={pick(locale,'إنجازات موثقة','Documented milestones','문서로 확인된 성과')}>{visible.length>0&&<h2>{pick(locale,'إنجازات موثقة','Documented milestones','문서로 확인된 성과')}</h2>}{visible.map(a=><article key={a.id}><h3>{a.title[locale]}</h3><time>{a.signedAt}</time><a href={a.documentUrl}>{pick(locale,'الوثيقة المعتمدة','Approved document','공개 승인 문서')}</a></article>)}</section>;
}
