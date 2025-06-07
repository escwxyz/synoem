import type { Field, GlobalConfig } from "payload";
import { link } from "../fields/link";
import { iconField } from "../fields";
import { createTitleField } from "../fields/title";

import { revalidateGlobal } from "../hooks";
import { anyone } from "../access";

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
        label: "Mega Menu",
        value: "mega",
      },
      {
        label: "Link",
        value: "link",
      },
    ],
  },

  link({
    disableLabel: true,
    appearances: false,
    overrides: {
      label: "Link",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "link",
      },
    },
  }),
  {
    name: "megaItems",
    type: "array",
    label: "Mega Menu Items",
    interfaceName: "MegaMenuItems",
    admin: {
      condition: (_, siblingData) => siblingData?.type === "mega",
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
          condition: (_, siblingData) => siblingData?.type === "links",
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
              iconField(),
              createTitleField({
                name: "title",
                required: true,
              }),
              {
                name: "description",
                type: "text",
                label: "Description",
                localized: true,
              },
              link({
                appearances: false,
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
          condition: (_, siblingData) => siblingData?.type === "banner",
        },
        fields: [
          createTitleField({
            name: "title",
            required: true,
          }),
          {
            name: "description",
            type: "text",
            label: "Description",
            localized: true,
          },
          {
            name: "media",
            type: "relationship",
            relationTo: ["images", "videos"],
            hasMany: false,
          },
          link({
            appearances: false,
            disableLabel: true,
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
  },
  access: {
    read: anyone,
  },
  fields: [
    {
      name: "items",
      type: "array",
      label: "Menu Items",
      interfaceName: "MenuItems",
      admin: {
        components: {
          RowLabel: "@synoem/cms/components/row-labels#MenuItemLabel",
        },
      },
      fields: menuItemFields,
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
};
