import { env } from "cloudflare:workers";

export async function isAdmin(request: Request): Promise<boolean> {
  const secret = request.headers.get("X-Admin-Secret");
  const expected = (env as unknown as Record<string, string | undefined>).ADMIN_SECRET || "vl-murimi-secret";
  return secret !== null && secret === expected;
}

export async function requireAdmin(request: Request): Promise<Response | null> {
  if (!(await isAdmin(request))) {
    return Response.json({ detail: "Invalid admin secret" }, { status: 401 });
  }
  return null;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}