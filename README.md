# VL Murimi | The Portfolio Issue (Dynamic Rebuild)

This is a modern, dynamic rebuild of the VL Murimi portfolio website, transitioning from static HTML/CSS/JS to a full-stack application.

## 🚀 Tech Stack
- **Frontend:** React (TypeScript) + Vite + React Router
- **Backend:** FastAPI (Python) + SQLModel (SQLAlchemy + Pydantic)
- **Database:** PostgreSQL (via Docker)
- **Assistant:** Telegram AI Bot (aiogram)

---

## 🛠️ Local Development Setup

### 1. Prerequisites
Ensure you have the following installed:
- [Docker & Docker Compose](https://docs.docker.com/get-docker/)
- [Node.js (v18+)](https://nodejs.org/)
- [Python 3.10+](https://www.python.org/)

### 2. Database Setup (Docker)
Start the PostgreSQL database and pgAdmin:
```bash
docker-compose up -d
```
*Note: The database is configured to run on port **5433** to avoid conflicts with local Postgres installations.*

### 3. Backend Setup (FastAPI)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Update your `.env` file with your `TELEGRAM_BOT_TOKEN`.
5. Seed the database with legacy projects and blog posts:
   ```bash
   python3 seed.py
   ```
6. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   *The API will be available at: http://localhost:8000*

### 4. Frontend Setup (React)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The website will be available at: http://localhost:5173*

### 5. Telegram Assistant
To run the Telegram bot separately:
```bash
cd backend
source venv/bin/activate
python3 assistant.py
```

---

## 📁 Project Structure
- `backend/`: FastAPI application, database models, and seeding scripts.
- `frontend/`: React application and assets.
- `frontend/legacy-static/`: Original static HTML/CSS/JS files (for reference and seeding).
- `docker-compose.yml`: Local infrastructure setup (Postgres + pgAdmin).

## 🦸‍♂️ Hero Commands (Cheat Sheet)
- **Start All (Services):** `docker-compose up -d`
- **Stop All:** `docker-compose down`
- **Update Database:** `python3 seed.py` (Run inside `backend/` with venv active)
