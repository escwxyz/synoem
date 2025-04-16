export const getMetadata = (headers: Headers) => {
  const userAgent = headers.get("user-agent") || "unknown";
  const forwardedFor = headers.get("x-forwarded-for") || "unknown";
  const referer = headers.get("referer") || "";

  return {
    userAgent,
    forwardedFor,
    referer,
  };
};
