export const getMetadata = (headers: Headers) => {
  const userAgent = headers.get("user-agent") || "unknown";
  const ipAddress =
    headers.get("cf-connecting-ip") || headers.get("x-real-ip") || headers.get("x-forwarded-for");
  const referer = headers.get("referer") || "";

  return {
    userAgent,
    ipAddress,
    referer,
  };
};
