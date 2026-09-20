import { NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const orders = (await request.json()) as Array<{ id: number; sort_order: number }>;
  const db = getDb();
  for (const item of orders) {
    await db
      .prepare('UPDATE "project" SET "sort_order" = ? WHERE id = ?')
      .bind(Number(item.sort_order), Number(item.id))
      .run();
  }
  return Response.json({ message: "Reorder successful" });
}