import { link } from "../fields/link";
import type { Block } from "payload";
import { createTitleField } from "../fields/title";
import { createDescriptionField } from "../fields/description";

export const HeroBlock: Block = {
  slug: "heroBlock",
  interfaceName: "HeroBlockType",
  admin: {
    group: "Content",
  },
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
        createTitleField({
          admin: {
            description: "Main heading for the block.",
          },
        }),
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
          admin: {
            description: "Longer body text or paragraph content.",
          },
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
      name: "media",
      label: "Media",
      type: "relationship",
      relationTo: ["images", "videos"],
      hasMany: false,
      required: true,
      admin: {
        description: "Select an image or video to display in the hero section.",
      },
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
                { label: "Left", value: "left" },
                { label: "Right", value: "right" },
              ],
              defaultValue: "left",
              admin: {
                width: "50%",
                description: "Select if text is on the left or the right.",
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
                description: "Align text within its column (left, center, or right).",
              },
            },
          ],
        },
      ],
    },
  ],
};
