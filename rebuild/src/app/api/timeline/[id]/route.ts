import { NextRequest } from "next/server";
import { ResourceDef, getRowById, updateEntity, deleteEntity } from "@/lib/crud";
import { requireAdmin } from "@/lib/auth";
import { notFound, jsonRow } from "@/lib/db";

const def: ResourceDef = {
  table: "timelineevent",
  label: "TimelineEvent",
  columns: [
    { name: "year", type: "string", required: true },
    { name: "title", type: "string", required: true },
    { name: "description", type: "string", required: true },
    { name: "side", type: "string", default: "left" },
  ],
};

type Params = Promise<{ id: string }>;

export async function GET(_req: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const row = await getRowById(def.table, Number(id));
  if (!row) return notFound("TimelineEvent not found");
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