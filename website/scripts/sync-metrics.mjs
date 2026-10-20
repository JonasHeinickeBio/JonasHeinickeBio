// Copies the generated lowlighter/metrics SVGs from the repo root into public/metrics/
// so they ship with the site. Runs before `dev` and `build`; missing files are skipped.
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../', import.meta.url));
const out = fileURLToPath(new URL('../public/metrics/', import.meta.url));
const files = ['github-metrics.svg', 'metrics.plugin.isocalendar.fullyear.svg'];

mkdirSync(out, { recursive: true });
for (const f of files) {
  if (existsSync(root + f)) copyFileSync(root + f, out + f);
  else console.warn(`sync-metrics: ${f} not found, skipping`);
}
