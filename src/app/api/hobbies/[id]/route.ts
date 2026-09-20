import { resourceItem } from "@/lib/resources";
import { ResourceDef } from "@/lib/crud";

const def: ResourceDef = {
  table: "hobby",
  label: "Hobby",
  columns: [
    { name: "name", type: "string", required: true },
    { name: "side", type: "string", default: "left" },
  ],
};

export const GET = resourceItem(def).GET;
export const PUT = resourceItem(def).PUT;
export const DELETE = resourceItem(def).DELETE;