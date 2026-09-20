import { NextRequest } from "next/server";
import { ResourceDef, listAll, createEntity } from "@/lib/crud";
import { requireAdmin } from "@/lib/auth";

const def: ResourceDef = {
  table: "skill",
  label: "Skill",
  columns: [
    { name: "name", type: "string", required: true },
    { name: "level", type: "number", required: true },
    { name: "category", type: "string", default: "superpower" },
  ],
};

export async function GET() {
  return listAll(def);
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const body = (await request.json()) as Record<string, unknown>;
  return createEntity(def, body);
}