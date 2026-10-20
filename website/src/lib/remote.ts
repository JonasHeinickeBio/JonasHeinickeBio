/**
 * Build-time lookups for live project metadata (GitHub stars, PyPI version).
 * Every call fails soft: offline or rate-limited builds simply omit the extras.
 */
const TIMEOUT_MS = 6000;
const cache = new Map<string, Promise<unknown>>();

async function getJson<T>(url: string, headers: Record<string, string> = {}): Promise<T | null> {
  if (!cache.has(url)) {
    cache.set(
      url,
      fetch(url, { headers: { 'User-Agent': 'jonasheinicke-website', ...headers }, signal: AbortSignal.timeout(TIMEOUT_MS) })
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    );
  }
  return (await cache.get(url)) as T | null;
}

export interface RepoMeta {
  stars: number;
  language: string | null;
  pushedAt: Date;
}

export async function getRepoMeta(repoUrl: string): Promise<RepoMeta | null> {
  const slug = new URL(repoUrl).pathname.replace(/^\/|\/$/g, '');
  const token = process.env.GITHUB_TOKEN;
  const data = await getJson<{ stargazers_count: number; language: string | null; pushed_at: string }>(
    `https://api.github.com/repos/${slug}`,
    { Accept: 'application/vnd.github+json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  );
  return data ? { stars: data.stargazers_count, language: data.language, pushedAt: new Date(data.pushed_at) } : null;
}

export async function getPypiVersion(pypiUrl: string): Promise<string | null> {
  const name = new URL(pypiUrl).pathname.split('/').filter(Boolean).pop();
  const data = await getJson<{ info: { version: string } }>(`https://pypi.org/pypi/${name}/json`);
  return data?.info.version ?? null;
}
