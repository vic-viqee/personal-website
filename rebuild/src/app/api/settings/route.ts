import { getDb } from "@/lib/db";

export async function GET() {
  const db = getDb();
  const res = await db.prepare('SELECT "key", "value" FROM "sitesetting"').all();
  const dict: Record<string, string> = {};
  for (const row of res.results ?? []) {
    dict[row.key as string] = row.value as string;
  }
  return Response.json(dict);
}