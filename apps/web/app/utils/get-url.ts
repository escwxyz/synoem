export const getUrl = (url: string) => {
  if (url.startsWith("http")) {
    return url;
  }

  return `${DMNO_PUBLIC_CONFIG.CMS_SERVER_URL}${url}`;
};
