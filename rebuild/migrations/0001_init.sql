-- D1 schema for the portfolio site (mission control data layer)
-- Mirrors SQLModel tables from the old FastAPI backend.

CREATE TABLE "project" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "difficulty" INTEGER NOT NULL DEFAULT 5,
  "tech_stack" TEXT NOT NULL DEFAULT '[]',
  "live_demo_link" TEXT,
  "github_repo_link" TEXT,
  "image_url" TEXT,
  "mission_briefing" TEXT,
  "sort_order" INTEGER NOT NULL DEFAULT 0,
  "created_at" TEXT NOT NULL
);

CREATE INDEX "idx_project_sort" ON "project" ("sort_order", "id");

CREATE TABLE "blogpost" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "excerpt" TEXT NOT NULL,
  "image_url" TEXT,
  "published_at" TEXT NOT NULL
);

CREATE UNIQUE INDEX "idx_blogpost_slug" ON "blogpost" ("slug");

CREATE TABLE "skill" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" TEXT NOT NULL,
  "level" INTEGER NOT NULL,
  "category" TEXT NOT NULL DEFAULT 'superpower'
);

CREATE TABLE "timelineevent" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "year" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "side" TEXT NOT NULL DEFAULT 'left'
);

CREATE TABLE "educationentry" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "degree" TEXT NOT NULL,
  "institution" TEXT NOT NULL,
  "years" TEXT NOT NULL DEFAULT ''
);

CREATE TABLE "award" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "title" TEXT NOT NULL,
  "host" TEXT,
  "badge_id" TEXT,
  "is_certificate" INTEGER NOT NULL DEFAULT 0,
  "link" TEXT
);

CREATE TABLE "tool" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "icon_url" TEXT NOT NULL
);

CREATE TABLE "hobby" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" TEXT NOT NULL,
  "side" TEXT NOT NULL DEFAULT 'left'
);

CREATE TABLE "sitesetting" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "key" TEXT NOT NULL,
  "value" TEXT NOT NULL
);

CREATE UNIQUE INDEX "idx_sitesetting_key" ON "sitesetting" ("key");

CREATE TABLE "sectionvisibility" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "section" TEXT NOT NULL,
  "visible" INTEGER NOT NULL DEFAULT 1
);

CREATE UNIQUE INDEX "idx_sectionvisibility_section" ON "sectionvisibility" ("section");