import type { GlobalConfig } from "payload";
import { revalidateGlobals } from "../hooks";

export const CompanyInfo: GlobalConfig = {
  slug: "company-info",
  admin: {
    group: "Settings",
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
    afterChange: [revalidateGlobals],
  },
};
