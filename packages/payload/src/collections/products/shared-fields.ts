import type { Tab, Field } from "payload";
import {
  create3dModelField,
  createGalleryField,
  createIconSelectField,
  createLeadTimeField,
  createMoqGroup,
  slug,
} from "../../fields";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { formatSku } from "../../hooks";
import { getVariantOptionTypes, type ProductTypeId } from "@synoem/config";
import { createInquiryJoinField } from "../../fields";

export const createSharedFields = (productTypeId: ProductTypeId): Field[] => {
  return [
    {
      name: "id",
      type: "text",
      admin: {
        disabled: true,
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    ...slug(),

    {
      name: "visible",
      type: "checkbox",
      admin: {
        position: "sidebar",
      },
      defaultValue: true,
      label: "Visibility",
    },
    {
      name: "industry",
      type: "relationship",
      relationTo: "industries",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "productCategory",
      type: "relationship",
      relationTo: `${productTypeId}-categories`,
      hasMany: false,
      required: true,
      admin: {
        position: "sidebar",
      },
    },
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
      name: "heroImage",
      type: "upload",
      label: "Hero Image",
      relationTo: "images",
      hasMany: false,
      admin: {
        position: "sidebar",
        description: "Will be used as the hero image on the product page",
      },
    },
    {
      name: "coverImage",
      type: "upload",
      label: "Cover Image",
      relationTo: "images",
      required: true,
      hasMany: false,
      admin: {
        position: "sidebar",
        readOnly: true,
        description:
          "Auto generated from gallery images, if no gallery images are present, the first image in the variants will be used as cover image",
      },
    },
    createInquiryJoinField(),
    create3dModelField(),
  ];
};

export const productDetailsTab: Tab = {
  label: "Details",
  fields: [
    {
      name: "modelName",
      type: "text",
      label: "Model Name",
      required: false,
    },
    {
      name: "description",
      type: "richText",
      editor: lexicalEditor({}),
      label: "Description",
      admin: {
        description: "Comprehensive description of the product",
      },
      required: true,
      localized: true,
    },
    {
      name: "features",
      type: "array",
      minRows: 2,
      maxRows: 6,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
          localized: true,
        },
        createIconSelectField({}),
      ],
    },

    createGalleryField(),
  ],
};

export const createVariantsTab = (productTypeId: ProductTypeId): Tab => {
  return {
    label: "Variants",
    admin: {
      description: "Create variants of the product",
    },
    fields: [
      {
        name: "variants",
        type: "array",
        maxRows: 20,
        minRows: 1,
        required: true,
        interfaceName: "ProductVariants",
        admin: {
          components: {
            beforeInput: [
              {
                path: "@synoem/payload/components/build-variants-button#BuildVariantsButton",
                clientProps: {
                  productTypeId: productTypeId,
                },
              },
            ],
          },
        },
        fields: [
          {
            name: "sku",
            type: "text",
            label: "SKU",
            required: true,
            unique: true,
            hooks: {
              beforeValidate: [formatSku],
            },
          },
          {
            name: "gallery",
            type: "upload",
            admin: {
              isSortable: false,
            },
            hasMany: true,
            label: "Gallery",
            relationTo: "images",
            maxRows: 5,
          },
          {
            name: "options",
            type: "array",
            // TODO: RowLabel
            admin: {
              initCollapsed: true,
            },
            fields: [
              {
                name: "label",
                type: "text",
                required: true,
                admin: {
                  readOnly: true,
                },
                localized: true,
              },
              {
                name: "value",
                type: "text",
                required: true,
                admin: {
                  readOnly: true,
                },
              },
              {
                name: "type",
                type: "select",
                required: true,
                options: getVariantOptionTypes(),
                admin: {
                  readOnly: true,
                },
              },
            ],
            label: "Options",
          },
        ],
      },
    ],
  };
};

export const documentsTab: Tab = {
  label: "Documents",
  fields: [
    {
      name: "drawing",
      type: "relationship",
      relationTo: "drawings",
      hasMany: false,
      required: false,
    },
    {
      name: "warranty",
      type: "relationship",
      relationTo: "warranties",
      hasMany: false,
      required: false,
      admin: {
        description: "Select the warranty for the product",
      },
    },
    {
      name: "datasheet",
      type: "relationship",
      relationTo: "datasheets",
      hasMany: false,
    },
    {
      name: "certifications",
      type: "relationship",
      relationTo: "certifications",
      hasMany: true,
      required: false,
    },
    {
      name: "instructions",
      type: "relationship",
      relationTo: "instructions",
      hasMany: true,
      required: false,
    },
  ],
};

export const oemTab: Tab = {
  label: "OEM Information",
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
    createMoqGroup(),
    createLeadTimeField(),
    {
      name: "packagingConfig",
      type: "relationship",
      relationTo: "packaging-configs",
      hasMany: false,
      required: false,
    },
  ],
};
