import {t, type Entry, type Text} from './schema';
import {readContentDir} from './content-files';

/**
 * Programs VisionSeek offers to institutions (e.g. Proofline), as opposed to the six program concepts in content/programs.
 * Each one is a page of its own at /programs/<slug>, written with the presentation method in docs/project-page-method.md.
 * Edited from /admin («البرامج المقدَّمة»). Server-side only: the content is read with node:fs.
 */
export type OfferedSource = {title:string; url:string};
export type OfferedAudience = 'government'|'institution'|'company'|'individual';
export type OfferedProgram = {
  position?:number; slug:string; code:string; name:string; logo:string; tone:string; image:string;
  /** The real status, shown on the page and in the programs directory. */
  status:Text; summary:Text;
  hook:Text; question:Text; promise:Text;
  profile:{audiences:OfferedAudience[]; facts:{kind:'trend'|'exhibition'; title:Text; detail:Text; url:string; value?:string}[]};
  /** Written for this program: it names what the reader is doing now. */
  risksTitle:Text;
  fears:{title:Text; body:Text; figure?:Text; sources:OfferedSource[]}[];
  scenario:{title:Text; setup:Text; without:Text; with:Text; note:Text};
  gains:{who:Text; text:Text}[];
  whyNow:{highlights:{value:Text; text:Text}[]; paragraph:Text; sources:OfferedSource[]};
  edges:(Text & {sources?:OfferedSource[]})[];
  stages:{id:string; name:Text; duration:Text; body:Text; optional?:boolean}[];
  conditions:Text[];
  cta:Text; contactTitle:Text;
};

export const offeredPrograms:OfferedProgram[] = readContentDir<OfferedProgram>('offered-programs');
export const offeredProgramBySlug = (slug:string) => offeredPrograms.find(program => program.slug === slug);

/** Directory cards on /programs. The page itself is rendered by components/programs/offered-program.tsx. */
export const offeredProgramEntries:Entry[] = offeredPrograms.map(program => ({
  section:'programs', slug:program.slug, code:program.code,
  title:{en:program.name, ar:program.name}, summary:program.summary,
  category:t('Program','برنامج'), status:program.status, image:program.image, blocks:[],
}));

/** Every source the page cites, once. */
export const offeredProgramSources = (program:OfferedProgram):OfferedSource[] => {
  const all = [
    ...program.fears.flatMap(fear => fear.sources),
    ...program.whyNow.sources,
    ...program.edges.flatMap(edge => edge.sources ?? []),
    ...program.profile.facts.map(fact => ({title:fact.title.en, url:fact.url})),
  ];
  return all.filter((source, i) => all.findIndex(other => other.url === source.url) === i);
};
