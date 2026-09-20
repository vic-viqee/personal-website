import { NextRequest } from "next/server";
import { ResourceDef, getRowById, updateEntity, deleteEntity, listAll, createEntity } from "@/lib/crud";
import { requireAdmin } from "@/lib/auth";
import { notFound, jsonRow } from "@/lib/db";

export function resourceCollection(def: ResourceDef) {
  return {
    GET: async () => listAll(def),
    POST: async (request: NextRequest) => {
      const denied = await requireAdmin(request);
      if (denied) return denied;
      return createEntity(def, (await request.json()) as Record<string, unknown>);
    },
  };
}

export function resourceItem(def: ResourceDef) {
  type Params = Promise<{ id: string }>;
  return {
    GET: async (_req: NextRequest, { params }: { params: Params }) => {
      const { id } = await params;
      const row = await getRowById(def.table, Number(id));
      if (!row) return notFound(`${def.label} not found`);
      return Response.json(jsonRow(row));
    },
    PUT: async (request: NextRequest, { params }: { params: Params }) => {
      const denied = await requireAdmin(request);
      if (denied) return denied;
      const { id } = await params;
      return updateEntity(def, Number(id), (await request.json()) as Record<string, unknown>);
    },
    DELETE: async (request: NextRequest, { params }: { params: Params }) => {
      const denied = await requireAdmin(request);
      if (denied) return denied;
      const { id } = await params;
      return deleteEntity(def, Number(id));
    },
  };
}