/** Gulf clocks as specified for News: GMT+4, labelled بتوقيت الخليج (GMT+4). */
export const GULF_TIME_ZONE = 'Asia/Dubai';
export const GULF_OFFSET_LABEL = 'GMT+4';

export type GulfStamp = {
  iso: string;
  date: string;
  time: string;
  label: string;
  short: string;
  publishedLine: string;
  updatedLine: string;
};

const dateFmt = (locale: 'ar' | 'en') =>
  new Intl.DateTimeFormat(locale === 'ar' ? 'ar-u-ca-gregory-nu-latn' : 'en-GB', {
    timeZone: GULF_TIME_ZONE,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const timeFmt = (locale: 'ar' | 'en') =>
  new Intl.DateTimeFormat(locale === 'ar' ? 'ar-u-ca-gregory-nu-latn' : 'en-GB', {
    timeZone: GULF_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

export function formatGulfTime(iso: string, locale: 'ar' | 'en'): GulfStamp {
  const date = new Date(iso);
  const label = locale === 'ar' ? `بتوقيت الخليج (${GULF_OFFSET_LABEL})` : `Gulf time (${GULF_OFFSET_LABEL})`;
  const day = dateFmt(locale).format(date);
  const clock = timeFmt(locale).format(date);
  const short = locale === 'ar' ? `${day}، ${clock} ${label}` : `${day}, ${clock} ${label}`;
  return {
    iso,
    date: day,
    time: clock,
    label,
    short,
    publishedLine: locale === 'ar' ? `نُشر ${short}` : `Published ${short}`,
    updatedLine: locale === 'ar' ? `حُدّث ${short}` : `Updated ${short}`,
  };
}

const arUnit = (n: number, one: string, two: string, few: string, many: string): string => {
  if (n === 1) return one;
  if (n === 2) return two;
  if (n >= 3 && n <= 10) return `${n} ${few}`;
  return `${n} ${many}`;
};

export function formatRelativeTime(iso: string, locale: 'ar' | 'en', now = Date.now()): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return formatGulfTime(iso, locale).short;
  const delta = now - then;
  if (delta < 0) return locale === 'ar' ? 'بعد قليل' : 'shortly';
  const seconds = Math.round(delta / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  if (locale === 'ar') {
    if (seconds < 45) return 'منذ لحظات';
    if (minutes < 2) return 'منذ دقيقة';
    if (minutes < 45) return `منذ ${arUnit(minutes, 'دقيقة', 'دقيقتين', 'دقائق', 'دقيقة')}`;
    if (hours < 2) return 'منذ ساعة';
    if (hours < 22) return `منذ ${arUnit(hours, 'ساعة', 'ساعتين', 'ساعات', 'ساعة')}`;
    if (days < 2) return 'منذ يوم';
    if (days < 26) return `منذ ${arUnit(days, 'يوم', 'يومين', 'أيام', 'يومًا')}`;
    return formatGulfTime(iso, locale).date;
  }
  const rtf = new Intl.RelativeTimeFormat('en', {numeric: 'auto'});
  if (seconds < 45) return 'just now';
  if (minutes < 45) return rtf.format(-Math.max(1, minutes), 'minute');
  if (hours < 22) return rtf.format(-Math.max(1, hours), 'hour');
  if (days < 26) return rtf.format(-Math.max(1, days), 'day');
  return formatGulfTime(iso, locale).date;
}
