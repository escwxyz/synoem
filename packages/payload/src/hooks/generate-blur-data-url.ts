import type { CollectionBeforeChangeHook } from "payload";
import type { Image } from "@synoem/types";
import sharp from "sharp";

export const generateBlurDataUrl: CollectionBeforeChangeHook<Image> = async ({
  req,
  operation,
  data,
}) => {
  if (!req.file || !req.file.data || req.file.mimetype.includes("svg") || operation !== "create") {
    return data;
  }

  const buffer = await sharp(req.file.data)
    .resize({
      width: 8,
    })
    .toFormat("webp")
    .toBuffer();

  const base64 = buffer.toString("base64");

  data.blurDataUrl = `data:image/webp;base64,${base64}`;

  return data;
};
