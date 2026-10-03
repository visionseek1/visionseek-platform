import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import CapabilityHero from '@/components/capability/hero';
import {PharmaCard,Founder,ContactBand} from '@/components/focus/pages';
import type {PublicLocale as Locale} from '@/components/focus/locale';
import {LeadersSpotlight} from '@/components/focus/leaders-spotlight';
import {Achievements} from '@/components/focus/achievements';
export default function HomePage({locale}:{locale:Locale}) {
 return <div className={`vs-site locale-${locale}`} lang={locale} dir={locale==='ar'?'rtl':'ltr'}><CapabilityHeader locale={locale} overlay/><main id="main-content"><CapabilityHero locale={locale}/><PharmaCard locale={locale}/><LeadersSpotlight locale={locale}/><Founder locale={locale}/><Achievements locale={locale}/><ContactBand locale={locale}/></main><CapabilityFooter locale={locale}/></div>;
}
