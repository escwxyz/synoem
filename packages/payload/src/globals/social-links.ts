import { SOCIAL_PLATFORMS, getPlatformLabel, type SocialPlatform } from "@synoem/config";
import type { GlobalConfig } from "payload";

export const SocialLinks: GlobalConfig = {
  slug: "social-links",
  admin: {
    group: "Setting",
  },
  fields: [
    {
      name: "links",
      type: "array",
      admin: {
        components: {
          RowLabel: "@synoem/payload/components/row-labels#SocialLinkRowLabel",
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
};
