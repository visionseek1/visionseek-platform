import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import {coursePage, coursePath, workshop as governanceCourse, tx as courseText} from '@/lib/governance';
import {institute, localePath, tx, type Locale} from '@/lib/institute';
import {InterestButton} from '@/components/interest/interest-form';

export function InstituteWorkshopCard({locale, listingHref}: {locale: Locale; listingHref?: string}) {
  const href = localePath(locale, coursePath);
  const kind = tx(locale, institute.masterclassKind);

  return (
    <article className="vs-wl-offer vs-wl-course-card">
      <Link href={href}>
        <Image
          src={governanceCourse.cover[locale]}
          alt={courseText(locale, governanceCourse.coverAlt)}
          width={1600}
          height={900}
        />
      </Link>
      <div>
        <p className="vs-institute-kind">{listingHref ? <Link href={listingHref}>{kind}</Link> : kind}</p>
        <h2><Link href={href}>{tx(locale, institute.workshopTitle)}</Link></h2>
        <p>{tx(locale, institute.workshopLead)}</p>
        <p><span>{courseText(locale, governanceCourse.durationLabel)}</span> {courseText(locale, governanceCourse.soon)}</p>
        <p>{courseText(locale, governanceCourse.instructor)}</p>
        <InterestButton
          locale={locale}
          topic={courseText(locale, governanceCourse.title)}
          page={coursePage(locale)}
          label={courseText(locale, governanceCourse.subscribe)}
          className="vs-wl-btn is-lime"
        />
        <Link className="vs-wl-btn" href={href}>
          {tx(locale, institute.openWorkshop)}
          <ArrowRight size={18} aria-hidden />
        </Link>
      </div>
    </article>
  );
}
