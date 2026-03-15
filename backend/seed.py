import os
from bs4 import BeautifulSoup
from sqlmodel import Session, create_engine, select
from database import engine
from models import Project, BlogPost, AssistantContext, Skill, TimelineEvent, EducationEntry, Award, Tool, Hobby
import glob

def seed_projects():
    html_path = "../frontend/legacy-static/index.html"
    if not os.path.exists(html_path):
        print(f"File not found: {html_path}")
        return

    with open(html_path, "r") as f:
        soup = BeautifulSoup(f, "lxml")

    project_boxes = soup.select("article.project-box")
    projects = []

    for box in project_boxes:
        category = box.get("data-category", "other")
        front = box.select_one(".project-info-front")
        name = front.select_one("h3").text.strip() if front.select_one("h3") else "Unknown"
        stars = len(front.select(".mission-difficulty img[src*='star-filled.svg']"))
        tech_icons = front.select(".tech-stack img")
        tech_stack = [img.get("alt") for img in tech_icons if img.get("alt")]
        links = front.select("a.comic-link")
        live_demo = next((a.get("href") for a in links if "LIVE DEMO" in a.text), None)
        github_repo = next((a.get("href") for a in links if "GITHUB REPO" in a.text), None)
        image_tag = front.select_one(".project-img")
        image_url = image_tag.get("src") if image_tag else None
        back = box.select_one(".project-details-back")
        description = back.select_one("p").text.strip() if back and back.select_one("p") else ""
        mission_briefing = str(back) if back else ""

        project = Project(
            name=name,
            description=description,
            category=category,
            difficulty=stars,
            tech_stack=tech_stack,
            live_demo_link=live_demo,
            github_repo_link=github_repo,
            image_url=image_url,
            mission_briefing=mission_briefing
        )
        projects.append(project)

    with Session(engine) as session:
        for p in projects:
            existing = session.exec(select(Project).where(Project.name == p.name)).first()
            if not existing:
                session.add(p)
        session.commit()
    print(f"Seeded {len(projects)} projects.")

def seed_assistant_context():
    contexts = [
        AssistantContext(key="origin_story", value="Victor Lewis Murimi is a developer by day and a vigilante coder by night. Starting his journey with Python and networking, he's now building full-stack applications and AI-powered solutions to solve real-world problems."),
        AssistantContext(key="superpowers", value="Victor's technical superpowers include: Full-stack development with React & NodeJS, Backend mastery with Python (FastAPI/Flask), Database design with PostgreSQL & MongoDB, and AI integration with Gemini & Gemma models.")
    ]
    with Session(engine) as session:
        for c in contexts:
            existing = session.exec(select(AssistantContext).where(AssistantContext.key == c.key)).first()
            if not existing:
                session.add(c)
        session.commit()
    print("Seeded assistant context.")

def seed_blog_posts():
    blog_dir = "../frontend/legacy-static/blog/"
    blog_files = glob.glob(os.path.join(blog_dir, "*.html"))
    posts = []
    for file_path in blog_files:
        with open(file_path, "r") as f:
            soup = BeautifulSoup(f, "lxml")
        title = soup.select_one("h1").text.strip() if soup.select_one("h1") else os.path.basename(file_path)
        content_panel = soup.select_one(".comic-panel")
        content = str(content_panel) if content_panel else ""
        slug = os.path.basename(file_path).replace(".html", "")
        excerpt = soup.select_one(".comic-text").text.strip()[:150] if soup.select_one(".comic-text") else ""
        post = BlogPost(title=title, slug=slug, content=content, excerpt=excerpt)
        posts.append(post)
    with Session(engine) as session:
        for p in posts:
            existing = session.exec(select(BlogPost).where(BlogPost.slug == p.slug)).first()
            if not existing:
                session.add(p)
        session.commit()
    print(f"Seeded {len(posts)} blog posts.")

