import { resourceItem } from "@/lib/resources";
import { ResourceDef } from "@/lib/crud";

const def: ResourceDef = {
  table: "educationentry",
  label: "EducationEntry",
  columns: [
    { name: "degree", type: "string", required: true },
    { name: "institution", type: "string", required: true },
    { name: "years", type: "string", default: "" },
  ],
};

export const GET = resourceItem(def).GET;
export const PUT = resourceItem(def).PUT;
export const DELETE = resourceItem(def).DELETE;