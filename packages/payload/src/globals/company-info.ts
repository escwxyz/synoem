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