def seed_skills():
    html_path = "../frontend/legacy-static/index.html"
    with open(html_path, "r") as f:
        soup = BeautifulSoup(f, "lxml")
    skill_items = soup.select(".skill-item")
    with Session(engine) as session:
        for item in skill_items:
            name = item.select_one("h3").text.strip()
            level_text = item.select_one(".skill-level").text.strip().replace("%", "")
            level = int(level_text) if level_text.isdigit() else 0
            existing = session.exec(select(Skill).where(Skill.name == name)).first()
            if not existing:
                session.add(Skill(name=name, level=level))
        session.commit()
    print("Seeded skills.")

def seed_timeline():
    html_path = "../frontend/legacy-static/index.html"
    with open(html_path, "r") as f:
        soup = BeautifulSoup(f, "lxml")
    events = soup.select(".timeline-event")
    with Session(engine) as session:
        for i, event in enumerate(events):
            year = event.select_one(".timeline-date").text.strip()
            title = event.select_one("strong").text.strip()
            desc = event.select("p")[1].text.strip() if len(event.select("p")) > 1 else ""
            side = "left" if "left-bubble" in str(event) else "right"
            existing = session.exec(select(TimelineEvent).where(TimelineEvent.title == title)).first()
            if not existing:
                session.add(TimelineEvent(year=year, title=title, description=desc, side=side))
        session.commit()
    print("Seeded timeline.")

def seed_education():
    html_path = "../frontend/legacy-static/index.html"
    with open(html_path, "r") as f:
        soup = BeautifulSoup(f, "lxml")
    edu_list = soup.select(".edu-list li")
    with Session(engine) as session:
        for item in edu_list:
            degree_tag = item.select_one("strong")
            if not degree_tag: continue
            degree = degree_tag.text.strip()
            institution = item.select_one("span").text.strip() if item.select_one("span") else ""
            existing = session.exec(select(EducationEntry).where(EducationEntry.degree == degree)).first()
            if not existing:
                session.add(EducationEntry(degree=degree, institution=institution, years=""))
        session.commit()
    print("Seeded education.")

def seed_awards():
    html_path = "../frontend/legacy-static/index.html"
    with open(html_path, "r") as f:
        soup = BeautifulSoup(f, "lxml")
    badge_items = soup.select(".badge-item")
    with Session(engine) as session:
        for item in badge_items:
            title_tag = item.select_one("h4")
            if not title_tag: continue
            title = title_tag.text.strip()
            badge_div = item.select_one("div[data-share-badge-id]")
            badge_id = badge_div.get("data-share-badge-id") if badge_div else None
            existing = session.exec(select(Award).where(Award.title == title)).first()
            if not existing:
                session.add(Award(title=title, badge_id=badge_id))
        session.commit()
    print("Seeded awards.")

def seed_tools():
    html_path = "../frontend/legacy-static/index.html"
    with open(html_path, "r") as f:
        soup = BeautifulSoup(f, "lxml")
    tool_items = soup.select(".tool-item")
    with Session(engine) as session:
        for item in tool_items:
            name = item.select_one("h3").text.strip()
            desc = item.select_one("p").text.strip()
            icon = item.select_one("img").get("src")
            existing = session.exec(select(Tool).where(Tool.name == name)).first()
            if not existing:
                session.add(Tool(name=name, description=desc, icon_url=icon))
        session.commit()
    print("Seeded tools.")

def seed_hobbies():
    html_path = "../frontend/legacy-static/index.html"
    with open(html_path, "r") as f:
        soup = BeautifulSoup(f, "lxml")
    hobby_bubbles = soup.select(".hobby-bubble")
    with Session(engine) as session:
        for bubble in hobby_bubbles:
            name = bubble.select_one("p").text.strip()
            side = "left" if "left-bubble" in str(bubble) else "right"
            existing = session.exec(select(Hobby).where(Hobby.name == name)).first()
            if not existing:
                session.add(Hobby(name=name, side=side))
        session.commit()
    print("Seeded hobbies.")

if __name__ == "__main__":
    from database import create_db_and_tables
    create_db_and_tables()
    seed_projects()
    seed_assistant_context()
    seed_blog_posts()
    seed_skills()
    seed_timeline()
    seed_education()
    seed_awards()
    seed_tools()
    seed_hobbies()
