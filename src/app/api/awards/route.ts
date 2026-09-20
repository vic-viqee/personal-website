import { resourceCollection } from "@/lib/resources";
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

export const GET = resourceCollection(def).GET;
export const POST = resourceCollection(def).POST;