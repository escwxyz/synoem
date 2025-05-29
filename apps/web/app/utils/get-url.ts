import { webEnvs } from "@synoem/env";

export const getUrl = (url: string) => {
  if (url.startsWith("http")) {
    return url;
  }

  return `${webEnvs.NEXT_PUBLIC_CMS_SERVER_URL}${url}`;
};
