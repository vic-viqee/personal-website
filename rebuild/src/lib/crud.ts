import { getDb, jsonRow, jsonRows, notFound } from "./db";

export type Column =
  | { name: string; type: "string"; required?: boolean; default?: unknown }
  | { name: string; type: "number"; required?: boolean; default?: unknown }
  | { name: string; type: "boolean"; required?: boolean; default?: unknown }
  | { name: string; type: "jsonArray"; required?: boolean; default?: unknown };

export interface ResourceDef {
  table: string;
  label: string;
  columns: Column[];
  orderBy?: string;
  prepareCreate?: (body: Record<string, unknown>) => Record<string, unknown> | Promise<Record<string, unknown>>;
  prepareUpdate?: (
    body: Record<string, unknown>,
    row: Record<string, unknown>,
  ) => Record<string, unknown> | Promise<Record<string, unknown>>;
}

export async function listAll(def: ResourceDef, where = "", bind: unknown[] = []) {
  const db = getDb();
  let sql = `SELECT * FROM "${def.table}"`;
  if (where) sql += ` WHERE ${where}`;
  if (def.orderBy) sql += ` ORDER BY ${def.orderBy}`;
  const res = await db.prepare(sql).bind(...bind).all();
  return Response.json(jsonRows(res.results ?? []));
}

function coerce(col: Column, value: unknown): unknown {
  if (value === undefined) return col.default ?? null;
  if (col.type === "boolean") return Boolean(value) ? 1 : 0;
  if (col.type === "jsonArray") return JSON.stringify(Array.isArray(value) ? value : []);
  if (col.type === "number") return Number(value);
  return value === null ? null : String(value);
}

export async function buildInsert(def: ResourceDef, body: Record<string, unknown>): Promise<{ sql: string; bind: unknown[] }> {
  const data = def.prepareCreate ? await def.prepareCreate(body) : body;
  const values = def.columns.map((c) => coerce(c, data[c.name]));
  const sql = `INSERT INTO "${def.table}" (${def.columns.map((c) => `"${c.name}"`).join(", ")}) VALUES (${def.columns.map(() => "?").join(", ")})`;
  return { sql, bind: values };
}

export async function createEntity(def: ResourceDef, body: Record<string, unknown>) {
  const db = getDb();
  const { sql, bind } = await buildInsert(def, body);
  const info = await db.prepare(sql).bind(...bind).run();
  const row = await getRowById(def.table, Number(info.meta.last_row_id));
  return Response.json(jsonRow(row), { status: 200 });
}

export async function updateEntity(def: ResourceDef, id: number, body: Record<string, unknown>) {
  const db = getDb();
  const existing = await getRowById(def.table, id);
  if (!existing) return notFound(`${def.label} not found`);
  const data = def.prepareUpdate ? await def.prepareUpdate(body, existing) : body;
  const sets = def.columns.map((c) => `"${c.name}" = ?`);
  const bind = def.columns.map((c) =>
    c.name in data ? coerce(c, data[c.name]) : (existing[c.name] ?? null)
  );
  await db.prepare(`UPDATE "${def.table}" SET ${sets.join(", ")} WHERE id = ?`).bind(...bind, id).run();
  const row = await getRowById(def.table, id);
  return Response.json(jsonRow(row));
}

export async function deleteEntity(def: ResourceDef, id: number) {
  const db = getDb();
  const existing = await getRowById(def.table, id);
  if (!existing) return notFound(`${def.label} not found`);
  await db.prepare(`DELETE FROM "${def.table}" WHERE id = ?`).bind(id).run();
  return Response.json({ message: `${def.label} deleted` });
}

export async function getRowById(table: string, id: number): Promise<Record<string, unknown> | null> {
  const db = getDb();
  const row = await db.prepare(`SELECT * FROM "${table}" WHERE id = ?`).bind(id).first();
  return (row as Record<string, unknown> | null) ?? null;
}

export function toBool(value: unknown): boolean {
  return value === 1 || value === true || value === "1";
}