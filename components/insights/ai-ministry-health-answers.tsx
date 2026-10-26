import {ArabicLabReport} from './arabic-lab-report';
import {paper} from '@/lib/research/ai-ministry-health-answers';

export function AiMinistryHealthAnswers({locale}: {locale: 'ar' | 'en'}) {
  return <ArabicLabReport locale={locale} paper={paper}/>;
}
