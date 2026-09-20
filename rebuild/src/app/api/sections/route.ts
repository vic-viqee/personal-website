import { getDb } from "@/lib/db";

export async function GET() {
  const db = getDb();
  const res = await db.prepare('SELECT "section", "visible" FROM "sectionvisibility"').all();
  const dict: Record<string, boolean> = {};
  for (const row of res.results ?? []) {
    dict[row.section as string] = row.visible === 1;
  }
  return Response.json(dict);
}