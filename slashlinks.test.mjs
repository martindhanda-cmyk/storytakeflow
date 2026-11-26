import { readFileSync } from 'node:fs';
let fail = 0;
const check = (cond, msg) => { if (!cond) { fail++; console.log('FAIL', msg); } };
const pages = ['index.html','404.html','custom-songs/index.html','lyrics/index.html','lyrics/breathe/index.html','lyrics/excellent/index.html','lyrics/keep-walking/index.html','lyrics/kuzolunga/index.html','lyrics/you-can-do-it/index.html'];
for (const f of pages) {
  const t = readFileSync(f,'utf8');
  check(!t.includes('href="/custom-songs"'), f+' bare /custom-songs href');
  check(!t.includes('href="/lyrics"'), f+' bare /lyrics href');
  check(!/href="\/lyrics\/[a-z0-9-]+"/.test(t), f+' bare lyrics-song href');
  check(!t.includes('a[href="/custom-songs"]'), f+' bare custom selector');
  check(!t.includes('a[href="/lyrics"]'), f+' bare lyrics selector');
  check(t.includes('href="/custom-songs/"'), f+' slashed custom link present');
  check(t.includes('href="/lyrics/"'), f+' slashed lyrics link present');
}
console.log(fail === 0 ? 'ALL PASS' : fail + ' FAILURES');
process.exit(fail ? 1 : 0);
