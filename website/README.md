# Personal Website

This folder contains the source files for my personal website, which is built with Jekyll and deployed to GitHub Pages.

## Structure

- `index.md` - Home page
- `about.md` - About page
- `_config.yml` - Jekyll configuration

## Adding Content

To add new pages:
1. Create a new `.md` file in this directory
2. Add front matter at the top:
   ```yaml
   ---
   layout: default
   title: Your Page Title
   ---
   ```
3. Write your content in Markdown below the front matter
4. Commit and push - the site will automatically rebuild

## Local Development

To test locally:
```bash
cd website
gem install bundler jekyll
bundle init
bundle add jekyll minima
bundle exec jekyll serve
```

Then visit `http://localhost:4000` in your browser.

## Deployment

The website is automatically deployed to GitHub Pages when changes are pushed to the main/master branch in the `website/` directory. The deployment is handled by the GitHub Actions workflow at `.github/workflows/deploy-website.yml`.

## Theme

This site uses the default [Minima](https://github.com/jekyll/minima) theme. You can customize it by:
- Editing `_config.yml` for site-wide settings
- Creating custom layouts in `_layouts/`
- Adding custom CSS in `assets/css/`

## Learn More

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Markdown Guide](https://www.markdownguide.org/)
