import type { CollectionConfig } from "payload";
import { getProductCategoryOptions, PRODUCT_TYPES, type ProductTypeId } from "@synoem/config";
import { slug } from "../fields";

import {
  MetaImageField,
  PreviewField,
  MetaDescriptionField,
  MetaTitleField,
  OverviewField,
} from "@payloadcms/plugin-seo/fields";
import { generateId } from "../hooks";

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
        name: "id",
        type: "text",
        admin: {
          hidden: true,
        },
      },
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
      // {
      //   name: "parentCategory",
      //   type: "text",
      //   admin: {
      //     description: "Auto-filled based on the selected title's position in hierarchy",
      //     readOnly: true,
      //   },
      //   hooks: {
      //     beforeChange: [
      //       ({ data }) => {
      //         // Extract parent category based on the selected title
      //         if (data.title) {
      //           return getCategoryParent(productTypeId, data.title);
      //         }
      //         return undefined;
      //       }
      //     ]
      //   }
      // },
      // {
      //   name: "breadcrumbs",
      //   type: "array",
      //   admin: {
      //     readOnly: true,
      //     description: "Automatically generated based on category hierarchy"
      //   },
      //   fields: [
      //     {
      //       name: "label",
      //       type: "text"
      //     },
      //     {
      //       name: "value",
      //       type: "text"
      //     }
      //   ],
      //   hooks: {
      //     beforeChange: [
      //       ({ data }) => {
      //         // Generate breadcrumbs based on the category hierarchy
      //         if (data.title) {
      //           return generateCategoryBreadcrumbs(productTypeId, data.title);
      //         }
      //         return [];
      //       }
      //     ]
      //   }
      // },
      {
        name: "meta",
        type: "group",
        fields: [
          OverviewField({
            titlePath: "meta.title",
            descriptionPath: "meta.description",
            imagePath: "meta.coverImage",
          }),
          MetaTitleField({
            hasGenerateFn: true,
          }),
          MetaImageField({
            relationTo: "images",
          }),
          MetaDescriptionField({}),
          PreviewField({
            // if the `generateUrl` function is configured
            hasGenerateFn: false,

            // field paths to match the target field for data
            titlePath: "meta.title",
            descriptionPath: "meta.description",
          }),
        ],
      },
    ],
    hooks: {
      beforeValidate: [generateId],
    },
  };
};

export const productCategoryCollections = Object.keys(PRODUCT_TYPES).map((typeId) =>
  createProductCategoryCollection(typeId as ProductTypeId),
);

// // Helper function to get the parent of a category
// function getCategoryParent(productTypeId: ProductTypeId, categoryValue: string): string | undefined {
//   const productConfig = PRODUCT_TYPES[productTypeId];

//   function findParent(categories: ProductCategoryValue[], target: string, parent?: string): string | undefined {
//     for (const category of categories) {
//       if (category.value === target) {
//         return parent;
//       }

//       if (category.children?.length) {
//         const nestedResult = findParent(category.children, target, category.value);
//         if (nestedResult !== undefined) {
//           return nestedResult;
//         }
//       }
//     }

//     return undefined;
//   }

//   return findParent(productConfig.categories, categoryValue);
// }

// // Helper function to generate breadcrumbs
// function generateCategoryBreadcrumbs(productTypeId: ProductTypeId, categoryValue: string): Array<{ label: string, value: string }> {
//   const productConfig = PRODUCT_TYPES[productTypeId];
//   const breadcrumbs: Array<{ label: string, value: string }> = [];

//   function buildBreadcrumbs(categories: ProductCategoryValue[], target: string, current: Array<{ label: string, value: string }> = []): boolean {
//     for (const category of categories) {
//       const currentPath = [...current, { label: category.label, value: category.value }];

//       if (category.value === target) {
//         breadcrumbs.push(...currentPath);
//         return true;
//       }

//       if (category.children?.length && buildBreadcrumbs(category.children, target, currentPath)) {
//         return true;
//       }
//     }

//     return false;
//   }

//   buildBreadcrumbs(productConfig.categories, categoryValue);
//   return breadcrumbs;
// }

// export function generateCategoryURL(breadcrumbs: Array<{ value: string }>): string {
//   return breadcrumbs.map(crumb => crumb.value).join('/');
// }
