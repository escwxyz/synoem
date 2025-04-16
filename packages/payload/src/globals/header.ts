import type { Field, GlobalConfig } from "payload";
import { link } from "../fields/link";
import { createTitleField } from "../fields/title";
import { createDescriptionField } from "../fields/description";

const menuItemFields: Field[] = [
  {
    name: "text",
    type: "text",
    required: true,
    label: "Menu Text",
  },
  link({
    overrides: {
      label: "Link (Optional)",
    },
  }),
  {
    name: "sections",
    type: "array",
    label: "Menu Sections",
    admin: {
      description: "Add sections to create a dropdown or mega menu",
      components: {
        // RowLabel: "@/payload/components/header-row-label#MenuSectionLabel",
      },
    },
    fields: [
      {
        name: "type",
        type: "select",
        defaultValue: "links",
        options: [
          { label: "Links Section", value: "links" },
          { label: "Banner", value: "banner" },
        ],
      },
      {
        name: "linksSection",
        type: "group",
        admin: {
          condition: (data, siblingData) => siblingData?.type === "links",
        },
        fields: [
          createTitleField({
            name: "title",
            label: "Section Title",
            required: false,
          }),
          {
            name: "items",
            type: "array",
            admin: {
              components: {
                // RowLabel: "@/payload/components/header-row-label#LinkItemLabel",
              },
            },
            fields: [
              // iconSelect,
              // createIconField({
              //   name: "iconGradient",
              //   label: "Icon Gradient",
              // }),
              createTitleField({
                name: "title",
                required: true,
              }),
              createDescriptionField({
                required: false,
              }),
              link({
                required: true,
              }),
            ],
          },
          {
            name: "isExtended",
            type: "checkbox",
            label: "Extended Layout",
            defaultValue: false,
          },
        ],
      },
      {
        name: "banner",
        type: "group",
        admin: {
          condition: (data, siblingData) => siblingData?.type === "banner",
        },
        fields: [
          createTitleField({
            name: "title",
            required: true,
          }),
          createDescriptionField({
            required: false,
          }),
          {
            name: "media",
            type: "relationship",
            relationTo: ["images", "videos"],
            hasMany: false,
          },
          link({
            overrides: {
              label: "Banner Link",
            },
          }),
        ],
      },
    ],
  },
];

export const Header: GlobalConfig = {
  slug: "header",
  admin: {
    group: "Layout",
    description: "Configure website navigation",
  },
  fields: [
    {
      name: "items",
      type: "array",
      label: "Menu Items",
      admin: {
        description: "Configure navigation menu items",
        components: {
          //   RowLabel: "@/payload/components/header-row-label#MenuItemLabel",
        },
      },
      fields: menuItemFields,
    },
    {
      name: "settings",
      type: "group",
      fields: [
        {
          name: "desktop",
          type: "group",
          fields: [
            {
              name: "alignment",
              type: "select",
              defaultValue: "left",
              options: [
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
              ],
            },
          ],
        },
        {
          name: "mobile",
          type: "group",
          fields: [
            {
              name: "hamburgerPosition",
              type: "select",
              defaultValue: "right",
              options: [
                { label: "Left", value: "left" },
                { label: "Right", value: "right" },
              ],
            },
            {
              name: "animation",
              type: "select",
              defaultValue: "slide",
              options: [
                { label: "Slide", value: "slide" },
                { label: "Fade", value: "fade" },
              ],
            },
            {
              name: "showAuthButtons",
              type: "checkbox",
              label: "Show Auth Buttons",
              defaultValue: true,
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    // afterChange: [revalidateHeader], // getCachedGlobal("header")
  },
};
