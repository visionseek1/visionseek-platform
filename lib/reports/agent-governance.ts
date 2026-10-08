import data from '@/content/reports/agent-governance.json';

/** The agent governance brief (/reports/agent-governance). Plain JSON import; every claim carries its sources. */
export type Text = {ar: string; en: string};
export type Source = {title: string; url: string};
export type Sourced = Text & {sources: Source[]};
export type AgentGovernanceBrief = {
  slug: string; date: string; label: Text; dateLabel: Text; title: Text; subtitle: Text;
  summary: Text[]; changed: Sourced[];
  fears: (Sourced & {title: Text; figure?: Text})[];
  law: {country: Text; inForce: Text; agent: Text; sources: Source[]}[];
  world: Sourced[]; checklist: Text[]; open: Text[]; perspective: Text; note: Text;
};
export const brief = data as AgentGovernanceBrief;
export const briefSources = (): Source[] => {
  const all = [...brief.changed, ...brief.fears, ...brief.world].flatMap(item => item.sources).concat(brief.law.flatMap(row => row.sources));
  return all.filter((s, i) => all.findIndex(x => x.url === s.url) === i);
};
