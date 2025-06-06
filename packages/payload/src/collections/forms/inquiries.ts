import type { CollectionConfig } from "payload";
import { admin } from "../../access";
import { createQuantityGroup } from "../../fields/unit";
import {
  COUNTRIES_REGIONS,
  CUSTOMER_TYPES,
  getProductTypeOptions,
  INQUIRY_EMPLOYEES,
  INQUIRY_FREQUENCIES,
  INQUIRY_TIMELINES,
} from "@synoem/config";
import { verifyTurnstile } from "../../hooks";

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
      name: "token",
      type: "text",
      label: "Token",
      admin: {
        readOnly: true,
        position: "sidebar",
        description: "Cloudflare Turnstile token used to verify the inquiry",
      },
      access: {
        read: admin,
      },
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
      name: "relatedProduct",
      type: "relationship",
      relationTo: ["solar-panels", "pump-controllers"],
      hasMany: false,
      admin: {
        description: "Product inquiry related product",
        position: "sidebar",
        readOnly: true,
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
          name: "message",
          type: "textarea",
          label: "Message",
          required: true,
        },
      ],
    },
    {
      type: "collapsible",
      label: "Company Information",
      admin: {
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
          name: "productType",
          type: "select",
          label: "Product Type",
          options: getProductTypeOptions(),
          admin: {
            readOnly: true,
          },
        },
        {
          name: "productName",
          type: "text",
          label: "Product Model Name",
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
    beforeChange: [verifyTurnstile],
    afterChange: [],
  },
};
