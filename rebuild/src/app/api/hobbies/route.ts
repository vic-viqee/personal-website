import { resourceCollection } from "@/lib/resources";
import { ResourceDef } from "@/lib/crud";

const def: ResourceDef = {
  table: "hobby",
  label: "Hobby",
  columns: [
    { name: "name", type: "string", required: true },
    { name: "side", type: "string", default: "left" },
  ],
};

export const GET = resourceCollection(def).GET;
export const POST = resourceCollection(def).POST;