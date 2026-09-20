import { NextRequest } from "next/server";
import { ResourceDef, listAll, createEntity } from "@/lib/crud";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { slugify } from "@/lib/auth";

const def: ResourceDef = {
  table: "blogpost",
  label: "BlogPost",
  orderBy: '"published_at" DESC',
  columns: [
    { name: "title", type: "string", required: true },
    { name: "slug", type: "string", required: true },
    { name: "content", type: "string", required: true },
    { name: "excerpt", type: "string", required: true },
    { name: "image_url", type: "string" },
    { name: "published_at", type: "string", required: true },
  ],
  prepareCreate: async (body) => ({
    ...body,
    slug: (await uniqueSlug(body.title as string)),
    published_at: body.published_at || new Date().toISOString(),
  }),
};

async function uniqueSlug(title: string): Promise<string> {
  const db = getDb();
  let slug = slugify(title);
  const existing = await db.prepare('SELECT slug FROM "blogpost" WHERE slug = ?').bind(slug).first();
  if (existing) {
    slug = `${slug}-${Math.floor(Date.now() / 1000)}`;
  }
  return slug;
}

export async function GET() {
  return listAll(def);
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const body = (await request.json()) as Record<string, unknown>;
  delete body.published_at;
  return createEntity(def, body);
}