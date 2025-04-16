import type { RelationshipField } from "payload";

export const industry: RelationshipField = {
  name: "industry",
  type: "relationship",
  relationTo: "industries",
  required: true,
  hasMany: false,
  label: "Product Industry",
  admin: {
    description: "Select the industry that this product belongs to.",
  },
};
