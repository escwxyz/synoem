import { deepMerge, type RelationshipField } from "payload";

export const createDatasheetField = ({
  overrides = {},
}: {
  overrides?: Partial<RelationshipField>;
}): RelationshipField => {
  const base: RelationshipField = {
    name: "datasheet",
    type: "relationship",
    relationTo: "datasheets",
    hasMany: false,
    admin: { position: "sidebar" },
  };

  return deepMerge(base, overrides);
};

export const datasheet: RelationshipField = createDatasheetField({});
