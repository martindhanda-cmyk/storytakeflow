import { readFileSync } from 'node:fs';
let fail = 0;
const check = (cond, msg) => { if (!cond) { fail++; console.log('FAIL', msg); } };
const pages = ['index.html','404.html','custom-songs/index.html','lyrics/index.html','lyrics/breathe/index.html','lyrics/excellent/index.html','lyrics/keep-walking/index.html','lyrics/kuzolunga/index.html','lyrics/you-can-do-it/index.html'];
for (const f of pages) {
  const t = readFileSync(f,'utf8');
  const og = t.match(/<meta property="og:image:alt" content="([^"]+)">/);
  const tw = t.match(/<meta name="twitter:image:alt" content="([^"]+)">/);
  check(!!og, f+' og:image:alt present');
  check(!!tw, f+' twitter:image:alt present');
  check(og && tw && og[1] === tw[1], f+' twitter:image:alt matches og:image:alt');
  check(t.indexOf('name="twitter:image"') < t.indexOf('name="twitter:image:alt"'), f+' alt follows twitter:image');
}
console.log(fail === 0 ? 'ALL PASS' : fail + ' FAILURES');
process.exit(fail ? 1 : 0);
