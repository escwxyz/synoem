import { Page } from "@synoem/types";

export const termsData: Omit<Page, "id" | "updatedAt" | "createdAt"> = {
  title: "Terms of Service",
  slug: "terms",
  showLastUpdated: true,
  layout: [
    {
      blockType: "contentBlock",
      columns: [
        {
          size: "twoThirds",
          richText: {
            root: {
              type: "root",
              children: [
                {
                  type: "heading",
                  version: 1,
                  tag: "h2",
                  children: [{ type: "text", text: "1. Acceptance of Terms" }],
                },
                {
                  type: "paragraph",
                  version: 1,
                  children: [
                    {
                      type: "text",
                      text: "By accessing and using our service, you accept and agree to be bound by the terms and provision of this agreement.",
                    },
                  ],
                },
                {
                  type: "heading",
                  version: 1,
                  tag: "h2",
                  children: [{ type: "text", text: "2. Use of Service" }],
                },
                {
                  type: "paragraph",
                  version: 1,
                  children: [
                    {
                      type: "text",
                      text: "You agree to use the service only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use of, the service by any third party.",
                    },
                  ],
                },
                {
                  type: "heading",
                  version: 1,
                  tag: "h2",
                  children: [{ type: "text", text: "3. Privacy" }],
                },
                {
                  type: "paragraph",
                  version: 1,
                  children: [
                    {
                      type: "text",
                      text: "We will not be responsible for any loss or damage caused by your use of our service.",
                    },
                  ],
                },
                {
                  type: "heading",
                  version: 1,
                  tag: "h2",
                  children: [{ type: "text", text: "4. Payment" }],
                },
                {
                  type: "paragraph",
                  version: 1,
                  children: [
                    {
                      type: "text",
                      text: "We will not be responsible for any loss or damage caused by your use of our service.",
                    },
                  ],
                },
                {
                  type: "heading",
                  version: 1,
                  tag: "h2",
                  children: [{ type: "text", text: "5. Cancellation and Refunds" }],
                },
                {
                  type: "paragraph",
                  version: 1,
                  children: [
                    {
                      type: "text",
                      text: "We will not be responsible for any loss or damage caused by your use of our service.",
                    },
                  ],
                },
                {
                  type: "heading",
                  version: 1,
                  tag: "h2",
                  children: [{ type: "text", text: "6. Changes to Terms" }],
                },
                {
                  type: "paragraph",
                  version: 1,
                  children: [
                    {
                      type: "text",
                      text: "We will not be responsible for any loss or damage caused by your use of our service.",
                    },
                  ],
                },
                {
                  type: "heading",
                  version: 1,
                  tag: "h2",
                  children: [{ type: "text", text: "7. Governing Law" }],
                },
                {
                  type: "paragraph",
                  version: 1,
                  children: [
                    {
                      type: "text",
                      text: "We will not be responsible for any loss or damage caused by your use of our service.",
                    },
                  ],
                },
              ],
              direction: "ltr",
              format: "left",
              indent: 0,
              version: 1,
            },
          },
        },
      ],
    },
  ],
};

export const privacyPolicyData: Omit<Page, "id" | "updatedAt" | "createdAt"> = {
  ...termsData,
  title: "Privacy Policy",
  slug: "privacy-policy",
};
