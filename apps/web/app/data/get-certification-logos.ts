import { getPayloadClient } from "@synoem/payload/client";
import type { BasePayload } from "@synoem/payload/types";
import type { APIResponse } from "../types/api-response";
import type { Certification } from "@synoem/types";
import { unstable_cache } from "next/cache";

async function getCertificationLogos(
  payloadPromise: Promise<BasePayload> = getPayloadClient(),
): Promise<APIResponse<Pick<Certification, "name" | "logo">[]>> {
  const payload = await payloadPromise;

  try {
    const certifications = await payload.find({
      collection: "certifications",
      limit: 0,
      pagination: false,
      select: {
        name: true,
        logo: true,
      },
    });

    return {
      status: "success",
      data: certifications.docs,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      messageKey: "api.getCertificationLogos.error",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        details: error,
      },
    };
  }
}

export const getCertificationLogosCached = () => {
  const tags = ["certifications"];

  return unstable_cache(
    async () => {
      return await getCertificationLogos();
    },
    tags,
    {
      revalidate: DMNO_PUBLIC_CONFIG.WEB_APP_ENV === "production" ? false : 30,
      tags,
    },
  );
};
