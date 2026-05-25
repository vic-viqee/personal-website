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
    items = soup.select(".badge-item")
    with Session(engine) as session:
        seed_count = 0
        for item in items:
            title_tag = item.select_one("h4")
            if not title_tag: continue
            title = title_tag.text.strip()

            existing = session.exec(select(Award).where(Award.title == title)).first()
            if existing:
                continue

            badge_div = item.select_one("div[data-share-badge-id]")
            if badge_div:
                badge_id = badge_div.get("data-share-badge-id")
                session.add(Award(title=title, badge_id=badge_id))
                seed_count += 1
            elif item.name == "a" and item.get("href"):
                href = item.get("href")
                session.add(Award(title=title, is_certificate=True, link=href, host="Cisco Networking Academy"))
                seed_count += 1

        session.commit()
        print(f"Seeded {seed_count} awards.")

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

def seed_new_projects():
    projects = [
        Project(
            name="lipa-pole-pole",
            description="A mobile-first payment solution enabling installment-based transactions. Built with React and FastAPI, designed to make split payments simple and accessible for Kenyan users.",
            category="payment",
            difficulty=2,
            tech_stack=["React", "Vite", "FastAPI", "Python", "JavaScript"],
            github_repo_link="https://github.com/vic-viqee/lipa-pole-pole",
            image_url="assets/images/lipa-pole-pole-hero.png",
            mission_briefing=(
                '<p><strong>Mission:</strong> Build a payment solution that lets users pay in installments — "Pole Pole" (Slowly).</p>'
                "<p><strong>The Problem:</strong> Many Kenyans need flexible payment options that work with their cash flow. "
                "Traditional payment systems don't support installment-based purchases easily.</p>"
                "<p><strong>The Solution:</strong> A mobile-first web app using React for the frontend and FastAPI for the backend, "
                "designed to make split payments simple and accessible.</p>"
                "<p><strong>Tech Stack:</strong> React, Vite, FastAPI, Python</p>"
            ),
        ),
        Project(
            name="anything_marketplace",
            description=(
                "A peer-to-peer marketplace MVP for buying and selling anything with a 'Pay on Delivery' model. "
                "Features product listings, buyer-seller chat, KYC verification, subscription tiers, and an admin dashboard. "
                "Built to serve Kenyan users who prefer cash-on-delivery."
            ),
            category="fullstack",
            difficulty=5,
            tech_stack=["Next.js", "TypeScript", "FastAPI", "Python", "PostgreSQL", "Docker", "Redis"],
            live_demo_link="https://anything-marketplace-web.onrender.com",
            github_repo_link="https://github.com/vic-viqee/anything_marketplace",
            image_url="assets/images/anything-marketplace-hero.png",
            mission_briefing=(
                "<p><strong>Mission:</strong> Build a full-featured P2P marketplace where anyone can buy and sell anything — safely.</p>"
                "<p><strong>The Problem:</strong> Existing marketplaces don't cater well to Kenyan users who prefer "
                "cash-on-delivery and need a trust system for P2P transactions without street addresses.</p>"
                "<p><strong>The Solution:</strong> A comprehensive marketplace with product feed, chat messaging, "
                "KYC verification, subscription tiers, rating system, and admin moderation.</p>"
                "<p><strong>Key Features:</strong> Peer-to-peer chat, admin dashboard, subscription tiers, "
                "KYC verification, product approval workflow, seller ratings, dark/light mode.</p>"
                "<p><strong>Tech Stack:</strong> Next.js 16, TypeScript, FastAPI, PostgreSQL, Redis, Docker</p>"
            ),
        ),
        Project(
            name="Delivery",
            description=(
                "A grocery delivery platform purpose-built for Embu, Kenya that solves the addressing problem "
                "plaguing last-mile delivery. Uses GPS coordinates, landmark identification (Stage Anchors like Dallas, "
                "Kiritiri), voice directions, Plus Codes, and photo verification so riders can always find customers."
            ),
            category="fullstack",
            difficulty=4,
            tech_stack=["Next.js", "TypeScript", "FastAPI", "Python", "PostgreSQL", "shadcn/ui", "PWA"],
            github_repo_link="https://github.com/vic-viqee/Delivery",
            image_url="assets/images/delivery-hero.png",
            mission_briefing=(
                "<p><strong>Mission:</strong> Solve last-mile grocery delivery in Kenya where street addresses don't exist.</p>"
                "<p><strong>The Problem:</strong> Kenya's lack of street addresses makes delivery nearly impossible. "
                "Riders can't find customers using traditional navigation.</p>"
                "<p><strong>The Solution:</strong> A custom addressing system combining GPS coordinates, Stage Anchors "
                "(Matatu/Boda stages like Dallas, Kiritiri), 15-second voice directions, Plus Codes, and photo verification. "
                "Built as a mobile-first PWA with offline support and M-Pesa integration.</p>"
                "<p><strong>Key Features:</strong> Custom address system, voice directions, PWA with offline sync, "
                "M-Pesa payments, stage anchor navigation.</p>"
                "<p><strong>Tech Stack:</strong> Next.js 16, TypeScript, FastAPI, PostgreSQL, shadcn/ui, PWA</p>"
            ),
        ),
    ]
    with Session(engine) as session:
        count = 0
        for p in projects:
            existing = session.exec(select(Project).where(Project.name == p.name)).first()
            if not existing:
                session.add(p)
                count += 1
        session.commit()
    print(f"Seeded {count} new projects.")


