import type { SingleRelationshipField } from "payload";

export const createPackagingConfig = (): SingleRelationshipField => {
  return {
    name: "packagingConfig",
    type: "relationship",
    relationTo: "packaging-configs",
    hasMany: false,
    admin: {
      description: "Select the packaging configuration for the product",
    },
    required: true,
  };
};
