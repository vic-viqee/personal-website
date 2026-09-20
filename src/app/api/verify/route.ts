import { requireAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  return Response.json({ ok: true });
}