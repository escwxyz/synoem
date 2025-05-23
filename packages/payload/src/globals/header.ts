import type { Field, GlobalConfig } from "payload";
import { link } from "../fields/link";
import { createTitleField } from "../fields/title";
import { createDescriptionField } from "../fields/description";
import { createIconSelectField } from "../fields/icon-select";
import { revalidateGlobals } from "../hooks";

const menuItemFields: Field[] = [
  {
    name: "text",
    type: "text",
    required: true,
    label: "Menu Text",
    localized: true,
  },

  {
    name: "type",
    type: "select",
    required: true,
    options: [
      {
        label: "Section",
        value: "section",
      },
      {
        label: "Link",
        value: "link",
      },
    ],
  },

  link({
    disableLabel: true,
    overrides: {
      label: "Link",
      admin: {
        condition: (data, siblingData) => siblingData?.type === "link",
      },
    },
  }),
  {
    name: "sections",
    type: "array",
    label: "Menu Sections",
    admin: {
      description: "Add sections to create a dropdown or mega menu",
      condition: (data, siblingData) => siblingData?.type === "section",
      components: {
        RowLabel: "@synoem/cms/components/row-labels#MenuSectionLabel",
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
            interfaceName: "LinkItems",
            admin: {
              components: {
                RowLabel: "@synoem/cms/components/row-labels#LinkItemLabel",
              },
            },
            fields: [
              createIconSelectField({
                name: "icon",
                label: "Icon",
                required: false,
              }),
              createTitleField({
                name: "title",
                required: true,
              }),
              createDescriptionField({
                required: false,
              }),
              link({
                required: true,
                disableLabel: true,
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
    group: "Settings",
    description: "Configure website navigation",
  },
  fields: [
    {
      name: "items",
      type: "array",
      label: "Menu Items",
      interfaceName: "MenuItems",
      admin: {
        description: "Configure navigation menu items",
        components: {
          RowLabel: "@synoem/cms/components/row-labels#MenuItemLabel",
        },
      },
      fields: menuItemFields,
    },
  ],
  hooks: {
    afterChange: [revalidateGlobals],
  },
};
