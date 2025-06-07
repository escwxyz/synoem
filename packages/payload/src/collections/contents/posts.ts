import type { CollectionConfig } from "payload";
import { slug } from "../../fields";
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  HorizontalRuleFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { MediaBlock } from "../../blocks/media";
import { admin, editorOrAdmin, published } from "../../access";

export const Posts: CollectionConfig = {
  slug: "posts",
  access: {
    create: editorOrAdmin,
    read: published,
    update: editorOrAdmin,
    delete: admin,
  },
  admin: {
    group: "Content",
    defaultColumns: ["title", "slug", "updatedAt"],
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
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
      name: "tags",
      type: "text",
      hasMany: true,
      localized: true,
      admin: {
        position: "sidebar",
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
