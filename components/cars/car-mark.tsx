/** A plain car outline: an illustration of the category, never a picture of a real model. */
export default function CarMark({className}: {className?: string}) {
  return <svg className={className} viewBox="0 0 122 60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true" focusable="false">
    <path d="M8 44V34c0-4 3-6.5 8-7l20-3c7-8 14-12 24-12h20c9 0 15 4 20 12l8 2c4 1 6 4 6 8v10h-6a10 10 0 0 0-20 0H44a10 10 0 0 0-20 0z"/>
    <path d="M41 25c6-6 11-8.5 19-8.5h20c6 0 10 3 14 8.5z"/>
    <path d="M67 16.5V25"/>
    <circle cx="98" cy="44" r="7"/>
    <circle cx="34" cy="44" r="7"/>
  </svg>;
}
