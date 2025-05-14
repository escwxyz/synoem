import type { CollectionConfig } from "payload";
import { admin } from "../access";
import { createQuantityGroup } from "../fields/unit";
import {
  COUNTRIES_REGIONS,
  CUSTOMER_TYPES,
  getProductTypeOptions,
  INQUIRY_EMPLOYEES,
  INQUIRY_FREQUENCIES,
  INQUIRY_SOURCES,
  INQUIRY_TIMELINES,
} from "@synoem/config";

export const Inquiries: CollectionConfig<"inquiries"> = {
  slug: "inquiries",
  admin: {
    useAsTitle: "name",
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
      type: "collapsible",
      label: "Basic Information",
      admin: {
        description: "Customer basic information",
        readOnly: true,
        initCollapsed: false,
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
      type: "collapsible",
      label: "Company Information",
      admin: {
        description: "Company information",
        readOnly: true,
        initCollapsed: true,
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
          options: INQUIRY_EMPLOYEES,
        },
      ],
    },
    {
      type: "collapsible",
      label: "Product Inquiry Information",
      admin: {
        readOnly: true,
        initCollapsed: true,
      },
      fields: [
        {
          name: "productCategory",
          type: "select",
          label: "Product Category",
          options: getProductTypeOptions(),
        },
        {
          name: "productName",
          type: "text",
          label: "Product Name",
          admin: {
            readOnly: true,
          },
        },
        {
          name: "sku",
          type: "text",
          label: "SKU",
          admin: {
            readOnly: true,
          },
        },
        createQuantityGroup("qty", "Quantity"),
        {
          name: "frequency",
          type: "select",
          label: "Purchase Frequency",
          options: INQUIRY_FREQUENCIES,
          admin: {
            readOnly: true,
          },
        },
        {
          name: "destination",
          type: "select",
          label: "Destination Country / Region",
          options: COUNTRIES_REGIONS,
          admin: {
            readOnly: true,
          },
        },
        {
          name: "timeline",
          type: "select",
          label: "Expected Purchase Time",
          options: INQUIRY_TIMELINES,
          admin: {
            readOnly: true,
          },
        },
      ],
    },
    {
      type: "collapsible",
      label: "Contact Preferences",
      admin: {
        readOnly: true,
        initCollapsed: true,
      },
      fields: [
        {
          name: "contactEmail",
          type: "checkbox",
          label: "Email",
          admin: {
            readOnly: true,
          },
        },
        {
          name: "contactPhone",
          type: "checkbox",
          label: "Phone",
          admin: {
            readOnly: true,
          },
        },
        {
          name: "contactWhatsapp",
          type: "checkbox",
          label: "WhatsApp",
          admin: {
            readOnly: true,
          },
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
      type: "collapsible",
      label: "Metadata",
      admin: {
        position: "sidebar",
        readOnly: true,
        initCollapsed: false,
      },
      fields: [
        {
          name: "source",
          type: "select",
          label: "Inquiry Source",
          options: INQUIRY_SOURCES,
          admin: {
            readOnly: true,
          },
          access: {
            read: admin,
          },
        },
        {
          name: "page",
          type: "text",
          label: "Page",
          admin: {
            readOnly: true,
          },
          access: {
            read: admin,
          },
        },
        {
          name: "ipAddress",
          type: "text",
          label: "IP Address",
          admin: {
            readOnly: true,
          },
          access: {
            read: admin,
          },
        },
        {
          name: "userAgent",
          type: "text",
          label: "Browser Information",
          admin: {
            readOnly: true,
          },
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
