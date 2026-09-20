import { NextRequest } from "next/server";
import { ResourceDef, getRowById, updateEntity, deleteEntity } from "@/lib/crud";
import { requireAdmin } from "@/lib/auth";
import { getDb, notFound } from "@/lib/db";

const def: ResourceDef = {
  table: "blogpost",
  label: "BlogPost",
  columns: [
    { name: "title", type: "string", required: true },
    { name: "slug", type: "string", required: true },
    { name: "content", type: "string", required: true },
    { name: "excerpt", type: "string", required: true },
    { name: "image_url", type: "string" },
    { name: "published_at", type: "string", required: true },
  ],
};

type Params = Promise<{ slug: string }>;

export async function GET(_req: NextRequest, { params }: { params: Params }) {
  const { slug } = await params;
  const db = getDb();
  const row = await db.prepare('SELECT * FROM "blogpost" WHERE "slug" = ?').bind(slug).first();
  if (!row) return notFound("Post not found");
  return Response.json(row);
}

export async function PUT(request: NextRequest, { params }: { params: Params }) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const { slug } = await params;
  const existing = await getRowById(def.table, Number(slug));
  if (!existing) return notFound("BlogPost not found");
  const body = (await request.json()) as Record<string, unknown>;
  return updateEntity(def, Number(slug), body);
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const { slug } = await params;
  return deleteEntity(def, Number(slug));
}