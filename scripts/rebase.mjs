// Post-build: when the site is served under a sub-path (e.g. https://micmas.github.io/michelemassontrottier.ca/),
// prefix root-relative links written in the content (href="/...", src="/...") with that path.
// Does nothing when PAGES_BASE is empty or "/" (custom domain).
import fs from 'node:fs';
import path from 'node:path';
const base = (process.env.PAGES_BASE || '/').replace(/\/$/, '');
if (!base) process.exit(0);
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
for (const f of walk('dist').filter((f) => f.endsWith('.html'))) {
  const s = fs.readFileSync(f, 'utf8');
  const out = s.replace(/(href|src)="\/(?!\/)/g, (m, a, off) => s.startsWith(base + '/', off + a.length + 2) ? m : `${a}="${base}/`);
  if (out !== s) fs.writeFileSync(f, out);
}
console.log(`rebased links under ${base}/`);
