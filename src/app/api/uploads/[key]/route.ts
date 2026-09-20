import { NextRequest } from "next/server";
import { getKV } from "@/lib/uploads";

type Params = Promise<{ key: string }>;

export async function GET(_req: NextRequest, { params }: { params: Params }) {
  const { key } = await params;
  const result = await getKV().getWithMetadata<{ contentType: string }>(`uploads/${key}`, { type: "stream" });
  if (!result || result.value === null) {
    return new Response("Not found", { status: 404 });
  }

  const headers = new Headers();
  const contentType = result.metadata?.contentType || "application/octet-stream";
  headers.set("Content-Type", contentType);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");

  return new Response(result.value, { headers });
}