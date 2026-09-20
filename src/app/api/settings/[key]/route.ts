import { NextRequest } from "next/server";
import { getDb, notFound } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(_req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const db = getDb();
  const row = await db.prepare('SELECT "value" FROM "sitesetting" WHERE "key" = ?').bind(key).first();
  if (!row) return notFound("Setting not found");
  return Response.json(row.value);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const { key } = await params;
  const data = (await request.json()) as { value?: unknown };
  const db = getDb();
  const existing = await db.prepare('SELECT "id" FROM "sitesetting" WHERE "key" = ?').bind(key).first();
  if (existing) {
    await db.prepare('UPDATE "sitesetting" SET "value" = ? WHERE "id" = ?').bind(String(data.value), existing.id).run();
  } else {
    await db.prepare('INSERT INTO "sitesetting" ("key", "value") VALUES (?, ?)').bind(key, String(data.value)).run();
  }
  return Response.json({ key, value: String(data.value) });
}