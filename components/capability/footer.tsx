import Image from 'next/image';
import Link from 'next/link';
import {institutionNav} from '@/lib/institution/navigation';
import type {Locale} from './content';
import {site} from '@/lib/site';
export default function CapabilityFooter({locale}:{locale:Locale}){const ar=locale==='ar';const p=ar?'/ar':'';
 return <footer className="vs-footer vs-institution-footer"><div className="vs-footer-brand"><div><div className="vs-footer-logo"><Image src="/visionseek-logo-color.png" alt="VisionSeek" width={2048} height={682}/></div><p>{ar?site.footerBlurb.ar:site.footerBlurb.en}</p></div><div><strong>{site.tagline}</strong><a href={`mailto:${site.email}`}>{site.email}</a><span>{ar?site.footerLocation.ar:site.footerLocation.en}</span></div></div><div className="vs-footer-map">{institutionNav.map(n=><nav key={n.path} aria-label={ar?n.ar:n.en}><h3><Link href={`${p}${n.path}`}>{ar?n.ar:n.en}</Link></h3>{n.children.map(({href,en,ar:arabic})=><Link key={href} href={`${p}${href}`}>{ar?arabic:en}</Link>)}</nav>)}</div><div className="vs-footer-bottom"><span>© 2026 VisionSeek</span><Link href={`${p}/method`}>{ar?'هندسة الفرص':'Engineering Opportunities'}</Link><nav aria-label={ar?'روابط قانونية':'Legal'}><Link href={`${p}/privacy`}>{ar?'الخصوصية':'Privacy'}</Link><Link href={`${p}/terms`}>{ar?'الشروط':'Terms'}</Link><Link href={`${p}/#contact`}>{ar?'تواصل':'Contact'}</Link></nav></div></footer>;
}
