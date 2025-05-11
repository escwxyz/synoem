import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  fields: [
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
    },
    {
      name: "designation",
      type: "text",
      label: "Designation",
      localized: true,
      admin: {
        description: "The designation of the person giving the testimonial",
      },
    },
    {
      name: "quote",
      type: "textarea",
      label: "Quote",
      required: true,
    },
    {
      name: "avatar",
      type: "upload",
      label: "Avatar",
      relationTo: "images",
      admin: {
        description: "The avatar of the person giving the testimonial",
      },
    },
  ],
};
