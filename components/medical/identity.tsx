import Link from "next/link";
import {ArrowRight} from "lucide-react";
import type {Locale} from "@/components/capability/content";
import {medical, type Bi} from "@/lib/medical";
import {Journey, Session} from "./pages";
import styles from "./medical.module.css";

const tx = (ar: boolean) => (value: Bi) => (ar ? value.ar : value.en);

/** Identity and the journey. The top nav is unchanged; these links are the way in. */
export default function MedicalIdentity({locale}: {locale: Locale}) {
  const ar = locale === "ar";
  const t = tx(ar);
  const p = ar ? "/ar" : "";
  const {identity, cross} = medical;
  return (
    <>
      <section className={`vs-section ${styles.identity}`} id="medical-identity" aria-labelledby="medical-identity-title">
        <p className="vs-eyebrow">{t(identity.eyebrow)}</p>
        <h2 id="medical-identity-title">{t(identity.title)}</h2>
        <p>{t(identity.problem)}</p>
        <p>{t(identity.insights)}</p>
        <div className={styles.links}>
          <Link href={`${p}/masterclass`}>{t(cross.education)} <ArrowRight size={18} /></Link>
          <Link href={`${p}/system`}>{t(cross.system)} <ArrowRight size={18} /></Link>
          <Link href={`${p}/fields`}>{t(cross.fields)} <ArrowRight size={18} /></Link>
          <Link href={`${p}/#who-we-work-with`}>{t(cross.who)} <ArrowRight size={18} /></Link>
        </div>
      </section>
      <Journey locale={locale} />
      <Session locale={locale} />
    </>
  );
}
