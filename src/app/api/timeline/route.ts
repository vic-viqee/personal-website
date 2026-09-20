import { NextRequest } from "next/server";
import { ResourceDef, listAll, createEntity } from "@/lib/crud";
import { requireAdmin } from "@/lib/auth";

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

export async function GET() {
  return listAll(def);
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const body = (await request.json()) as Record<string, unknown>;
  return createEntity(def, body);
}