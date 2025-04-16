import { link } from "../fields/link";
import type { Block } from "payload";
import { createTitleField, title } from "../fields/title";
import { createDescriptionField } from "../fields/description";

export const FeatureBlock: Block = {
  slug: "featureBlock",
  interfaceName: "FeatureBlockType",
  fields: [
    {
      type: "collapsible",
      label: "Text Content",
      admin: {
        initCollapsed: true,
      },
      fields: [
        createTitleField({
          name: "eyebrow",
          label: "Eyebrow",
          required: false,
          admin: {
            description: "A short, optional heading above the main title.",
          },
        }),
        title,
        createTitleField({
          name: "subtitle",
          label: "Subtitle",
          required: false,
          admin: {
            description: "Secondary heading under the main title.",
          },
        }),
        createDescriptionField({
          required: false,
        }),
      ],
    },
    {
      type: "collapsible",
      label: "Primary CTA (Optional)",
      admin: {
        initCollapsed: true,
      },
      fields: [
        link({
          required: false,
          overrides: {
            name: "ctaPrimary",
            label: "Primary CTA (Optional)",
          },
        }),
      ],
    },
    {
      type: "collapsible",
      label: "Secondary CTA (Optional)",
      admin: {
        initCollapsed: true,
      },
      fields: [
        link({
          required: false,
          overrides: {
            name: "ctaSecondary",
            label: "Secondary CTA (Optional)",
          },
        }),
      ],
    },
    {
      name: "features",
      type: "array",
      label: "Features",
      minRows: 1,
      maxRows: 4,
      required: true,
      fields: [
        {
          name: "image",
          label: "Image",
          type: "upload",
          relationTo: "images",
        },
        title,
        createDescriptionField({
          required: false,
        }),
      ],
    },
    {
      type: "collapsible",
      label: "Layout",
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "textPlacement",
              label: "Text Placement",
              type: "select",
              options: [
                { label: "Top", value: "top" },
                { label: "Bottom", value: "bottom" },
              ],
              defaultValue: "top",
              admin: {
                width: "50%",
                description: "Select if text is on the top or the bottom.",
              },
            },
            {
              name: "textAlignment",
              label: "Text Alignment",
              type: "select",
              options: [
                { label: "Start", value: "start" },
                { label: "Center", value: "center" },
                { label: "End", value: "end" },
              ],
              defaultValue: "start",
              admin: {
                width: "50%",
                description:
                  "Align text within its column (left, center, or right).",
              },
            },
          ],
        },
      ],
    },
  ],
};
