# Andrew Stokols — clean site rebuild

This is a simplified Vite + React + Tailwind rebuild of the site.

## Why this version is easier to maintain
- same single-page structure as the earlier site
- no CMS or admin dependency
- no runtime dependency on third-party RSS or ORCID APIs
- all editable content lives in `src/data/*.json`
- straightforward deploy to S3 + CloudFront after `npm run build`

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
Upload the contents of `dist/` to your S3 bucket, then invalidate CloudFront.
