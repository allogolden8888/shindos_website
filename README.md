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