def seed_tembo_blog_post():
    content = (
        '<div class="comic-panel">'
        "<h1>7 Months at Tembo Tech Ventures: From Beginner to Builder</h1>"
        "<p><em>Published May 2026</em></p>"
        "<h2>How I Joined Tembo</h2>"
        "<p>In late 2025, I joined Tembo Tech Ventures — a practical tech community for early builders across Africa. "
        "The program promised something different from traditional bootcamps: real software, working engineers as mentors, "
        "and a community that stays connected long after the cohort ends.</p>"
        "<p>I was part of Cohort 04, based in Embu, Kenya. Over 7 months, I went from writing basic scripts to shipping "
        "full-stack applications.</p>"
        "<h2>The Structure</h2>"
        "<p>Tembo isn't a course — it's a working group. Each week, working engineers showed us the shape of real systems: "
        "how the backend connects to the frontend, how authentication works in production, how to structure a database "
        "that doesn't fall apart when real users show up.</p>"
        "<p>The accountability was the key difference. You don't just watch videos; you build, you break things, "
        "you fix them, and you ship.</p>"
        "<h2>What I Built</h2>"
        "<p>During the cohort, I built three major projects:</p>"
        "<p><strong>lipa-pole-pole</strong> — A payment solution for installment-based transactions. "
        "My first full-stack app combining React with FastAPI.</p>"
        "<p><strong>anything_marketplace</strong> — A full P2P marketplace with buyer-seller chat, KYC verification, "
        "admin dashboard, subscription tiers, and product approval workflows. Built with Next.js + FastAPI + PostgreSQL, "
        "deployed on Render.</p>"
        "<p><strong>Delivery</strong> — A grocery delivery platform solving Kenya's addressing problem using GPS coordinates, "
        "stage anchors, voice directions, and photo verification. Built as a PWA with offline support.</p>"
        "<h2>The Skills I Gained</h2>"
        "<p>Beyond the technical skills (React, Next.js, FastAPI, PostgreSQL, Docker, TypeScript), I learned how to:</p>"
        "<ul>"
        "<li>Structure a full-stack project from scratch</li>"
        "<li>Design databases that model real business logic</li>"
        "<li>Deploy and debug production applications</li>"
        "<li>Work with authentication, payments, and real-time features</li>"
        "<li>Collaborate and communicate technical decisions clearly</li>"
        "</ul>"
        "<h2>What's Next</h2>"
        "<p>Tembo gave me the foundation and the confidence to build anything I can imagine. "
        "I'm now actively looking for opportunities where I can contribute, learn from experienced engineers, "
        "and build software that matters.</p>"
        "<p>If you're an early builder in Africa considering Tembo — apply. "
        "The community is the real product, and it stays with you long after the cohort ends.</p>"
        "</div>"
    )

    post = BlogPost(
        title="7 Months at Tembo Tech Ventures: From Beginner to Builder",
        slug="tembo-tech-ventures-cohort-experience",
        content=content,
        excerpt=(
            "My journey through 7 months at Tembo Tech Ventures — building real full-stack applications, "
            "learning from working engineers, and discovering what it takes to ship production software."
        ),
    )
    with Session(engine) as session:
        existing = session.exec(select(BlogPost).where(BlogPost.slug == post.slug)).first()
        if not existing:
            session.add(post)
            session.commit()
            print("Seeded Tembo blog post.")
        else:
            print("Tembo blog post already exists.")


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
    seed_new_projects()
    seed_tembo_blog_post()
    seed_tools()
    seed_hobbies()
