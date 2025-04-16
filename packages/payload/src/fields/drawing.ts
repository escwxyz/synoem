import type { SingleRelationshipField } from "payload";

export const createDrawingField = (): SingleRelationshipField => ({
  name: "drawing",
  type: "relationship",
  relationTo: "drawings",
  hasMany: false,
  required: false,
});
