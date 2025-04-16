import type { SingleRelationshipField } from "payload";

export const createWarrantiesField = (): SingleRelationshipField => {
  return {
    name: "warranties",
    type: "relationship",
    relationTo: "warranties",
    hasMany: true,
    required: false,
    admin: {
      description: "Select the warranties for the product",
    },
  };
};
