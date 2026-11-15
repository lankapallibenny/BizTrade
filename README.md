# BizTrade

Landing page for the BizTrade trading-education website — a single-page site for
beginners: what you learn, the learning path, a safety checklist, FAQ, and a
contact form that opens the visitor's email app.

**100% educational. Not financial advice. Trading involves risk.**

## Run locally

Any static server works. Two options:

```bash
node serve.js          # http://localhost:3000  (no dependencies)
python3 -m http.server 3000
```

## Deploy

The site is fully static. A GitHub Pages workflow is included in
`.github/workflows/pages.yml`: in the repo go to **Settings → Pages → Build and
deployment → Source: GitHub Actions**, and every push to `main` publishes the site.

## Files

- `index.html` — the whole site (HTML, CSS and JS inline, no build step)
- `og-image.png` — social share card (1200×630)
- `serve.js` — minimal static server for local preview
- `.nojekyll` — tells GitHub Pages to serve files as-is

## Editing content

| What | Where in `index.html` |
| --- | --- |
| Headline / hero copy | `<header class="hero">` |
| Lessons list | the `.row` blocks under `#learn` |
| Learning steps | the `.step` blocks under `#path` |
| Safety checklist | the `rules` array in the `<script>` |
| FAQ | the `<details>` blocks under `#start` |
| Email address | `mailto:` link in `#contact` and `const EM` in the script |
| Colors | CSS variables in `:root` (`--green`, `--ink`, …) |

Note: the contact form has no backend — it builds a `mailto:` link so messages
land in your inbox with no server or third-party form service.
