from typing import List, Optional
from datetime import datetime
from sqlmodel import Field, SQLModel, JSON, Column

class Project(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    description: str
    category: str
    difficulty: int = Field(default=5)
    tech_stack: List[str] = Field(default=[], sa_column=Column(JSON))
    live_demo_link: Optional[str] = None
    github_repo_link: Optional[str] = None
    image_url: Optional[str] = None
    mission_briefing: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class BlogPost(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    slug: str = Field(unique=True, index=True)
    content: str
    excerpt: str
    image_url: Optional[str] = None
    published_at: datetime = Field(default_factory=datetime.utcnow)

class AssistantContext(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    key: str = Field(unique=True, index=True)
    value: str

class Skill(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    level: int  # 0-100
    category: str = "superpower"

class TimelineEvent(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    year: str
    title: str
    description: str
    side: str = "left"  # left or right for the layout

class EducationEntry(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    degree: str
    institution: str
    years: str

class Award(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    host: Optional[str] = None
    badge_id: Optional[str] = None # For Credly
    is_certificate: bool = False
    link: Optional[str] = None

class Tool(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    description: str
    icon_url: str

class Hobby(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    side: str = "left"
