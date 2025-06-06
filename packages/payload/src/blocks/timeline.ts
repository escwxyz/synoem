import type { Block } from "payload";
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { MediaBlock } from "./media";
import { createIconSelectField } from "../fields/icon-select";

export const TimelineBlock: Block = {
  slug: "timelineBlock",
  interfaceName: "TimelineBlockType",
  fields: [
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
        createIconSelectField({
          name: "icon",
          label: "Icon",
          required: false,
        }),
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
