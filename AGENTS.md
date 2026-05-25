# Agent Instructions

## Project
Personal portfolio site at victormurimi.dev — comic-book hero theme ("Mission Control").
Backend: FastAPI + SQLModel on Render. Frontend: React + Vite on Render.

## Commands
| Task | Command |
|------|---------|
| Build frontend | `cd frontend && npm run build` |
| Run backend | `cd backend && source venv/bin/activate && uvicorn main:app --reload` |
| Seed production DB | `cd backend && source venv/bin/activate && python -c "from seed import seed_awards; seed_awards()"` |
| TypeScript check | `cd frontend && npx tsc --noEmit` |

## Admin Dashboard
- `/admin` — Mission Control dashboard (requires secret)
- Admin secret: prompt-based login (no longer stored in frontend)
- Full CRUD for all 8 content types + site settings + section visibility

## Content Models (10 total)
- Project, BlogPost, Skill, TimelineEvent, EducationEntry, Award, Tool, Hobby
- SiteSetting (key-value for hero text, social links, email, etc.)
- SectionVisibility (toggle homepage sections on/off)

## Key Conventions
- No comments in code unless absolutely necessary
- Comic-book themed: Superpowers, HQ, SAGA, INTEL, Gadget Arsenal, etc.
- All admin CRUD endpoints require `X-Admin-Secret` header
- Public GET endpoints are unauthenticated
- Tailwind not used — all styles via CSS variables and inline styles
- Backend auto-creates all tables on startup via SQLModel.metadata
- PostgreSQL on Neon; local dev uses DATABASE_URL env var
- Deploy: push to main → Render auto-deploys

## External References
| Need | File |
|------|------|
| API endpoints | `backend/main.py` |
| Data models | `backend/models.py` |
| Seed data | `backend/seed.py` |
| Admin UI | `frontend/src/components/Admin.tsx` |
| API client | `frontend/src/api.ts` |

## Commit Attribution
AI commits MUST include:
```
Co-Authored-By: Opencode <noreply@opencode.ai>
```
