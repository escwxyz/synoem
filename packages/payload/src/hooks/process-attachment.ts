import type { Attachment } from "../payload-types";
import type { CollectionBeforeChangeHook } from "payload";

export const processAttachment: CollectionBeforeChangeHook<
  Attachment
> = async ({ data, operation }) => {
  if (operation === "create") {
    const { filesize } = data;
    if (filesize && filesize > 10 * 1024 * 1024) {
      throw new Error("File size must be less than 10MB");
    }
    const { mimeType } = data;

    if (mimeType) {
      const extension = mimeType.split("/")[1];
      const allowedExtensions = [
        "jpg",
        "jpeg",
        "png",
        "pdf",
        "doc",
        "docx",
        "xls",
        "xlsx",
      ];
      if (extension && !allowedExtensions.includes(extension)) {
        throw new Error("Invalid file type");
      }
    }
  }
};
