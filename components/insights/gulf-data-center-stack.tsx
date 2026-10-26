import {ArabicLabReport} from './arabic-lab-report';
import {paper} from '@/lib/research/gulf-data-center-stack';

export function GulfDataCenterStack({locale}: {locale: 'ar' | 'en'}) {
  return <ArabicLabReport locale={locale} paper={paper}/>;
}
