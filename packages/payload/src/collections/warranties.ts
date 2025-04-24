import type { CollectionConfig } from "payload";
import { createDurationGroup } from "../fields/unit";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const Warranties: CollectionConfig = {
  slug: "warranties",
  admin: {
    useAsTitle: "title",
    group: "Downloads",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
    },
    {
      type: "collapsible",
      label: "Product Warranty",
      fields: [
        {
          name: "productWarranty",
          type: "checkbox",
          label: "Product Warranty",
          defaultValue: true,
        },
        {
          name: "descProduct",
          type: "richText",
          label: "Product Warranty Description",
          localized: true,
          editor: lexicalEditor({}),
          admin: {
            condition: (data, siblingData) => data.productWarranty,
          },
        },
        createDurationGroup("durationProduct", "Duration of ProductWarranty"),
      ],
    },

    {
      type: "collapsible",
      label: "Power Warranty",
      fields: [
        {
          name: "powerWarranty",
          type: "checkbox",
          label: "Power Warranty",
          defaultValue: false,
        },
        {
          name: "descPower",
          type: "richText",
          label: "Power Warranty Description",
          editor: lexicalEditor({}),
          localized: true,
          admin: {
            condition: (data, siblingData) => data.powerWarranty,
          },
        },
        createDurationGroup("durationPower", "Duration of PowerWarranty"),

        {
          name: "powerDegradation",
          type: "group",
          label: "Power Degradation",
          admin: {
            condition: (data, siblingData) => data.powerWarranty,
          },
          fields: [
            {
              name: "initialGuarantee",
              type: "number",
              label: "Initial Year Guarantee (%)",
              required: true,
              min: 0,
              max: 100,
              defaultValue: 99,
            },
            {
              name: "annual",
              type: "number",
              label: "Annual Degradation (%)",
              required: true,
              min: 0,
              max: 5,
              defaultValue: 0.4,
            },
            {
              name: "endYearGuarantee",
              type: "number",
              label: "End Year Guarantee (%)",
              required: true,
              min: 0,
              max: 100,
              defaultValue: 87.4,
            },
            {
              name: "compareWithIndustry",
              type: "checkbox",
              label: "Compare with Industry Standard",
              defaultValue: true,
            },
            {
              name: "industryStd",
              type: "group",
              label: "Industry Standard Data",
              admin: {
                condition: (data) => data.powerDegradation?.compareWithIndustry,
              },
              fields: [
                {
                  name: "initialValue",
                  type: "number",
                  label: "Initial Year Value (%)",
                  defaultValue: 99,
                },
                {
                  name: "annualDegradation",
                  type: "number",
                  label: "Annual Degradation (%)",
                  defaultValue: 0.63,
                },
                {
                  name: "endYearValue",
                  type: "number",
                  label: "End Year Value (%)",
                  defaultValue: 80,
                },
              ],
            },
          ],
        },
      ],
    },

    {
      name: "file",
      type: "upload",
      relationTo: "documents",
      label: "File",
      hasMany: false,
      admin: {
        description: "File of the warranty",
      },
      filterOptions: {
        mimeType: {
          equals: "application/pdf",
        },
      },
    },
    {
      name: "fileDesc",
      type: "text",
      label: "File Description",
      admin: {
        condition: (data, siblingData) => data.file,
      },
    },
  ],
};
