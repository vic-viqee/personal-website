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


class SkillCreate(BaseModel):
    name: str
    level: int
    category: str = "superpower"


class TimelineEventCreate(BaseModel):
    year: str
    title: str
    description: str
    side: str = "left"


class EducationEntryCreate(BaseModel):
    degree: str
    institution: str
    years: str = ""


class AwardCreate(BaseModel):
    title: str
    host: Optional[str] = None
    badge_id: Optional[str] = None
    is_certificate: bool = False
    link: Optional[str] = None


class ToolCreate(BaseModel):
    name: str
    description: str
    icon_url: str


class HobbyCreate(BaseModel):
    name: str
    side: str = "left"


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


@app.post("/skills", response_model=Skill)
def create_skill(
    skill_in: SkillCreate,
    session: Session = Depends(get_session),
    _: bool = Depends(verify_admin_secret),
):
    db_skill = Skill(
        name=skill_in.name,
        level=skill_in.level,
        category=skill_in.category,
    )
    session.add(db_skill)
    session.commit()
    session.refresh(db_skill)
    return db_skill


@app.post("/timeline", response_model=TimelineEvent)
def create_timeline_event(
    event_in: TimelineEventCreate,
    session: Session = Depends(get_session),
    _: bool = Depends(verify_admin_secret),
):
    db_event = TimelineEvent(
        year=event_in.year,
        title=event_in.title,
        description=event_in.description,
        side=event_in.side,
    )
    session.add(db_event)
    session.commit()
    session.refresh(db_event)
    return db_event


@app.post("/education", response_model=EducationEntry)
def create_education(
    edu_in: EducationEntryCreate,
    session: Session = Depends(get_session),
    _: bool = Depends(verify_admin_secret),
):
    db_edu = EducationEntry(
        degree=edu_in.degree,
        institution=edu_in.institution,
        years=edu_in.years,
    )
    session.add(db_edu)
    session.commit()
    session.refresh(db_edu)
    return db_edu


@app.post("/awards", response_model=Award)
def create_award(
    award_in: AwardCreate,
    session: Session = Depends(get_session),
    _: bool = Depends(verify_admin_secret),
):
    db_award = Award(
        title=award_in.title,
        host=award_in.host,
        badge_id=award_in.badge_id,
        is_certificate=award_in.is_certificate,
        link=award_in.link,
    )
    session.add(db_award)
    session.commit()
    session.refresh(db_award)
    return db_award


@app.post("/tools", response_model=Tool)
def create_tool(
    tool_in: ToolCreate,
    session: Session = Depends(get_session),
    _: bool = Depends(verify_admin_secret),
):
    db_tool = Tool(
        name=tool_in.name,
        description=tool_in.description,
        icon_url=tool_in.icon_url,
    )
    session.add(db_tool)
    session.commit()
    session.refresh(db_tool)
    return db_tool


@app.post("/hobbies", response_model=Hobby)
def create_hobby(
    hobby_in: HobbyCreate,
    session: Session = Depends(get_session),
    _: bool = Depends(verify_admin_secret),
):
    db_hobby = Hobby(
        name=hobby_in.name,
        side=hobby_in.side,
    )
    session.add(db_hobby)
    session.commit()
    session.refresh(db_hobby)
    return db_hobby


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
