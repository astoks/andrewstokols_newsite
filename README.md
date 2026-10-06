# Andrew Stokols — clean site rebuild

This is a simplified Vite + React + Tailwind rebuild of the site.

## Why this version is easier to maintain
- same single-page structure as the earlier site
- no CMS or admin dependency
- no runtime dependency on third-party RSS or ORCID APIs
- all editable content lives in `src/data/*.json`
- deploys automatically on Netlify when changes are pushed to `main`

## Edit content
Update these files:
- `src/data/site.json`
- `src/data/projects.json`
- `src/data/research.json`
- `src/data/design.json`
- `src/data/writing.json`
- `src/data/media.json`

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Deploy
The site is hosted on Netlify (`andrewstokols.netlify.app`, custom domain `andrewstokols.com`) and deploys automatically from the `main` branch of GitHub repo `astoks/andrewstokols_newsite`:

- build command: `npm run build`
- publish directory: `dist`

Push to `main` and the live site updates in about a minute.

`public/_redirects` sends every path to `index.html`, so URLs like `/projects/<slug>` load directly. Don't remove it.
