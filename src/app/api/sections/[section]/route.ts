import { NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ section: string }> }) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const { section } = await params;
  const data = (await request.json()) as { visible?: unknown };
  const visible = Boolean(data.visible) ? 1 : 0;
  const db = getDb();
  const existing = await db.prepare('SELECT "id" FROM "sectionvisibility" WHERE "section" = ?').bind(section).first();
  if (existing) {
    await db.prepare('UPDATE "sectionvisibility" SET "visible" = ? WHERE "id" = ?').bind(visible, existing.id).run();
  } else {
    await db.prepare('INSERT INTO "sectionvisibility" ("section", "visible") VALUES (?, ?)').bind(section, visible).run();
  }
  return Response.json({ section, visible: Boolean(data.visible) });
}