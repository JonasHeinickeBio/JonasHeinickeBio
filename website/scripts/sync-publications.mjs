// Builds src/data/publications.json from the public ORCID record + Europe PMC metadata.
// Runs before `dev` and `build`. If either service is unreachable, the committed file is kept.
// A DOI that Europe PMC does not return this time keeps its previously committed entry, so a
// partial response never drops a publication. DOIs removed from the ORCID record are dropped.
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ORCID = '0000-0002-8442-3187';
const CHUNK = 20; // DOIs per Europe PMC query, keeps each result set well under the page size
const out = fileURLToPath(new URL('../src/data/publications.json', import.meta.url));

const getJson = async (url) => {
  const res = await fetch(url, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`${res.status} from ${new URL(url).host}`);
  return res.json();
};
const strip = (s = '') => s.replace(/<[^>]+>/g, '').replace(/\.$/, '').trim();

function readCommitted() {
  try {
    return JSON.parse(readFileSync(out, 'utf8'));
  } catch {
    return [];
  }
}

// Write next to the target, then rename, so a failed write never leaves truncated JSON behind.
function writeAtomic(path, text) {
  const tmp = `${path}.tmp`;
  try {
    writeFileSync(tmp, text);
    renameSync(tmp, path);
  } catch (e) {
    rmSync(tmp, { force: true });
    throw e;
  }
}

try {
  const works = await getJson(`https://pub.orcid.org/v3.0/${ORCID}/works`);
  const dois = [
    ...new Set(
      works.group
        .flatMap((g) => g['external-ids']['external-id'])
        .filter((e) => e['external-id-type'] === 'doi')
        .map((e) => e['external-id-value'].toLowerCase()),
    ),
  ];
  if (!dois.length) throw new Error('no DOIs in ORCID record');

  const fresh = new Map();
  for (let i = 0; i < dois.length; i += CHUNK) {
    const query = encodeURIComponent(
      dois
        .slice(i, i + CHUNK)
        .map((d) => `DOI:"${d}"`)
        .join(' OR '),
    );
    const epmc = await getJson(
      `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${query}&format=json&pageSize=100&resultType=lite`,
    );
    for (const r of epmc.resultList.result) {
      const doi = r.doi?.toLowerCase();
      if (!doi || fresh.has(doi)) continue;
      fresh.set(doi, {
        title: strip(r.title),
        authors: strip(r.authorString),
        journal: r.journalTitle ?? null,
        year: Number(r.pubYear),
        doi: r.doi,
        preprint: r.source === 'PPR' || !r.journalTitle,
      });
    }
  }

  const prior = readCommitted();
  const committed = new Map(
    (Array.isArray(prior) ? prior : [])
      .filter((p) => typeof p?.doi === 'string')
      .map((p) => [p.doi.toLowerCase(), p]),
  );
  const pubs = [];
  for (const doi of dois) {
    const pub = fresh.get(doi) ?? committed.get(doi);
    if (pub) pubs.push(pub);
    else console.warn(`sync-publications: no metadata for ${doi}, skipping`);
    if (!fresh.has(doi) && committed.has(doi)) console.warn(`sync-publications: kept committed entry for ${doi}`);
  }
  if (!pubs.length) throw new Error('no publications resolved');
  pubs.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));

  mkdirSync(dirname(out), { recursive: true });
  writeAtomic(out, JSON.stringify(pubs, null, 2) + '\n');
  console.log(`sync-publications: ${pubs.length} publications`);
} catch (e) {
  console.warn(`sync-publications: ${e.message}; keeping existing file`);
  if (!existsSync(out)) writeAtomic(out, '[]\n');
}
