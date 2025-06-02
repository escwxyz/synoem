import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "../hooks";
import { anyone } from "../access";

export const CompanyInfo: GlobalConfig = {
  slug: "company-info",
  admin: {
    group: "Settings",
  },
  access: {
    read: anyone,
  },
  fields: [
    {
      name: "name",
      label: "Company Name",
      type: "text",
      required: true,
    },
    {
      name: "logo",
      label: "Logo",
      type: "upload",
      relationTo: "images",
      hasMany: false,
      required: true,
      admin: {
        description: "The logo of the company",
      },
    },
    {
      name: "logoDark",
      label: "Logo Dark",
      type: "upload",
      relationTo: "images",
      hasMany: false,
      required: false,
      admin: {
        description: "The logo of the company in dark mode",
      },
    },
    {
      name: "openGraphImage",
      label: "Open Graph Image",
      type: "upload",
      relationTo: "images",
      hasMany: false,
      required: false,
      admin: {
        description: "The image used for the open graph image (preferably 1200x630)",
      },
    },
    {
      name: "shortDescription",
      label: "Short Description",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "longDescription",
      label: "Long Description",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "vat",
      label: "VAT Number",
      type: "text",
    },
    {
      name: "registrationNumber",
      label: "Registration Number",
      type: "text",
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
};
