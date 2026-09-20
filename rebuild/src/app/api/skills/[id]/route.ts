import { NextRequest } from "next/server";
import { ResourceDef, getRowById, updateEntity, deleteEntity } from "@/lib/crud";
import { requireAdmin } from "@/lib/auth";
import { notFound, jsonRow } from "@/lib/db";

const def: ResourceDef = {
  table: "skill",
  label: "Skill",
  columns: [
    { name: "name", type: "string", required: true },
    { name: "level", type: "number", required: true },
    { name: "category", type: "string", default: "superpower" },
  ],
};

type Params = Promise<{ id: string }>;

export async function GET(_req: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const row = await getRowById(def.table, Number(id));
  if (!row) return notFound("Skill not found");
  return Response.json(jsonRow(row));
}

export async function PUT(request: NextRequest, { params }: { params: Params }) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const { id } = await params;
  return updateEntity(def, Number(id), await request.json());
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const { id } = await params;
  return deleteEntity(def, Number(id));
}