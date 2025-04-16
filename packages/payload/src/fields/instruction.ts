import type { SingleRelationshipField } from "payload";

export const createInstructionField = (): SingleRelationshipField => {
  return {
    name: "instructions",
    type: "relationship",
    relationTo: "instructions",
    hasMany: true,
    admin: {
      description: "Select the instructions for the product",
    },
  };
};
