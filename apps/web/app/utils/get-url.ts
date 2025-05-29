export const getUrl = (url: string) => {
  if (url.startsWith("http")) {
    return url;
  }

  return `${process.env.NEXT_PUBLIC_CMS_SERVER_URL}${url}`;
};
