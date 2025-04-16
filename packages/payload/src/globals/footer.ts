import type { GlobalConfig } from "payload";
import { link } from "../fields/link";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
  },
  admin: {
    group: "Layout",
  },
  fields: [
    {
      name: "companySection",
      type: "group",
      label: "Company Section",
      admin: {
        description: "Company Section for the footer",
      },
      fields: [
        {
          name: "logo",
          type: "select",
          options: [
            {
              label: "With Slogan",
              value: "withSlogan",
            },
            {
              label: "Without Slogan",
              value: "withoutSlogan",
            },
          ],
          defaultValue: "withSlogan",
        },
        {
          name: "useCompanyDescription",
          type: "radio",
          options: [
            {
              label: "Yes",
              value: "yes",
            },
            {
              label: "No",
              value: "no",
            },
          ],
          defaultValue: "yes",
        },
        {
          name: "companyDescription",
          type: "select",
          label: "Company Description",
          options: [
            {
              label: "Short Description",
              value: "shortDescription",
            },
            {
              label: "Long Description",
              value: "longDescription",
            },
          ],
          admin: {
            condition: (siblingData) =>
              siblingData.useCompanyDescription === "yes",
          },
          defaultValue: "shortDescription",
        },
        {
          name: "showSocialLinks",
          type: "checkbox",
          label: "Show Social Links",
          defaultValue: true,
          admin: {
            description: "Enable social links in the footer",
          },
        },
        {
          name: "showNewsletter",
          type: "checkbox",
          label: "Show Newsletter",
          defaultValue: true,
          admin: {
            description: "Enable newsletter in the footer",
          },
        },
      ],
    },

    {
      name: "columns",
      type: "array",
      label: "Columns",
      admin: {
        description: "Add multiple columns to organize footer content",
        components: {
          //   RowLabel: "@/payload/components/footer-row-label#FooterColumnLabel",
        },
      },
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: "size",
          type: "select",
          label: "Column Size",
          defaultValue: "medium",
          options: [
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
          ],
        },
        {
          name: "blockType",
          type: "radio",
          label: "Column Type",
          defaultValue: "linkGroup",
          options: [
            {
              label: "Link Group",
              value: "linkGroup",
            },
            {
              label: "Custom Content",
              value: "content",
            },
            {
              label: "Contact Info",
              value: "contactInfo",
            },
          ],
          admin: {
            layout: "horizontal",
          },
        },
        {
          name: "linkGroup",
          type: "group",
          label: "Link Group",
          admin: {
            condition: (_data, siblingData) =>
              siblingData.blockType === "linkGroup",
          },
          fields: [
            {
              name: "title",
              type: "text",
              label: "Title",
              required: true,
              localized: true,
            },
            {
              name: "links",
              type: "array",
              label: "Links",
              fields: [
                link({
                  appearances: false,
                }),
              ],
              admin: {
                components: {
                  //   RowLabel: "@/payload/components/footer-row-label#FooterLinkGroupLabel",
                },
              },
            },
          ],
        },
        {
          name: "content",
          type: "group",
          label: "Custom Content",
          admin: {
            condition: (_data, siblingData) =>
              siblingData.blockType === "content",
          },
          fields: [
            {
              name: "title",
              type: "text",
              label: "Title",
              localized: true,
            },
            {
              name: "richText",
              type: "richText",
              label: "Content",
              localized: true,
            },
          ],
        },
        {
          name: "contactInfo",
          type: "ui",
          label: "Contact Info",
          admin: {
            condition: (_data, siblingData) =>
              siblingData.blockType === "contactInfo",
            components: {
              //   Field: "@/payload/components/contact-info#ContactInfoPreview",
            },
          },
        },
      ],
    },
    {
      name: "bottomBar",
      type: "group",
      label: "Bottom Bar",
      fields: [
        {
          name: "copyright",
          type: "text",
          label: "Copyright Text",
          localized: true,
        },
        {
          name: "links",
          type: "array",
          label: "Bottom Links",
          admin: {
            initCollapsed: true,
            components: {
              //   RowLabel: "@/payload/components/footer-row-label#FooterBottomLinkRowLabel",
            },
          },
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 6,
        },
      ],
    },
  ],
  hooks: {
    // afterChange: [revalidateFooter],
  },
};
