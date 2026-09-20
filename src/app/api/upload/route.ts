import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getKV, MAX_IMAGE_BYTES, sanitizeExt } from "@/lib/uploads";

export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ detail: "Missing file" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return Response.json({ detail: "Only image files are allowed" }, { status: 415 });
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return Response.json({ detail: "Image too large (max 5MB)" }, { status: 413 });
  }

  const ext = sanitizeExt(file.name, file.type);
  const key = `uploads/${crypto.randomUUID()}.${ext}`;

  await getKV().put(key, file.stream(), { metadata: { contentType: file.type } });

  return Response.json({ url: `/api/uploads/${key.split("/").pop()}` });
}