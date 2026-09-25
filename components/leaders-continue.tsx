import Link from "next/link";
import { briefEntries, briefHref, continueFor, type Locale } from "@/lib/brief";

export default function LeadersContinue({ locale, slug }: { locale: Locale; slug: string }) {
  const entry = briefEntries.find((item) => item.slug === slug);
  if (!entry) return null;
  const ar = locale === "ar";
  const { next, related, learn } = continueFor(entry, briefEntries);
  const titleOf = (item: { title: { en: string; ar: string } }) => (ar ? item.title.ar : item.title.en);

  return (
    <section className="leaders-continue">
      <div className="leaders-next">
        <h2>{ar ? "التالي في المجال" : "Next in this field"}</h2>
        {next ? (
          <Link href={briefHref(locale, next.slug)}>{titleOf(next)}</Link>
        ) : (
          <Link href={briefHref(locale)}>{ar ? "العودة إلى بيت القادة" : "Back to Leaders House"}</Link>
        )}
      </div>
      <div className="leaders-related">
        <h2>{ar ? "مواد قريبة" : "Related"}</h2>
        <ul>
          {related.length ? related.map((item) => (
            <li key={item.slug}><Link href={briefHref(locale, item.slug)}>{titleOf(item)}</Link></li>
          )) : (
            <li><Link href={briefHref(locale)}>{ar ? "العودة إلى بيت القادة" : "Back to Leaders House"}</Link></li>
          )}
        </ul>
      </div>
      {learn ? (
        <div className="leaders-learn-continue">
          <h2>{ar ? "أكمل التعلّم" : "Continue learning"}</h2>
          <Link href={briefHref(locale, learn.slug)}>{titleOf(learn)}</Link>
        </div>
      ) : null}
    </section>
  );
}
