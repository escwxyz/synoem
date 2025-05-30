import type { CollectionConfig } from "payload";
import { slug } from "../fields";
import { HeroBlock } from "../blocks/hero";
import { ContentBlock } from "../blocks/content";
import { title } from "../fields/title";
import { CallToActionBlock } from "../blocks/call-to-action";
import { MediaBlock } from "../blocks/media";
import { FeatureBlock } from "../blocks/feature";
import { TimelineBlock } from "../blocks/timeline";
import { FAQBlock } from "../blocks/faq";
import { admin, authenticatedOrPublished } from "../access";
import { revalidateCollection } from "../hooks";

export const Pages: CollectionConfig<"pages"> = {
  slug: "pages",
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    useAsTitle: "title",
    group: "Content",
  },
  access: {
    read: authenticatedOrPublished,
    create: admin,
    update: admin,
  },
  fields: [
    title,
    {
      type: "tabs",
      tabs: [
        {
          fields: [
            {
              name: "layout",
              type: "blocks",
              blocks: [
                HeroBlock,
                ContentBlock,
                CallToActionBlock,
                MediaBlock,
                FeatureBlock,
                TimelineBlock,
                FAQBlock,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: "Content",
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "prerender",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Whether to prerender the page",
      },
    },
    ...slug(),
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 1000,
      },
      schedulePublish: true,
    },
    maxPerDoc: 5,
  },
  hooks: {
    afterChange: [revalidateCollection],
  },
};
