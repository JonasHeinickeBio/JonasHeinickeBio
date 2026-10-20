import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Served as a GitHub Pages project site: https://jonasheinickebio.github.io/JonasHeinickeBio/
// If this ever moves to a user site (repo `jonasheinickebio.github.io`), drop `base`.
export default defineConfig({
  site: 'https://jonasheinickebio.github.io',
  base: '/JonasHeinickeBio',
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  markdown: { shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } } },
});
