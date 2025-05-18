export const getUrl = (url: string) => {
  if (url.startsWith("http")) {
    return url;
  }

  return `${DMNO_CONFIG.NEXT_SERVER_URL}${url}`;
};
