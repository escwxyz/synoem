import type { UploadField } from "payload";

export const createCoverImageField = (name = "cover"): UploadField => ({
  name,
  type: "upload",
  required: true,
  label: "Cover Image",
  relationTo: "images",
  hasMany: false,
  admin: {
    description: "The cover image for the product",
    position: "sidebar",
  },
});

export const coverImage = createCoverImageField();
