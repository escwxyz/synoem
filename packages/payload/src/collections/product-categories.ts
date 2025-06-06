import type { CollectionConfig } from "payload";
import { getProductCategoryOptions, PRODUCT_TYPES, type ProductTypeId } from "@synoem/config";
import { slug } from "../fields";

export const createProductCategoryCollection = (productTypeId: ProductTypeId): CollectionConfig => {
  return {
    slug: `${productTypeId}-categories`,
    admin: {
      useAsTitle: "title",
      group: "Product Categories",
    },
    defaultPopulate: {
      slug: true,
      description: true,
      heroImage: true,
    },
    fields: [
      {
        name: "title",
        type: "select",
        options: getProductCategoryOptions(productTypeId),
      },
      ...slug(),
      {
        name: "description",
        type: "textarea",
        localized: true,
      },
      {
        name: "heroImage",
        type: "upload",
        relationTo: "images",
        admin: {
          description: "The hero image will be displayed on the product category page",
        },
      },
    ],
    hooks: {},
  };
};

export const productCategoryCollections = Object.keys(PRODUCT_TYPES).map((typeId) =>
  createProductCategoryCollection(typeId as ProductTypeId),
);
