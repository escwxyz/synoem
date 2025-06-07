import type { Block } from "payload";
import { iconField } from "../fields";

export const FeatureBlock: Block = {
  slug: "featureBlock",
  interfaceName: "FeatureBlockType",
  labels: {
    singular: "Feature Block",
    plural: "Feature Blocks",
  },
  admin: {
    group: "Content",
  },
  fields: [
    {
      name: "type",
      type: "select",
      options: [
        {
          label: "Text",
          value: "text",
        },
        {
          label: "Number",
          value: "number",
        },
      ],
      defaultValue: "text",
      required: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Title",
          localized: true,
          // @ts-expect-error - siblingData is not typed
          validate: (value, { siblingData }) => {
            if (siblingData.type === "text" && !value) {
              return "Text is required when type is text";
            }
            return true;
          },
          admin: {
            condition: (_, siblingData) => siblingData.type === "text",
            width: "50%",
          },
        },
        {
          name: "number",
          type: "number",
          label: "Number",
          // @ts-expect-error - siblingData is not typed
          validate: (value, { siblingData }) => {
            if (siblingData.type === "number" && !value) {
              return "Number is required when type is number";
            }
            return true;
          },
          admin: {
            condition: (_, siblingData) => siblingData.type === "number",
            width: "50%",
          },
        },
        {
          name: "description",
          type: "text",
          label: "Description",
          required: false,
          localized: true,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    iconField({
      required: true,
    }),
    {
      type: "collapsible",
      label: "Configuration",
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: "delay",
          type: "number",
          label: "Delay",
          defaultValue: 0,
          admin: {
            description: "Delay in seconds before the feature content starts to animate",
          },
        },
        {
          name: "withPlus",
          type: "checkbox",
          label: "With Plus",
          defaultValue: false,
          admin: {
            description: "If checked, the number will be appended with a plus sign",
            condition: (_, siblingData) => siblingData.type === "number",
          },
        },
        {
          name: "isPercentage",
          type: "checkbox",
          label: "Is Percentage",
          defaultValue: false,
          admin: {
            description: "If checked, the number will be displayed as a percentage",
            condition: (_, siblingData) => siblingData.type === "number",
          },
        },
        {
          name: "startValue",
          type: "number",
          label: "Start Value",
          defaultValue: 0,
          admin: {
            description: "Ticker will start from this value",
            condition: (_, siblingData) => siblingData.type === "number",
          },
        },
        {
          name: "decimalPlaces",
          type: "number",
          label: "Decimal Places",
          defaultValue: 0,
          admin: {
            description: "Number of decimal places to display",
            condition: (_, siblingData) => siblingData.type === "number",
          },
        },
        {
          name: "direction",
          type: "select",
          label: "Direction",
          options: ["up", "down"],
          defaultValue: "up",
          admin: {
            description: "Direction of the number ticker",
            condition: (_, siblingData) => siblingData.type === "number",
          },
        },
        {
          name: "iconBackground",
          type: "checkbox",
          label: "Icon Background",
          defaultValue: true,
          admin: {
            description: "If checked, the icon will have a background",
            condition: (_, siblingData) => siblingData.type === "number",
          },
        },
        {
          name: "alignment",
          type: "select",
          label: "Alignment",
          options: ["default", "reverse", "between", "between-reverse", "center"],
          defaultValue: "default",
          admin: {
            description: "Alignment of the icon and content",
          },
        },
      ],
    },
  ],
};
