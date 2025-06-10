import type { Block } from "payload";
import { link } from "../fields";

export const HeroParallexBlock: Block = {
  slug: "heroBlock",
  interfaceName: "HeroBlockType",
  admin: {
    group: "Content",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "eyebrow",
              type: "text",
              label: "Eyebrow",
              localized: true,
              admin: {
                description: "A short, optional heading above the main title.",
              },
            },
            {
              name: "title",
              type: "text",
              label: "Title",
              required: true,
              localized: true,
              admin: {
                description: "Main heading for the block.",
              },
            },
            {
              name: "subtitle",
              type: "text",
              label: "Subtitle",
              required: false,
              localized: true,
              admin: {
                description: "Secondary heading under the main title.",
              },
            },
            {
              name: "description",
              type: "text",
              label: "Description",
              localized: true,
              admin: {
                description: "Longer body text or paragraph content.",
              },
            },
            {
              type: "array",
              name: "rows",
              label: "Rows",
              required: true,
              admin: {
                description: "Add 2 to 3 rows of content",
              },
              minRows: 2,
              maxRows: 3,
              fields: [
                {
                  type: "array",
                  name: "contents",
                  label: "Contents",
                  admin: {
                    description: "Add content for each row",
                  },
                  required: true,
                  minRows: 3,
                  maxRows: 6,
                  fields: [
                    {
                      type: "text",
                      name: "title",
                      label: "Title",
                      localized: true,
                      required: true,
                    },
                    {
                      type: "text",
                      name: "description",
                      label: "Description",
                      localized: true,
                    },
                    {
                      type: "upload",
                      name: "image",
                      label: "Image",
                      relationTo: "images",
                      required: true,
                    },
                    link({
                      disableLabel: true,
                      localizedLabel: true,
                      required: true,
                      overrides: {
                        name: "link",
                        label: "Link",
                      },
                    }),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Action Buttons",
          fields: [
            {
              type: "collapsible",
              label: "Primary CTA (Optional)",
              fields: [
                {
                  type: "checkbox",
                  name: "quoteButton",
                  defaultValue: true,
                  admin: {
                    description: "Use the request quote button as the primary CTA",
                  },
                },
                link({
                  required: false,
                  localizedLabel: true,
                  overrides: {
                    name: "ctaPrimary",
                    label: "Primary CTA (Optional)",
                    admin: {
                      condition: (_, siblingData) => !siblingData?.quoteButton,
                    },
                  },
                }),
              ],
            },
            {
              type: "collapsible",
              label: "Secondary CTA (Optional)",
              fields: [
                link({
                  localizedLabel: true,
                  required: false,
                  overrides: {
                    name: "ctaSecondary",
                    label: "Secondary CTA (Optional)",
                  },
                }),
              ],
            },
          ],
        },
        {
          label: "Animation",
          fields: [],
        },
      ],
    },
  ],
};
