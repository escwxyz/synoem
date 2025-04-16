import type { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";
import { HeroBlock } from "../blocks/hero";
import { ContentBlock } from "../blocks/content";
import { PreviewField } from "@payloadcms/plugin-seo/fields";
import { MetaDescriptionField } from "@payloadcms/plugin-seo/fields";
import { MetaImageField } from "@payloadcms/plugin-seo/fields";
import { MetaTitleField } from "@payloadcms/plugin-seo/fields";
import { OverviewField } from "@payloadcms/plugin-seo/fields";
import { title } from "../fields/title";
import { CallToActionBlock } from "../blocks/call-to-action";
import { MediaBlock } from "../blocks/media";
import { FeatureBlock } from "../blocks/feature";

export const Pages: CollectionConfig<"pages"> = {
  slug: "pages",
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    // livePreview: {
    //   url: ({ data, req }) => {
    //     const path = generatePreviewPath({
    //       slug: typeof data?.slug === "string" ? data.slug : "",
    //       collection: "pages",
    //       req,
    //     });

    //     return path;
    //   },
    // },
    // preview: (data, { req }) =>
    //   generatePreviewPath({
    //     slug: typeof data?.slug === "string" ? data.slug : "",
    //     collection: "pages",
    //     req,
    //   }),
    useAsTitle: "title",
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
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: "Content",
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "images",
            }),

            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
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
    ...slugField(),
  ],
  hooks: {
    // afterChange: [revalidatePage],
    // beforeChange: [populatePublishedAt],
    // afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 1000,
      },
      schedulePublish: true,
    },
    maxPerDoc: 5,
  },
};
