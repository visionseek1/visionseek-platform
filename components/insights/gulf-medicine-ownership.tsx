import {ArabicLabReport} from './arabic-lab-report';
import {paper} from '@/lib/research/gulf-medicine-ownership';

export function GulfMedicineOwnership({locale}: {locale: 'ar' | 'en'}) {
  return <ArabicLabReport locale={locale} paper={paper}/>;
}
