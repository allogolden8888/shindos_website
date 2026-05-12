# Insurance Landing + Admin (University MVP)

Simple educational insurance project for the Uzbekistan market:
- `frontend` - Vue 3 + Vite + Naive UI landing page with 5 calculators
- `backend` - Next.js API + `/admin/` panel with JSON storage

## Features
- Light and dark themes
- i18n: `en`, `ru`, `uz`
- Insurance calculators:
  - Auto
  - Property
  - Health
  - Travel
  - Life
- Selling section with QR for application flow
- Admin panel at `/admin/`:
  - login/logout
  - structured forms for content, carousel slides, calculator rates, and image upload

## Run in development

### 1) Start backend
```bash
cd backend
npm install
npm run dev
```
Backend runs on `http://localhost:3000`.

### 2) Start frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.

## Environment

Frontend (`frontend/.env`):
```env
VITE_API_BASE_URL=http://localhost:3000
```

Optional backend env (`backend/.env.local`):
```env
FRONTEND_ORIGIN=http://localhost:5173
ADMIN_SESSION_SECRET=change-me
```

## Admin credentials (default)
- username: `admin`
- password: `admin123`

Password hash is stored in `backend/data/admin.json`.

## Production checks
```bash
cd frontend && npm run build
cd ../backend && npm run build
```

## Static demo (GitHub Pages)

The landing can be built as **pure static files**: content and calculator rates come from `backend/data/content.json`, copied into `frontend/public/content.json` at build time (same shape as the admin API).

1. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push to `main` — workflow [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml) runs `npm run build:static` in `frontend/`.
3. Site URL: `https://<user>.github.io/<repo>/` (for this project: `https://allogolden8888.github.io/shindos_website/`).

**Updating text/slides/rates for the static site:** change `backend/data/content.json` (via local admin or by hand), then either commit after `cd frontend && npm run sync-content`, or rely on the workflow copy from `backend/data` on each build.

**Admin link from static site:** optional repository variable **`ADMIN_BASE_URL`**. To use it, add to the workflow under the `Build static site` step:

```yaml
env:
  VITE_BASE_PATH: /${{ github.event.repository.name }}/
  VITE_CONTENT_SOURCE: static
  VITE_ADMIN_BASE_URL: ${{ vars.ADMIN_BASE_URL }}
```

(Settings → Secrets and variables → Actions → Variables → `ADMIN_BASE_URL` = your Next.js origin, e.g. `https://api.example.com`.)

If you omit this, the static bundle still builds; `/admin` falls back to `VITE_API_BASE_URL` or `http://localhost:3000` from `AdminRedirectPage.vue`.

**Local static preview:**
```bash
cd frontend
npm run sync-content
$env:VITE_CONTENT_SOURCE="static"   # PowerShell
$env:VITE_BASE_PATH="/"
npm run build:static
npm run preview
```
Use `VITE_BASE_PATH=/shindos_website/` when testing the same base path as GitHub Pages.

