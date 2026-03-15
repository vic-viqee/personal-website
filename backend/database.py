import os
from dotenv import load_dotenv
from sqlmodel import SQLModel, create_engine, Session

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    from models import Project, BlogPost, AssistantContext
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
