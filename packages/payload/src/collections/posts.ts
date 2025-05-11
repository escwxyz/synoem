import type { CollectionConfig } from "payload";
import { slug } from "../fields";
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  HorizontalRuleFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { MediaBlock } from "../blocks/media";
import { PreviewField } from "@payloadcms/plugin-seo/fields";
import { MetaDescriptionField } from "@payloadcms/plugin-seo/fields";
import { MetaImageField } from "@payloadcms/plugin-seo/fields";
import { OverviewField } from "@payloadcms/plugin-seo/fields";
import { MetaTitleField } from "@payloadcms/plugin-seo/fields";
import { admin, editorOrAdmin, published } from "../access";

export const Posts: CollectionConfig = {
  slug: "posts",
  access: {
    create: editorOrAdmin,
    read: published,
    update: editorOrAdmin,
    delete: admin,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    // {
    //   name: "postCategories",
    //   type: "relationship",
    //   relationTo: "post-categories",
    //   hasMany: true,
    //   admin: {
    //     position: "sidebar",
    //   },
    // },
    ...slug(),
    {
      name: "authors",
      type: "relationship",
      admin: {
        position: "sidebar",
      },
      hasMany: true,
      relationTo: "users",
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },

    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "coverImage",
              type: "upload",
              relationTo: "images",
              required: true,
            },
            {
              name: "content",
              type: "richText",
              localized: true,
              label: false,
              required: true,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
                    BlocksFeature({
                      blocks: [MediaBlock],
                    }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ];
                },
              }),
            },
          ],
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
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
  ],
  versions: {
    drafts: {
      autosave: true,
      schedulePublish: true,
    },
    maxPerDoc: 5,
  },
};
