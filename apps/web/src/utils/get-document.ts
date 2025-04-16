import type { BasePayload } from "payload";
import type { Document } from "@synoem/payload/payload-types";

interface Props {
  document: Document | number | null | undefined;
  payload: BasePayload;
}

export const getDocumentUrl = async ({ document, payload }: Props) => {
  if (!document) {
    return null;
  }

  if (typeof document === "number") {
    const fileData = await payload.find({
      collection: "documents",
      where: {
        id: {
          equals: document,
        },
      },
      limit: 1,
    });

    if (fileData.docs.length === 0) {
      return null;
    }

    const { url } = fileData.docs[0];

    if (!url) {
      return null;
    }

    return url;
  }

  if (!document.url) {
    return null;
  }

  return document.url;
};
