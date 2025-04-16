import type {
  CollectionSlug,
  FilterOptions,
  SingleRelationshipField,
} from "payload";

type Props = {
  relationTo: CollectionSlug;
  filterOptions: FilterOptions;
};

export const createRelatedProductsField = ({
  relationTo,
  filterOptions,
}: Props): SingleRelationshipField => {
  return {
    name: "relatedProducts",
    type: "relationship",
    relationTo,
    hasMany: true,
    maxRows: 10,
    admin: {
      description: "Select related products (max 10)",
    },
    filterOptions,
  };
};
