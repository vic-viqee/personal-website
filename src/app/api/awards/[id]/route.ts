import { resourceItem } from "@/lib/resources";
import { ResourceDef } from "@/lib/crud";

const def: ResourceDef = {
  table: "award",
  label: "Award",
  columns: [
    { name: "title", type: "string", required: true },
    { name: "host", type: "string" },
    { name: "badge_id", type: "string" },
    { name: "is_certificate", type: "boolean", default: false },
    { name: "link", type: "string" },
  ],
};

export const GET = resourceItem(def).GET;
export const PUT = resourceItem(def).PUT;
export const DELETE = resourceItem(def).DELETE;