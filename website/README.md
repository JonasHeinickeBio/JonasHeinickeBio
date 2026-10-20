# Personal website

[Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com) + TypeScript, deployed to GitHub Pages by `.github/workflows/deploy-website.yml`.

Live at <https://jonasheinickebio.github.io/JonasHeinickeBio/>.

## Develop

Requires Node 22.22 or newer.

```bash
cd website
npm install
npm run dev      # http://localhost:4321/JonasHeinickeBio/
npm run build    # type-check + static build into dist/
```

## Edit content

| What | Where |
| --- | --- |
| Projects | `src/content/projects/*.md` (frontmatter: title, description, tags, repo, docs, pypi, featured, order) |
| Blog posts | `src/content/blog/*.md` (set `draft: true` to hide) |
| Bio, links, skills, CV entries | `src/consts.ts` |
| Pages | `src/pages/` |
| Colours and shared styles | `src/styles/global.css` |

## Deployment

In the repository settings, set **Pages → Source** to **GitHub Actions**. Pushes to `main` that touch `website/` deploy automatically. Pull requests only run the build.

The site is served from the `/JonasHeinickeBio` base path (see `astro.config.mjs`). Remove `base` if the site moves to a `jonasheinickebio.github.io` user-site repository.
