import { resourceCollection } from "@/lib/resources";
import { ResourceDef } from "@/lib/crud";

const def: ResourceDef = {
  table: "tool",
  label: "Tool",
  columns: [
    { name: "name", type: "string", required: true },
    { name: "description", type: "string", required: true },
    { name: "icon_url", type: "string", required: true },
  ],
};

export const GET = resourceCollection(def).GET;
export const POST = resourceCollection(def).POST;