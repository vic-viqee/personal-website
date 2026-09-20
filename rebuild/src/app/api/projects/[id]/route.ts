import { NextRequest } from "next/server";
import { ResourceDef, getRowById, updateEntity, deleteEntity } from "@/lib/crud";
import { requireAdmin } from "@/lib/auth";
import { notFound } from "@/lib/db";
import { jsonRow } from "@/lib/db";

const def: ResourceDef = {
  table: "project",
  label: "Project",
  columns: [
    { name: "name", type: "string", required: true },
    { name: "description", type: "string", required: true },
    { name: "category", type: "string", required: true },
    { name: "difficulty", type: "number", default: 5 },
    { name: "tech_stack", type: "jsonArray", default: [] },
    { name: "live_demo_link", type: "string" },
    { name: "github_repo_link", type: "string" },
    { name: "image_url", type: "string" },
    { name: "mission_briefing", type: "string" },
    { name: "sort_order", type: "number", default: 0 },
  ],
};

type Params = Promise<{ id: string }>;

export async function GET(_req: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const row = await getRowById(def.table, Number(id));
  if (!row) return notFound("Project not found");
  return Response.json(jsonRow(row));
}

export async function PUT(request: NextRequest, { params }: { params: Params }) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const { id } = await params;
  const body = (await request.json()) as Record<string, unknown>;
  return updateEntity(def, Number(id), body);
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const { id } = await params;
  return deleteEntity(def, Number(id));
}