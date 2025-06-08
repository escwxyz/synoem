import { SOCIAL_PLATFORMS, getPlatformLabel, type SocialPlatform } from "@synoem/config";
import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "../hooks";
import { anyone } from "../access";

export const SocialLinks: GlobalConfig = {
  slug: "social-links",
  admin: {
    group: "Settings",
  },
  access: {
    read: anyone,
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
            // TODO: use the icon field here
            label: getPlatformLabel(platform as SocialPlatform),
            value: platform,
          })),
          defaultValue: "facebook",
        },
        {
          name: "url",
          type: "text",
          required: true,
          defaultValue: "https://www.facebook.com/",
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
};
