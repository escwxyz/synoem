import type { Block } from "payload";
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { MediaBlock } from "./media";
import { iconField } from "../fields";

export const TimelineBlock: Block = {
  slug: "timelineBlock",
  interfaceName: "TimelineBlockType",
  admin: {
    group: "Content",
  },
  labels: {
    singular: "Timeline Block",
    plural: "Timeline Blocks",
  },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      admin: {
        description: "Title of the timeline block",
      },
    },
    {
      name: "description",
      type: "text",
      localized: true,
      admin: {
        description: "Description of the timeline block",
      },
    },
    {
      name: "items",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
          localized: true,
          label: "Title",
          required: true,
        },
        iconField(),
        {
          name: "date",
          type: "date",
          label: "Date",
          required: true,
        },
        {
          name: "datePrecision",
          type: "select",
          label: "Date Precision",
          options: [
            { label: "Year", value: "year" },
            { label: "Month", value: "month" },
            { label: "Day", value: "day" },
          ],
          defaultValue: "year",
        },
        {
          name: "content",
          type: "richText",
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
                BlocksFeature({
                  blocks: [MediaBlock],
                }),
              ];
            },
          }),
          localized: true,
          required: true,
        },
      ],
    },
  ],
};
