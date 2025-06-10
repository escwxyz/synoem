import type { Block } from "payload";
import { validateRange } from "../validation";

export const CarbonCalculatorBlock: Block = {
  slug: "carbonCalculatorBlock",
  interfaceName: "CarbonCalculatorBlockType",
  admin: {
    group: "Functionality",
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
      localized: true,
      defaultValue: "Learn How Much You Can Contribute",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      required: true,
      localized: true,
      defaultValue:
        "Discover how much you can contribute to the environment with our solar energy calculator.",
    },
    {
      name: "subtitle",
      label: "Subtitle",
      type: "text",
      required: true,
      localized: true,
      defaultValue: "Carbon Reduction Calculator",
    },
    {
      name: "subDescription",
      label: "Sub Description",
      type: "text",
      required: true,
      localized: true,
      defaultValue: "Calculate your carbon reduction potential with our solar energy calculator.",
    },
    {
      name: "projectCapacity",
      label: "Initial Project Capacity (MW)",
      type: "number",
      min: 0.1,
      max: 1000,
      required: true,
      defaultValue: 1,
    },
    {
      type: "collapsible",
      label: "Constants",
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: "treeEmission",
          label: "Tree CO₂ emission per year (kg)",
          type: "number",
          min: 0,
          max: 100,
          required: true,
          defaultValue: 22,
        },
        {
          name: "treeLifetime",
          label: "Tree Lifetime (years)",
          type: "number",
          min: 1,
          max: 100,
          required: true,
          defaultValue: 25,
        },
        {
          name: "carEmission",
          label: "Car CO₂ emission in ton per year",
          type: "number",
          min: 0,
          max: 100,
          required: true,
          defaultValue: 4.6,
        },
        {
          name: "effectiveHours",
          label: "Effective Hours Range",
          type: "group",
          validate: validateRange,
          fields: [
            {
              name: "min",
              type: "number",
              min: 0,
              defaultValue: 1000,
            },
            {
              name: "max",
              type: "number",
              min: 0,
              defaultValue: 2000,
            },
          ],
        },
        {
          name: "presets",
          label: "Emission Intensity Presets",
          type: "array",
          minRows: 3,
          maxRows: 10,
          // TODO: localization not working as expected, need to fix it
          admin: {
            description:
              "Global Average: 0.5, China: 0.65, India: 0.82, USA: 0.4, EU Average: 0.3, Australia: 0.7",
          },
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "value",
              type: "number",
              min: 0.1,
              max: 1,
              required: true,
              defaultValue: 0.5,
            },
          ],
        },
      ],
    },
    {
      type: "textarea",
      name: "note",
      label: "Note",
      localized: true,
      defaultValue:
        "These calculations are estimates and may vary based on regional differences in energy production and consumption.",
    },
  ],
};
