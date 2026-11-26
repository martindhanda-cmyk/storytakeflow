import { readFileSync } from 'node:fs';
let fail = 0;
const check = (cond, msg) => { if (!cond) { fail++; console.log('FAIL', msg); } };
const custom = readFileSync('custom-songs/index.html','utf8');
check(custom.includes('<a class="nav-custom" href="/custom-songs/" aria-current="page">Custom Songs</a>'), 'custom header');
check(custom.includes('<a href="/custom-songs/" aria-current="page">Custom Songs</a>'), 'custom footer');
check((custom.match(/aria-current/g)||[]).length === 2, 'custom count==2');
for (const f of ['lyrics/index.html','lyrics/breathe/index.html','lyrics/excellent/index.html','lyrics/keep-walking/index.html','lyrics/kuzolunga/index.html','lyrics/you-can-do-it/index.html']) {
  const t = readFileSync(f,'utf8');
  check(t.includes('<a class="nav-lyrics" href="/lyrics/" aria-current="page">Lyrics</a>'), f+' header');
  check(t.includes('<a href="/lyrics/" aria-current="page">Lyrics</a>'), f+' footer');
  check((t.match(/aria-current/g)||[]).length === 2, f+' count==2');
}
const home = readFileSync('index.html','utf8');
check(!home.includes('aria-current'), 'home has none');
console.log(fail === 0 ? 'ALL PASS' : fail + ' FAILURES');
process.exit(fail ? 1 : 0);
