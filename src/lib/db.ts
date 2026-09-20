import { env } from "cloudflare:workers";

export function getDb(): D1Database {
  return env.DB;
}

export function jsonRow(row: Record<string, unknown> | null) {
  if (!row) return null;
  for (const key of Object.keys(row)) {
    if (typeof row[key] === "string" && key === "tech_stack") {
      try {
        row[key] = JSON.parse(row[key] as string);
      } catch {
        row[key] = [];
      }
    }
  }
  return row;
}

export function jsonRows(rows: Record<string, unknown>[]) {
  return rows.map((row) => jsonRow(row));
}

export function techStackJson(value: unknown): string {
  return JSON.stringify(Array.isArray(value) ? value : []);
}

export async function findById(
  table: string,
  id: number,
): Promise<Record<string, unknown> | null> {
  const db = getDb();
  const res = await db.prepare(`SELECT * FROM "${table}" WHERE id = ?`).bind(id).first();
  return jsonRow(res as Record<string, unknown> | null);
}

export async function notFound(message: string): Promise<Response> {
  return Response.json({ detail: message }, { status: 404 });
}