import type { GlobalConfig } from "payload";
import { link } from "../fields/link";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { revalidateGlobal } from "../hooks";
import { anyone } from "../access";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: anyone,
  },
  admin: {
    group: "Settings",
  },
  fields: [
    {
      name: "columns",
      type: "array",
      label: "Columns",
      admin: {
        description: "Add multiple columns to organize footer content",
        components: {
          RowLabel: "@synoem/cms/components/row-labels#FooterColumnLabel",
        },
      },
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: "size",
          type: "select",
          label: "Column Size",
          defaultValue: "medium",
          options: [
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
          ],
        },
        {
          name: "blockType",
          type: "radio",
          label: "Column Type",
          defaultValue: "linkGroup",
          options: [
            {
              label: "Link Group",
              value: "linkGroup",
            },
            {
              label: "Custom Content",
              value: "content",
            },
            {
              label: "Contact Info",
              value: "contactInfo",
            },
          ],
          admin: {
            layout: "horizontal",
          },
        },
        {
          name: "linkGroup", //TODO
          type: "group",
          label: "Link Group",
          admin: {
            condition: (_data, siblingData) => siblingData.blockType === "linkGroup",
          },
          fields: [
            {
              name: "title",
              type: "text",
              label: "Title",
              required: true,
              localized: true,
            },
            {
              name: "links",
              type: "array",
              label: "Links",
              fields: [
                link({
                  appearances: false,
                }),
              ],
              admin: {
                components: {
                  RowLabel: "@synoem/cms/components/row-labels#FooterLinkGroupLabel",
                },
              },
            },
          ],
        },
        {
          name: "content",
          type: "group",
          label: "Custom Content",
          admin: {
            condition: (_data, siblingData) => siblingData.blockType === "content",
          },
          fields: [
            {
              name: "title",
              type: "text",
              label: "Title",
              localized: true,
            },
            {
              name: "richText",
              type: "richText",
              editor: lexicalEditor({}),
              label: "Content",
              localized: true,
            },
          ],
        },
        {
          name: "contactInfo",
          type: "ui",
          label: "Contact Info",
          admin: {
            condition: (_data, siblingData) => siblingData.blockType === "contactInfo",
            components: {
              // Field: "@/payload/components/contact-info#ContactInfoPreview",
            },
          },
        },
      ],
    },
    {
      type: "collapsible",
      label: "Bottom Bar",
      fields: [
        {
          name: "copyright",
          type: "text",
          label: "Copyright Text",
          localized: true,
        },

        {
          name: "links",
          type: "array",
          label: "Bottom Links",
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: "@synoem/cms/components/row-labels#FooterBottomLinkRowLabel",
            },
          },
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 6,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
};
