import Link from "next/link";
import {ArrowRight, Building2, Factory, Landmark, Microscope, Network} from "lucide-react";
import type {Locale} from "@/components/capability/content";
import {medical, type Bi} from "@/lib/medical";

const icons = {
  hospitals: Building2,
  pharma: Factory,
  pharmacies: Network,
  government: Landmark,
  research: Microscope,
} as const;

const tx = (ar: boolean) => (value: Bi) => (ar ? value.ar : value.en);

/** Home section. Each card opens its sector on the projects page. The top nav is unchanged. */
export default function WhoWeWorkWith({locale}: {locale: Locale}) {
  const ar = locale === "ar";
  const t = tx(ar);
  const p = ar ? "/ar" : "";
  const {home} = medical;
  return (
    <section className="vs-section vs-communities" id="who-we-work-with" aria-labelledby="who-we-work-with-title">
      <div className="vs-section-heading">
        <div>
          <p className="vs-eyebrow">{t(home.eyebrow)}</p>
          <h2 id="who-we-work-with-title">{t(home.title)}</h2>
        </div>
        <div>
          <p>{t(home.intro)}</p>
          <Link className="vs-text-link" href={`${p}/fields`}>
            {t(home.fieldsLink)}
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
      <div className="vs-community-grid">
        {medical.sectors.map(sector => {
          const Icon = icons[sector.slug as keyof typeof icons] ?? Building2;
          return (
            <Link className="vs-community-card" href={`${p}/projects#${sector.slug}`} key={sector.slug}>
              <Icon size={40} strokeWidth={1.25} />
              <h3>{t(sector.title)}</h3>
              <p>{t(sector.problem)}</p>
              <ArrowRight className="vs-card-arrow" size={22} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
