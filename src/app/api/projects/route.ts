import { NextRequest } from "next/server";
import { ResourceDef, listAll, createEntity } from "@/lib/crud";
import { requireAdmin } from "@/lib/auth";

const def: ResourceDef = {
  table: "project",
  label: "Project",
  orderBy: '"sort_order", "id"',
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
  prepareCreate: (body) => ({
    ...body,
    created_at: new Date().toISOString(),
  }),
};

export async function GET() {
  const res = await listAll(def);
  return res;
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const body = (await request.json()) as Record<string, unknown>;
  return createEntity(def, body);
}