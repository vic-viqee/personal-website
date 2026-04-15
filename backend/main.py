from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from typing import List, Optional
from datetime import datetime
from database import engine, create_db_and_tables, get_session
from models import (
    Project,
    BlogPost,
    Skill,
    TimelineEvent,
    EducationEntry,
    Award,
    Tool,
    Hobby,
)

app = FastAPI(title="VL Murimi Portfolio API")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def verify_admin_secret(x_admin_secret: str = Header(...)):
    if x_admin_secret != ADMIN_SECRET:
        raise HTTPException(status_code=401, detail="Invalid admin secret")
    return True


app = FastAPI(title="VL Murimi Portfolio API")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/")
def read_root():
    return {"message": "Welcome to VL Murimi Portfolio API"}


@app.get("/projects", response_model=List[Project])
def get_projects(session: Session = Depends(get_session)):
    projects = session.exec(select(Project)).all()
    return projects


@app.get("/skills", response_model=List[Skill])
def get_skills(session: Session = Depends(get_session)):
    skills = session.exec(select(Skill)).all()
    return skills


@app.get("/timeline", response_model=List[TimelineEvent])
def get_timeline(session: Session = Depends(get_session)):
    events = session.exec(select(TimelineEvent)).all()
    return events


@app.get("/education", response_model=List[EducationEntry])
def get_education(session: Session = Depends(get_session)):
    entries = session.exec(select(EducationEntry)).all()
    return entries


@app.get("/awards", response_model=List[Award])
def get_awards(session: Session = Depends(get_session)):
    awards = session.exec(select(Award)).all()
    return awards


@app.get("/tools", response_model=List[Tool])
def get_tools(session: Session = Depends(get_session)):
    tools = session.exec(select(Tool)).all()
    return tools


@app.get("/hobbies", response_model=List[Hobby])
def get_hobbies(session: Session = Depends(get_session)):
    hobbies = session.exec(select(Hobby)).all()
    return hobbies


import re
import os
from pydantic import BaseModel


class BlogPostCreate(BaseModel):
    title: str
    content: str
    excerpt: str
    image_url: Optional[str] = None


class ProjectCreate(BaseModel):
    name: str
    description: str
    category: str
    difficulty: int = 5
    tech_stack: List[str] = []
    live_demo_link: Optional[str] = None
    github_repo_link: Optional[str] = None
    image_url: Optional[str] = None
    mission_briefing: Optional[str] = None


ADMIN_SECRET = os.getenv("ADMIN_SECRET", "vl-murimi-secret")


def slugify(text: str):
    return re.sub(r"[\s]+", "-", re.sub(r"[^\w\s-]", "", text.lower())).strip("-")


@app.post("/blog", response_model=BlogPost)
def create_blog_post(
    post_in: BlogPostCreate,
    session: Session = Depends(get_session),
    _: bool = Depends(verify_admin_secret),
):
    slug = slugify(post_in.title)
    existing = session.exec(select(BlogPost).where(BlogPost.slug == slug)).first()
    if existing:
        slug = f"{slug}-{int(datetime.utcnow().timestamp())}"
    db_post = BlogPost(
        title=post_in.title,
        content=post_in.content,
        excerpt=post_in.excerpt,
        image_url=post_in.image_url,
        slug=slug,
    )
    session.add(db_post)
    session.commit()
    session.refresh(db_post)
    return db_post


@app.post("/projects", response_model=Project)
def create_project(
    project_in: ProjectCreate,
    session: Session = Depends(get_session),
    _: bool = Depends(verify_admin_secret),
):
    db_project = Project(
        name=project_in.name,
        description=project_in.description,
        category=project_in.category,
        difficulty=project_in.difficulty,
        tech_stack=project_in.tech_stack,
        live_demo_link=project_in.live_demo_link,
        github_repo_link=project_in.github_repo_link,
        image_url=project_in.image_url,
        mission_briefing=project_in.mission_briefing,
    )
    session.add(db_project)
    session.commit()
    session.refresh(db_project)
    return db_project


@app.get("/blog", response_model=List[BlogPost])
def get_blog_posts(session: Session = Depends(get_session)):
    posts = session.exec(select(BlogPost).order_by(BlogPost.published_at.desc())).all()
    return posts


@app.get("/blog/{slug}", response_model=BlogPost)
def get_blog_post(slug: str, session: Session = Depends(get_session)):
    post = session.exec(select(BlogPost).where(BlogPost.slug == slug)).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post
