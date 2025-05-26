import { SOCIAL_PLATFORMS, getPlatformLabel, type SocialPlatform } from "@synoem/config";
import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "../hooks";

export const SocialLinks: GlobalConfig = {
  slug: "social-links",
  admin: {
    group: "Settings",
  },
  fields: [
    {
      name: "links",
      type: "array",
      admin: {
        components: {
          RowLabel: "@synoem/cms/components/row-labels#SocialLinkRowLabel",
        },
      },
      fields: [
        {
          name: "platform",
          type: "select",
          required: true,
          options: SOCIAL_PLATFORMS.map((platform) => ({
            label: getPlatformLabel(platform as SocialPlatform),
            value: platform,
          })),
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
};
