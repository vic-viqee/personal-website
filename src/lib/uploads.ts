import { env } from "cloudflare:workers";

export function getKV(): KVNamespace {
  return env.UPLOADS;
}

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export const IMAGE_EXT = /\.(png|jpe?g|gif|webp|svg|avif)$/i;

export function sanitizeExt(name: string, type: string): string {
  const fromName = name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (fromName && IMAGE_EXT.test(`.${fromName}`)) return fromName;
  if (type === "image/svg+xml") return "svg";
  if (type === "image/webp") return "webp";
  if (type === "image/gif") return "gif";
  if (type === "image/avif") return "avif";
  if (type === "image/jpeg") return "jpg";
  return "png";
}