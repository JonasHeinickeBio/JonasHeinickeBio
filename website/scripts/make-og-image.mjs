// Renders public/og.png (1200x630 social preview). Run manually with `npm run og` when the
// name, role or tagline changes; the PNG is committed so builds do not depend on system fonts.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const out = fileURLToPath(new URL('../public/og.png', import.meta.url));
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#020617"/>
      <stop offset="1" stop-color="#0f2e2b"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#5eead4"/>
      <stop offset="1" stop-color="#38bdf8"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="80" y="96" width="96" height="8" rx="4" fill="url(#accent)"/>
  <text x="80" y="230" font-family="DejaVu Sans, Arial, sans-serif" font-size="92" font-weight="700" fill="#ffffff">Jonas Heinicke</text>
  <text x="80" y="310" font-family="DejaVu Sans, Arial, sans-serif" font-size="40" fill="#5eead4">PhD Researcher · Computational Biology</text>
  <text x="80" y="420" font-family="DejaVu Sans, Arial, sans-serif" font-size="34" fill="#cbd5e1">ME/CFS patient data, scientific literature</text>
  <text x="80" y="470" font-family="DejaVu Sans, Arial, sans-serif" font-size="34" fill="#cbd5e1">and knowledge graphs for biomedical research</text>
  <text x="80" y="560" font-family="DejaVu Sans Mono, monospace" font-size="26" fill="#94a3b8">Helmholtz Centre for Infection Research · Braunschweig</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log(`wrote ${out}`);
