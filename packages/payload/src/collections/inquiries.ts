import type { CollectionConfig } from "payload";
import { admin } from "../access";
import { createQuantityGroup } from "../fields/unit";
import {
  COUNTRIES_REGIONS,
  CUSTOMER_TYPES,
  PRODUCT_CATEGORIES,
  INQUIRY_SOURCES,
  getProductCategoryOptions,
} from "@synoem/config";

export const Inquiries: CollectionConfig<"inquiries"> = {
  slug: "inquiries",
  admin: {
    useAsTitle: "formType",
    defaultColumns: ["basicInfo.name", "status", "formType", "createdAt"],
    group: "Forms",
  },
  access: {
    create: () => true,
  },
  fields: [
    {
      name: "formType",
      type: "select",
      required: true,
      options: [
        { label: "Simple", value: "simple" },
        { label: "Product", value: "product" },
        { label: "Full", value: "full" },
      ],
      defaultValue: "simple",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "relatedProduct",
      type: "relationship",
      relationTo: ["solar-panels", "pump-controllers"],
      hasMany: false,
      admin: {
        condition: (data) => data.formType === "product",
        description: "Product inquiry related product",
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "status",
      type: "select",
      admin: {
        position: "sidebar",
        description: "Inquiry status",
      },
      options: [
        { label: "New", value: "new" },
        { label: "Replied", value: "replied" },
        { label: "Following", value: "following" },
        { label: "Converted", value: "converted" },
        { label: "Closed", value: "closed" },
      ],
      defaultValue: "new",
    },
    {
      name: "internalNotes",
      type: "textarea",
      label: "Internal Notes",
      access: {
        create: admin,
        read: admin,
        update: admin,
      },
      admin: {
        description: "Only for internal use, not displayed to customers",
        position: "sidebar",
      },
    },
    {
      name: "scheduledDate",
      type: "date",
      label: "Scheduled Date",
      access: {
        create: admin,
        read: admin,
        update: admin,
      },
      admin: {
        position: "sidebar",
        description: "Date and time of the scheduled action",
      },
      hooks: {
        afterChange: [
          // async ({ doc, req }) => {
          // TODO: make an email notification to admin when the scheduled date is set
          // },
        ],
      },
    },
    {
      name: "basicInfo",
      type: "group",
      label: "Basic Information",
      admin: {
        description: "Customer basic information",
        readOnly: true,
      },
      fields: [
        {
          name: "name",
          type: "text",
          label: "Name",
          required: true,
        },
        {
          name: "email",
          type: "email",
          label: "Email",
          required: true,
        },
        {
          name: "phone",
          type: "text",
          label: "Phone",
          required: true,
        },
        {
          name: "requirements",
          type: "textarea",
          label: "Requirements",
          required: true,
        },
      ],
    },
    {
      name: "companyInfo",
      type: "group",
      label: "Company Information",
      admin: {
        readOnly: true,
      },
      fields: [
        {
          name: "company",
          type: "text",
          label: "Company Name",
        },
        {
          name: "position",
          type: "text",
          label: "Position",
        },
        {
          name: "type",
          type: "select",
          label: "Company Type",
          options: CUSTOMER_TYPES,
        },
        {
          name: "country",
          type: "select",
          label: "Country / Region",
          options: COUNTRIES_REGIONS,
        },
        {
          name: "website",
          type: "text",
          label: "Company Website",
        },
        {
          name: "employees",
          type: "select",
          label: "Number of Employees",
          options: [
            { label: "1-10", value: "1-10" },
            { label: "11-50", value: "11-50" },
            { label: "51-200", value: "51-200" },
            { label: "201-500", value: "201-500" },
            { label: "501-1000", value: "501-1000" },
            { label: "1000+", value: "1000+" },
          ],
        },
      ],
    },
    {
      name: "productInfo",
      type: "group",
      label: "Product Inquiry Information",
      admin: {
        readOnly: true,
      },
      fields: [
        {
          name: "productCategory",
          type: "select",
          label: "Product Category",
          options: getProductCategoryOptions(),
        },
        {
          name: "productName",
          type: "text",
          label: "Product Name",
        },
        createQuantityGroup("qty", "Quantity"),
        {
          name: "frequency",
          type: "select",
          label: "Purchase Frequency",
          options: [
            { label: "One-time Purchase", value: "one-time" },
            { label: "Monthly", value: "monthly" },
            { label: "Quarterly", value: "quarterly" },
            { label: "Yearly", value: "yearly" },
          ],
        },
        {
          name: "destination",
          type: "select",
          label: "Destination Country / Region",
          options: COUNTRIES_REGIONS,
        },
        {
          name: "timeline",
          type: "select",
          label: "Expected Purchase Time",
          options: [
            { label: "Immediate", value: "immediate" },
            { label: "1 Month", value: "1-month" },
            { label: "3 Months", value: "3-months" },
            { label: "6 Months", value: "6-months" },
            { label: "1 Year", value: "1-year" },
          ],
        },
      ],
    },
    {
      name: "contactPreferences",
      type: "group",
      label: "Contact Preferences",
      admin: {
        readOnly: true,
      },
      fields: [
        {
          name: "contactEmail",
          type: "checkbox",
          label: "Email",
        },
        {
          name: "contactPhone",
          type: "checkbox",
          label: "Phone",
        },
        {
          name: "contactWhatsapp",
          type: "checkbox",
          label: "WhatsApp",
        },
      ],
    },
    {
      name: "attachments",
      type: "array",
      label: "Attachments",
      admin: {
        readOnly: true,
        description: "Maximum 3 files",
      },
      maxRows: 3,
      fields: [
        {
          name: "file",
          type: "upload",
          relationTo: "attachments",
        },
      ],
    },
    {
      name: "metadata",
      type: "group",
      label: "Metadata",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
      fields: [
        {
          name: "source",
          type: "select",
          label: "Inquiry Source",
          options: INQUIRY_SOURCES,
        },
        {
          name: "page",
          type: "text",
          label: "Page",
          access: {
            read: admin,
          },
        },
        {
          name: "ipAddress",
          type: "text",
          label: "IP Address",
          access: {
            read: admin,
          },
        },
        {
          name: "userAgent",
          type: "text",
          label: "Browser Information",
          access: {
            read: admin,
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        // Sending email notification to admin when a new inquiry is created
        // Sending a confirmation email to the client with the inquiry details
        if (operation === "create") {
          // TODO

          const { payload } = req;

          // await payload.sendEmail({
          //   // TODO
          // })
        }
      },
    ],
  },
};
