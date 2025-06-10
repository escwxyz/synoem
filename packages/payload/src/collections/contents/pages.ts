import type { CollectionConfig } from "payload";
import { slug, pathField, UNIQUE_PATH_COLLECTIONS } from "../../fields";
import { HeroBlock } from "../../blocks/hero";
import { ContentBlock } from "../../blocks/content";
import { title } from "../../fields/title";
import { CallToActionBlock } from "../../blocks/call-to-action";
import { MediaBlock } from "../../blocks/media";
import { LogoCloudBlock } from "../../blocks/logo-cloud";
import { FeaturesBlock } from "../../blocks/features";
import { TimelineBlock } from "../../blocks/timeline";
import { FAQBlock } from "../../blocks/faq";
import { admin, authenticatedOrPublished } from "../../access";
import { revalidateCollection } from "../../hooks";

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
                FeaturesBlock,
                TimelineBlock,
                FAQBlock,
                LogoCloudBlock,
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
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "showLastUpdated",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
      },
    },
    ...slug(),
    ...pathField({}),
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
