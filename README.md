# Vic Portfolio — Personal Website

My portfolio site (victormurimi.dev), rebuilt as a full-stack Next.js app running on **Cloudflare Workers** via [vinext](https://github.com/cloudflare/vinext), with a **Cloudflare D1** database.

Sections (About, Skills, Projects, Blog, Timeline, Awards, Hobbies, Tools, Training) are served from D1 through typed API routes, plus a password-protected **admin panel** for CRUD over every content type.

## Stack

- **Next.js 16** (App Router, React 19, server components)
- **vinext** — Next.js runtime for Cloudflare Workers
- **Vite** + **@cloudflare/vite-plugin** — build toolchain
- **Tailwind CSS v4**
- **Cloudflare D1** — SQLite-compatible database (via `DB` binding)
- **Cloudflare KV** — response cache (`VINEXT_KV_CACHE`) and image uploads (`UPLOADS`, namespace `vic-portfolio-uploads`)
- Deploys with **`wrangler`** (see `wrangler.jsonc`, worker `vic-portfolio`)

## Getting Started

```bash
npm install
npm run dev:vinext        # dev server on http://localhost:3001
```

For an isolated preview build:

```bash
npm run build:vinext      # produces dist/client + dist/server
npm run start:vinext      # run the built worker locally
```

## Local D1

The app reads/writes D1. For local development the D1 binding is stubbed by
wrangler's local state; apply migrations locally with:

```bash
npx wrangler d1 execute vic-portfolio-db --local --file=migrations/0001_init.sql
npx wrangler d1 execute vic-portfolio-db --local --file=migrations/0002_data.sql
```

## Images

Image URLs for projects, blog posts, and tools are stored in D1 as relative paths and resolved at render time (`resolveImageUrl`):

- A value starting with `/` or `http(s)://` is used as-is.
- Anything else is served from the legacy static assets: `/legacy-static/<value>`.

### Option A — upload from the admin panel (drag & drop)

In `/admin`, the Projects and Blog edit forms have drag-and-drop image fields. Drop
(or click and pick) an image file and it is uploaded to the **Workers KV**
namespace (`UPLOADS` binding, `uploads/` prefix, max 5MB, image types only) via
`POST /api/upload` (admin secret required). The returned `/api/uploads/<key>`
URL is written into the `image_url` field automatically.

### Option B — add a static file locally, then push

Static assets live in `public/legacy-static/`. To add an image shipped with the
repo:

```bash
# 1. drop the file into the images dir
cp ~/Pictures/fluxpay.png public/legacy-static/assets/images/

# 2. deploy the updated static assets along with the code
npm run deploy:vinext

# 3. in /admin, set the Image URL (relative value; /legacy-static/ is added automatically)
#    e.g.  assets/images/fluxpay.png
```

## Configuration

- **`wrangler.jsonc`** — worker name, D1 binding (`DB`), KV namespaces (`VINEXT_KV_CACHE`, `UPLOADS`), assets (built client at `dist/client`).
- **`ADMIN_SECRET`** — secret guarding `/admin` and all write API routes. Sent as the `X-Admin-Secret` header from the admin UI. Defaults to a dev fallback value if unset — always set a real secret in production:

  ```bash
  npx wrangler secret put ADMIN_SECRET   # prod
  npx wrangler secret put ADMIN_SECRET --local   # local dev
  ```

## Migration from the legacy site

The old Vite/FastAPI site (previously `frontend/` + `backend/`) is being retired in favor of this repo. Static assets from the old site live on under `public/legacy-static/`. The data import script that seeded D1 from the old Postgres is at `scripts/dump_pg_to_d1.py`.

## Deployment

```bash
npm run deploy:vinext     # build + deploy to Cloudflare Workers
```

Live: https://victormurimi.dev (www redirects to apex)