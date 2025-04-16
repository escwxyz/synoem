import type { Datasheet } from "@synoem/payload/payload-types";
import type { BasePayload } from "payload";
import { getDocumentUrl } from "./get-document";

interface Props {
  datasheet: number | Datasheet | null | undefined;
  payload: BasePayload;
}

export const getDatasheetFile = async ({ datasheet, payload }: Props) => {
  if (!datasheet) {
    return null;
  }

  if (typeof datasheet === "number") {
    const datasheetData = await payload.find({
      collection: "datasheets",
      where: {
        id: {
          equals: datasheet,
        },
      },
      limit: 1,
    });

    if (datasheetData.docs.length === 0) {
      return null;
    }

    const { file } = datasheetData.docs[0];

    if (!file) {
      return null;
    }

    return await getDocumentUrl({
      document: file,
      payload,
    });
  }

  const { file } = datasheet;

  return await getDocumentUrl({
    document: file,
    payload,
  });
};
