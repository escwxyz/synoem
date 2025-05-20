"use server";

import { headers } from "next/headers";

export const getMetadata = async () => {
  const headersList = await headers();

  const userAgent = headersList.get("user-agent") || "unknown";

  const ipAddress =
    headersList.get("cf-connecting-ip") ||
    headersList.get("x-real-ip") ||
    headersList.get("x-forwarded-for");
  const referer = headersList.get("referer") || "";

  return {
    userAgent,
    ipAddress,
    referer,
  };
};
