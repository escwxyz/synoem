import type { Drawing } from "@synoem/payload/payload-types";
import type { BasePayload } from "payload";

interface Props {
  drawing: number | Drawing | null | undefined;
  payload: BasePayload;
}

export const getDrawing = async ({ drawing, payload }: Props) => {
  if (!drawing) return null;

  if (typeof drawing === "number") {
    const drawingData = await payload.find({
      collection: "drawings",
      where: {
        id: {
          equals: drawing,
        },
      },
    });

    if (!drawingData) return null;

    return drawingData.docs[0];
  }

  return drawing;
};
