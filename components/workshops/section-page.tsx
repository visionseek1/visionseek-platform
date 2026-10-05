import Link from "next/link";
import type { Locale } from "@/components/capability/content";
import { CapabilityHeader } from "@/components/capability/navigation";
import CapabilityFooter from "@/components/capability/footer";
import { workshopSection } from "@/lib/workshops/section";
import styles from "./section-page.module.css";

const email = "abdelalim@visionseek.org";
const whatsapp = "https://wa.me/821042419606";
const phone = "+82 10 4241 9606";

export default function WorkshopsSectionPage({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const text = workshopSection(locale);
  const home = ar ? "/ar" : "/";

  return (
    <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? "rtl" : "ltr"}>
      <CapabilityHeader locale={locale} path="/workshops" />
      <main id="main-content" className={styles.page}>
        <div className={styles.column}>
          <header className={styles.hero}>
            <nav className={styles.breadcrumb} aria-label={ar ? "مسار الصفحة" : "Breadcrumb"}>
              <Link href={home}>{text.home}</Link>
              <span aria-hidden="true">/</span>
              <span>{text.name}</span>
            </nav>
            <h1>{text.name}</h1>
            <p className={styles.promise}>{text.promise}</p>
            <p className={styles.audience}>{text.audience}</p>
          </header>

          <section className={styles.how} aria-labelledby="how-we-work">
            <h2 id="how-we-work">{text.how}</h2>
            <ol className={styles.blocks}>
              {text.blocks.map((block, index) => (
                <li key={block.title}>
                  <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{block.title}</h3>
                    <p>{block.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.offerSection} aria-labelledby="workshop-offer">
            <article className={styles.offer}>
              <p className={styles.status}>{text.offer.status}</p>
              <h2 id="workshop-offer">{text.offer.title}</h2>
              <dl>
                <dt>{text.offer.forLabel}</dt>
                <dd>{text.offer.for}</dd>
                <dt>{text.offer.outputLabel}</dt>
                <dd>{text.offer.output}</dd>
                <dt>{text.offer.formatLabel}</dt>
                <dd>{text.offer.format}</dd>
              </dl>
            </article>
          </section>

          <section className={styles.cta} aria-labelledby="workshop-cta">
            <h2 id="workshop-cta">{text.cta}</h2>
            <div className={styles.channels}>
              <a href={`mailto:${email}`}>
                <span>{text.email}</span>
                <strong>{email}</strong>
              </a>
              <a href={whatsapp} target="_blank" rel="noreferrer">
                <span>{text.whatsapp}</span>
                <strong dir="ltr">{phone}</strong>
              </a>
            </div>
          </section>
        </div>
      </main>
      <CapabilityFooter locale={locale} />
    </div>
  );
}
