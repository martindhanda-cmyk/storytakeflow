import { readFileSync } from 'node:fs';
let fail = 0;
const check = (cond, msg) => { if (!cond) { fail++; console.log('FAIL', msg); } };
const pages = ['index.html','404.html','custom-songs/index.html','lyrics/index.html','lyrics/breathe/index.html','lyrics/excellent/index.html','lyrics/keep-walking/index.html','lyrics/kuzolunga/index.html','lyrics/you-can-do-it/index.html'];
for (const f of pages) {
  const t = readFileSync(f,'utf8');
  const matches = t.match(/<meta property="og:site_name" content="([^"]+)">/g) || [];
  check(matches.length === 1, f+' exactly one og:site_name');
  check(matches.length === 1 && matches[0].includes('content="Storytakeflow"'), f+' og:site_name is Storytakeflow');
  check(t.indexOf('property="og:type"') < t.indexOf('property="og:site_name"'), f+' site_name follows og:type');
  check(t.indexOf('property="og:site_name"') < t.indexOf('property="og:title"'), f+' site_name precedes og:title');
}
console.log(fail === 0 ? 'ALL PASS' : fail + ' FAILURES');
process.exit(fail ? 1 : 0);
