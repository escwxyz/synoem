import type { SingleRelationshipField } from "payload";

export const createCertificationField = (): SingleRelationshipField => {
  return {
    name: "certifications",
    type: "relationship",
    relationTo: "certifications",
    hasMany: true,
    admin: {
      description: "Select the certifications for the product",
    },
  };
};
