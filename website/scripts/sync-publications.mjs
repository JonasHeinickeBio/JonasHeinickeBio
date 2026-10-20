// Builds src/data/publications.json from the public ORCID record + Europe PMC metadata.
// Runs before `dev` and `build`. If either service is unreachable, the committed file is kept.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ORCID = '0000-0002-8442-3187';
const out = fileURLToPath(new URL('../src/data/publications.json', import.meta.url));
const opts = { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(10000) };

const strip = (s = '') => s.replace(/<[^>]+>/g, '').replace(/\.$/, '').trim();

try {
  const works = await (await fetch(`https://pub.orcid.org/v3.0/${ORCID}/works`, opts)).json();
  const dois = [
    ...new Set(
      works.group
        .flatMap((g) => g['external-ids']['external-id'])
        .filter((e) => e['external-id-type'] === 'doi')
        .map((e) => e['external-id-value'].toLowerCase()),
    ),
  ];
  if (!dois.length) throw new Error('no DOIs in ORCID record');

  const query = encodeURIComponent(dois.map((d) => `DOI:"${d}"`).join(' OR '));
  const epmc = await (
    await fetch(
      `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${query}&format=json&pageSize=100&resultType=lite`,
      opts,
    )
  ).json();

  const byDoi = new Map();
  for (const r of epmc.resultList.result) {
    const doi = r.doi?.toLowerCase();
    if (!doi || byDoi.has(doi)) continue;
    byDoi.set(doi, {
      title: strip(r.title),
      authors: strip(r.authorString),
      journal: r.journalTitle ?? null,
      year: Number(r.pubYear),
      doi: r.doi,
      preprint: r.source === 'PPR' || !r.journalTitle,
    });
  }
  const pubs = [...byDoi.values()].sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
  if (!pubs.length) throw new Error('Europe PMC returned nothing');

  mkdirSync(fileURLToPath(new URL('../src/data/', import.meta.url)), { recursive: true });
  writeFileSync(out, JSON.stringify(pubs, null, 2) + '\n');
  console.log(`sync-publications: ${pubs.length} publications`);
} catch (e) {
  console.warn(`sync-publications: ${e.message}; keeping existing file`);
  if (!existsSync(out)) writeFileSync(out, '[]\n');
}
