import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';

const read = f => readFileSync(new URL(`../${f}`, import.meta.url), 'utf8');
const json = f => JSON.parse(read(f));

test('header keeps the axes and drops the sector menu', () => {
  const nav = json('content/navigation.json');
  const paths = nav.sections.map(s => s.path);
  for (const axis of ['/programs', '/projects', '/indices', '/institute']) assert.ok(paths.includes(axis), axis);
  assert.equal(nav.reports.path, '/reports');
  const institute = nav.sections.find(s => s.path === '/institute');
  assert.ok(institute.children.some(c => c.href === '/institute/masterclass' && c.en === 'Masterclass'));
  const projects = nav.sections.find(s => s.path === '/projects');
  assert.deepEqual(projects.children.map(c => c.href), [
    '/projects',
    '/projects/institutional-ai/agent-governance/proviso-ai',
    '/projects/institutional-ai/sovereign-ai/visionseek-box',
  ]);
  for (const section of [...nav.sections, nav.reports]) {
    for (const link of section.children) {
      assert.equal(/\/projects\/(energy|semiconductors|drones-aviation|defense|robotics|health|agriculture|infrastructure)\b/.test(link.href), false, link.href);
    }
  }
  assert.doesNotMatch(read('components/capability/navigation.tsx'), /projects#fields/);
});

test('retired sector landings redirect to Projects', () => {
  const redirects = read('next.config.ts');
  for (const sector of ['energy', 'semiconductors', 'drones-aviation', 'defense', 'robotics', 'health', 'agriculture', 'infrastructure']) {
    assert.match(redirects, new RegExp(`source: \`\\$\\{prefix\\}/projects/${sector}\`, destination: \`\\$\\{prefix\\}/projects\``));
  }
  const projects = read('lib/projects/index.ts');
  assert.match(projects, /export const retiredSectors/);
  assert.match(projects, /isRetiredSector/);
});
