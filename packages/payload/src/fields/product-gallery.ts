import type { UploadField } from "payload";

export const createGalleryField = (name = "gallery"): UploadField => ({
  name,
  type: "upload",
  label: "Gallery",
  relationTo: "images",
  minRows: 0,
  maxRows: 10,
  hasMany: true,
  admin: {
    description: "Upload images for the product",
  },
});
