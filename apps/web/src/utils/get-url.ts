export const getUrl = (url: string) => {
  if (url.startsWith("http")) {
    return url;
  }

  return `${DMNO_PUBLIC_CONFIG.PUBLIC_API_URL}${url}`;
};
