# VL Murimi | Portfolio Website

A full-stack superhero-themed portfolio website with a React frontend, FastAPI backend, PostgreSQL database, and Telegram AI Assistant.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19 + TypeScript + Vite + React Router 7 |
| **Backend** | FastAPI (Python) + SQLModel |
| **Database** | PostgreSQL (Neon) |
| **Hosting** | Render |
| **Assistant** | Telegram Bot (aiogram + Gemini AI) |

---

## 🏗️ Project Structure

```
personal-website/
├── backend/               # FastAPI application
│   ├── main.py           # API endpoints
│   ├── models.py         # Database models
│   ├── database.py       # DB connection
│   ├── seed.py           # Data seeding script
│   ├── assistant.py      # Telegram bot
│   ├── requirements.txt  # Python dependencies
│   └── .env              # Environment variables
├── frontend/             # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── api.ts       # API client
│   │   ├── App.tsx      # Main app with routing
│   │   └── index.css    # Global styles
│   ├── public/           # Static assets
│   ├── package.json     # Node dependencies
│   └── vite.config.ts   # Vite configuration
├── render.yaml           # Render deployment config
├── docker-compose.yml    # Local dev infrastructure (optional)
└── README.md            # This file
```

---

## 🛠️ Local Development Setup

### Option A: With Docker (Recommended)

Start PostgreSQL and pgAdmin locally:

```bash
docker-compose up -d
```

- PostgreSQL runs on port **5433** (to avoid conflicts)
- pgAdmin: http://localhost:5050 | email: `admin@admin.com` | password: `admin`

### Option B: Without Docker

Use a local PostgreSQL instance and update `backend/.env`:
```
DATABASE_URL=postgresql://user:password@localhost:5432/your_db
```

---

### 1. Backend Setup (FastAPI)

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Update .env with your settings
cp .env.example .env
# Edit .env with DATABASE_URL and TELEGRAM_BOT_TOKEN

# Seed database with sample data
python seed.py

# Start development server
uvicorn main:app --reload
```

**Backend runs at:** http://localhost:8000

---

### 2. Frontend Setup (React)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend runs at:** http://localhost:5173

---

### 3. Telegram Assistant (Optional)

To run the AI assistant bot:

```bash
cd backend
source venv/bin/activate
python assistant.py
```

---

## 🌐 Deployment

### Database (Neon)

1. Create a project at [neon.tech](https://neon.tech)
2. Copy the connection string (add `?sslmode=require`)
3. Add to backend environment variables as `DATABASE_URL`

### Backend (Render)

1. Create a **Web Service** on Render
2. Connect GitHub repository, select `backend/` folder
3. Configure:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables:
   - `DATABASE_URL` = your Neon connection string
   - `TELEGRAM_BOT_TOKEN` = your Telegram bot token
   - `ADMIN_SECRET` = a secure password for admin access

### Frontend (Render)

1. Create a **Static Site** on Render
2. Connect GitHub repository, select `frontend/` folder
3. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add environment variables:
   - `VITE_API_URL` = your backend URL (e.g., `https://portfolio-backend.onrender.com`)
   - `VITE_ADMIN_SECRET` = same as ADMIN_SECRET
5. **Add Rewrite Rule** (Critical for SPA routing):
   - Go to **Redirect and Rewrite Rules**
   - Add: **Rewrite** `/*` → `/index.html`
6. Deploy

---

## 📝 Content Management

### Accessing the Admin Panel

Visit: `https://your-site.onrender.com/admin`

You'll need to set `ADMIN_SECRET` on the backend and `VITE_ADMIN_SECRET` on the frontend.

### Admin Tabs

| Tab | Purpose |
|-----|---------|
| **BLOG** | Create new blog posts (title, excerpt, HTML content) |
| **PROJECT** | Add portfolio projects (name, description, tech stack, links, mission briefing) |
| **SKILL** | Add skills/superpowers (name, level 0-100, category) |
| **TIMELINE** | Add timeline events (year, title, description, side: left/right) |
| **EDUCATION** | Add education entries (degree, institution, years) |
| **AWARD** | Add achievements/badges (title, host, badge ID, certificate flag) |
| **TOOL** | Add tools/gadgets (name, description, icon URL) |
| **HOBBY** | Add hobbies/off-duty pursuits (name, side: left/right) |

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/projects` | List all projects |
| `POST` | `/projects` | Create project (admin only) |
| `GET` | `/skills` | List all skills |
| `POST` | `/skills` | Create skill (admin only) |
| `GET` | `/timeline` | List timeline events |
| `POST` | `/timeline` | Create timeline event (admin only) |
| `GET` | `/education` | List education entries |
| `POST` | `/education` | Create education entry (admin only) |
| `GET` | `/awards` | List awards |
| `POST` | `/awards` | Create award (admin only) |
| `GET` | `/tools` | List tools |
| `POST` | `/tools` | Create tool (admin only) |
| `GET` | `/hobbies` | List hobbies |
| `POST` | `/hobbies` | Create hobby (admin only) |
| `GET` | `/blog` | List blog posts |
| `GET` | `/blog/{slug}` | Get single blog post |
| `POST` | `/blog` | Create blog post (admin only) |

**All POST endpoints require `X-Admin-Secret` header.**

---

## 🎨 Site Features

- **Superhero Theme**: Comic book-inspired UI with "missions" for projects, "superpowers" for skills
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Animated Skills**: Progress bars with staggered animations and level badges
- **Timeline**: Visual coding journey with alternating left/right layout
- **Telegram Assistant**: AI-powered bot for answering questions about the portfolio

---

## 🔧 Environment Variables

### Backend (.env)

```env
DATABASE_URL=postgresql://user:password@host.neon.tech/db?sslmode=require
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
ADMIN_SECRET=your_secure_password
```

### Frontend (.env)

```env
VITE_API_URL=https://your-backend.onrender.com
VITE_ADMIN_SECRET=your_secure_password
```

---

## 🦸‍♂️ Quick Commands

| Action | Command |
|--------|---------|
| Start local DB | `docker-compose up -d` |
| Stop local DB | `docker-compose down` |
| Seed database | `cd backend && python seed.py` |
| Run backend | `cd backend && uvicorn main:app --reload` |
| Run frontend | `cd frontend && npm run dev` |
| Build frontend | `cd frontend && npm run build` |

---

## 📄 License

&copy; 2026 Victor Lewis Murimi. All rights reserved.