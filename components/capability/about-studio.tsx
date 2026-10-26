import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {CapabilityHeader} from "./navigation";
import CapabilityFooter from "./footer";
import {about, type StudioLink, type StudioOffer} from "@/lib/about";
import type {Locale} from "./content";

/** Wide About page: one identity line, then equal-weight doors. No founder photograph. */
export default function AboutStudio({locale}: {locale: Locale}) {
  const ar = locale === "ar";
  const p = ar ? "/ar" : "";
  const tx = (v: {en: string; ar: string}) => (ar ? v.ar : v.en);
  const page = about.studio;
  const href = (path: string) => `${p}${path}`;

  return (
    <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? "rtl" : "ltr"}>
      <CapabilityHeader locale={locale} path="/about"/>
      <main id="main-content" className="vs-studio">
        <section className="vs-studio-hero">
          <nav className="vs-breadcrumb" aria-label={ar ? "مسار الصفحة" : "Breadcrumb"}>
            <Link href={p || "/"}>{ar ? "الرئيسية" : "Home"}</Link>
            <span>/</span>
            <span>{tx(page.label)}</span>
          </nav>
          <p className="vs-eyebrow">{tx(page.label)}</p>
          <h1>{tx(page.openingTitle)}</h1>
          <p className="vs-studio-lead">{tx(page.openingLead)}</p>
        </section>

        <section className="vs-studio-vision" id="vision">
          <p className="vs-eyebrow">{tx(page.vision.eyebrow)}</p>
          <h2>{tx(page.vision.line)}</h2>
        </section>

        <section className="vs-studio-block" id="what-we-do">
          <h2 className="vs-studio-kicker">{tx(page.offerings.eyebrow)}</h2>
          <div className="vs-studio-offers">
            {page.offerings.items.map(item => (
              <Offer key={item.id} item={item} href={href} tx={tx}/>
            ))}
          </div>
        </section>

        <section className="vs-studio-block vs-studio-principles" id="principles">
          <h2 className="vs-studio-kicker">{tx(page.principles.eyebrow)}</h2>
          <div className="vs-studio-principle-grid">
            {page.principles.items.map((item, index) => (
              <article key={item.en}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{tx(item)}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="vs-studio-founder" id="founder">
          <p className="vs-eyebrow">{tx(page.founder.eyebrow)}</p>
          <h2 className="vs-studio-founder-line">{tx(page.founder.line)}</h2>
        </section>

        <section className="vs-studio-next" id="next">
          <p className="vs-eyebrow">{tx(page.next.eyebrow)}</p>
          <h2>{tx(page.next.title)}</h2>
          <Link className="vs-button" href={href(page.next.href)}>
            {tx(page.next.button)}
            <ArrowRight size={20} aria-hidden="true"/>
          </Link>
        </section>
      </main>
      <CapabilityFooter locale={locale}/>
    </div>
  );
}

function Offer({item, href, tx}: {
  item: StudioOffer;
  href: (path: string) => string;
  tx: (v: {en: string; ar: string}) => string;
}) {
  const body = (
    <>
      <h3>{tx(item.title)}</h3>
      <p>{tx(item.line)}</p>
    </>
  );
  if (item.links.length === 1) {
    const link = item.links[0];
    return (
      <Link className="vs-studio-card" href={href(link.href)}>
        {body}
        <span className="vs-studio-card-go">{tx(link.label)}<ArrowRight size={18} aria-hidden="true"/></span>
      </Link>
    );
  }
  return (
    <article className="vs-studio-card">
      {body}
      <div className="vs-studio-card-links">
        {item.links.map((link: StudioLink) => (
          <Link key={link.href} href={href(link.href)}>
            {tx(link.label)}
            <ArrowRight size={18} aria-hidden="true"/>
          </Link>
        ))}
      </div>
    </article>
  );
}
