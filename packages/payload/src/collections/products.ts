import type { CollectionConfig, Field, Tab } from "payload";
import { slugField } from "../fields/slug";
import { createProductFeaturesField } from "../fields/product-features";
import { PRODUCT_CATEGORIES } from "@synoem/config";
import { solarPanelBlock } from "../blocks/products/solar-panel";
import { industry } from "../fields/industry";
import { modelName } from "../fields/model-name";
import { create3dModelField } from "../fields/3d-model";
import { createDimensionsGroup } from "../fields/dimensions";
import { createWeightGroup } from "../fields/unit";
import { createDrawingField } from "../fields/drawing";
import { createMoqGroup } from "../fields/moq";
import { createPackagingConfig } from "../fields/packaging-config";
import { createLeadTimeField } from "../fields/lead-time";
import { createWarrantiesField } from "../fields/warranties";
import { createInstructionField } from "../fields/instruction";
import { datasheet } from "../fields/datasheet";
import { createCertificationField } from "../fields/certification";
import { pumpControllerBlock } from "../blocks/products/pump-controller";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

const baseFields: Field[] = [
  {
    name: "title",
    type: "text",
    label: "Title",
    required: true,
    localized: true,
  },
  {
    name: "category",
    type: "select",
    label: "Product Category",
    options: Object.values(PRODUCT_CATEGORIES).map((category) => ({
      label: category.name,
      value: category.pluralSlug,
    })),
    required: true,
    admin: {
      position: "sidebar",
    },
  },
  ...slugField(),
  {
    name: "excerpt",
    type: "textarea",
    label: "Excerpt",
    required: true,
    admin: {
      position: "sidebar",
    },
  },
  {
    name: "coverImage",
    type: "upload",
    label: "Cover Image",
    relationTo: "images",
    required: true,
    admin: {
      position: "sidebar",
      description:
        "Use a landscape image as cover image, which will be placed on the hero section of the product page",
    },
  },
  {
    name: "visibility",
    type: "checkbox",
    label: "Visibility",
    defaultValue: true,
    admin: {
      position: "sidebar",
    },
  },
  // TODO: product details layout config
  //   {
  //     name: "layout",
  //     type: "relationship",
  //     relationTo: "layouts",
  //     hasMany: false,
  //     admin: {
  //       position: "sidebar",
  //     },
  //   },

  // TODO: related products
];

const productDetailsTab: Tab = {
  label: "Product Details",
  fields: [
    modelName,
    {
      name: "description",
      type: "richText",
      editor: lexicalEditor({}),
      label: "Description",
      admin: {
        description: "Comprehensive description of the product",
      },
    },
    industry,
    {
      name: "gallery",
      type: "upload",
      label: "Gallery",
      relationTo: "images",
      required: true,
      minRows: 0,
      maxRows: 10,
      hasMany: true,
      admin: {
        description: "Upload images for the product",
      },
    },
    createProductFeaturesField(),
    create3dModelField(),
    createDimensionsGroup(),
    createWeightGroup("weight", "Weight"),
    {
      type: "collapsible",
      label: "Product Specs",
      fields: [
        {
          name: "solarPanel",
          type: "blocks",
          admin: {
            condition: (data) => data?.category === "solar-panels",
          },
          blocks: [solarPanelBlock],
          maxRows: 1,
          minRows: 1,
          // TODO: validate
        },
        {
          name: "pumpController",
          type: "blocks",
          admin: {
            condition: (data) => data?.category === "pump-controllers",
          },
          blocks: [pumpControllerBlock],
          maxRows: 1,
          minRows: 1,
          // TODO: validate
        },
      ],
    },
  ],
};

const manufacturingTab: Tab = {
  label: "Manufacturing",
  fields: [
    {
      name: "oem",
      type: "richText",
      editor: lexicalEditor({}),
      label: "OEM",
      admin: {
        description: "OEM description",
      },
    },
    // TODO: add variants
    // Ref: https://github.com/shopnex-ai/shopnex/blob/main/src/collections/Products.ts#L97
    createMoqGroup(),
    createLeadTimeField(),
    createPackagingConfig(),
  ],
};

const documentsTab: Tab = {
  label: "Documents",
  fields: [
    createDrawingField(),
    createWarrantiesField(),
    createInstructionField(),
    datasheet,
    createCertificationField(),
  ],
};

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    group: "Products",
  },
  fields: [
    ...baseFields,
    {
      type: "tabs",
      tabs: [productDetailsTab, documentsTab, manufacturingTab],
    },
  ],
  // TODO: remove in production
  versions: {
    drafts: {
      autosave: {
        interval: 5000,
      },
      schedulePublish: true,
    },
    maxPerDoc: 1,
  },
};
