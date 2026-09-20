<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project-specific notes

- Next.js 16 + React 19 app on Cloudflare Workers via **vinext** (not a standard Next deployment). See `node_modules/vinext/` and `node_modules/@vinext/cloudflare/` for runtime behavior; `wrangler.jsonc` defines the `vic-portfolio` worker (`DB` = D1, `VINEXT_KV_CACHE` = KV, assets = `dist/client`).
- Content lives in **Cloudflare D1** (`migrations/`). API routes in `src/app/api/**/route.ts`; the admin panel (`/admin`, UI in `src/components/Admin.tsx`) mutates the same tables.
- Admin auth: `X-Admin-Secret` header vs `ADMIN_SECRET` binding — see `src/lib/auth.ts`.
- Local D1: `npx wrangler d1 execute vic-portfolio-db --local --file=migrations/XXXX`.
- Dev server: `npm run dev:vinext` (port 3001). Build/deploy: `npm run build:vinext`, `npm run deploy:vinext`.
- `public/legacy-static/` is static content carried over from the retired Vite/FastAPI site; the live worker serves it via `ASSETS`.
