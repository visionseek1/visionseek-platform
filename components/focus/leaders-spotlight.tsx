import Link from 'next/link';
import {ArrowUpRight,BookOpen} from 'lucide-react';
import {medicalReadings} from '@/lib/leaders/medical-edition';
import {pick,localePrefix,type PublicLocale} from './locale';
import styles from './focus.module.css';
export function LeadersSpotlight({locale}:{locale:PublicLocale}){
 const p=localePrefix(locale),t=(ar:string,en:string,ko:string)=>pick(locale,ar,en,ko);
 return <section id="leaders-house" className={styles.leadersSpotlight}>
  <div className={styles.spotlightHeading}><div><p>{t('بيت القادة / الصحة والدواء','LEADERS HOUSE / HEALTH & PHARMA','리더스 하우스 / 보건·제약')}</p><h2>{t('رؤية أوسع لما تستطيع مؤسستك امتلاكه.','A wider view of what your institution could make its own.','귀 기관이 갖출 수 있는 역량을 더 넓게 봅니다.')}</h2></div><Link href={`${p}/insights`}>{t('ادخل بيت القادة','Enter Leaders House','리더스 하우스 둘러보기')}<ArrowUpRight size={20}/></Link></div>
  <div className={styles.readingCards}>{medicalReadings.slice(0,3).map(r=><Link href={`${p}/insights?post=${r.id}`} key={r.id}><span><BookOpen size={16}/>{r.source!.label.split(' · ')[0]}</span><h3>{r.title[locale]}</h3><p>{r.intro[locale]}</p><span className={styles.readingAction}>{t('اقرأ الفكرة ومصدرها','Read the perspective & source','관점과 출처 읽기')}<ArrowUpRight size={17}/></span></Link>)}</div>
  <small>{t('قراءات في تجارب عالمية مستقلة، ومعناها للمؤسسات.','Readings on independent global initiatives and their institutional relevance.','독립적인 글로벌 사례와 기관에 갖는 의미를 살펴봅니다.')}</small>
 </section>;
}
