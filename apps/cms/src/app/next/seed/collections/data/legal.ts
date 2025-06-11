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
                      text: "By accessing or using our service, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our service.",
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
                      text: "You agree to use the service in compliance with all applicable laws and regulations, including data protection laws such as the General Data Protection Regulation (GDPR) if you are located in the European Economic Area (EEA).",
                    },
                  ],
                },
                {
                  type: "heading",
                  version: 1,
                  tag: "h2",
                  children: [{ type: "text", text: "3. User Accounts" }],
                },
                {
                  type: "paragraph",
                  version: 1,
                  children: [
                    {
                      type: "text",
                      text: "You may be required to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials.",
                    },
                  ],
                },
                {
                  type: "heading",
                  version: 1,
                  tag: "h2",
                  children: [{ type: "text", text: "4. Limitation of Liability" }],
                },
                {
                  type: "paragraph",
                  version: 1,
                  children: [
                    {
                      type: "text",
                      text: "To the fullest extent permitted by law, we are not liable for any damages arising from your use of the service.",
                    },
                  ],
                },
                {
                  type: "heading",
                  version: 1,
                  tag: "h2",
                  children: [{ type: "text", text: "5. Changes to Terms" }],
                },
                {
                  type: "paragraph",
                  version: 1,
                  children: [
                    {
                      type: "text",
                      text: "We reserve the right to modify these Terms at any time. Changes will be posted on this page. Continued use of the service after changes constitutes acceptance.",
                    },
                  ],
                },
                {
                  type: "heading",
                  version: 1,
                  tag: "h2",
                  children: [{ type: "text", text: "6. Governing Law" }],
                },
                {
                  type: "paragraph",
                  version: 1,
                  children: [
                    {
                      type: "text",
                      text: "These Terms are governed by the laws of your country of residence, unless otherwise required by applicable law.",
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
  title: "Privacy Policy",
  slug: "privacy",
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
                  children: [{ type: "text", text: "1. Introduction" }],
                },
                {
                  type: "paragraph",
                  version: 1,
                  children: [
                    {
                      type: "text",
                      text: "We are committed to protecting your privacy. This policy explains how we collect, use, and protect your personal data.",
                    },
                  ],
                },
                {
                  type: "heading",
                  version: 1,
                  tag: "h2",
                  children: [{ type: "text", text: "2. Data We Collect" }],
                },
                {
                  type: "paragraph",
                  version: 1,
                  children: [
                    {
                      type: "text",
                      text: "We may collect personal data such as your name, email address, and usage data when you use our service.",
                    },
                  ],
                },
                {
                  type: "heading",
                  version: 1,
                  tag: "h2",
                  children: [{ type: "text", text: "3. Use of Data" }],
                },
                {
                  type: "paragraph",
                  version: 1,
                  children: [
                    {
                      type: "text",
                      text: "We use your data to provide and improve our service, communicate with you, and comply with legal obligations.",
                    },
                  ],
                },
                {
                  type: "heading",
                  version: 1,
                  tag: "h2",
                  children: [{ type: "text", text: "4. GDPR Rights" }],
                },
                {
                  type: "paragraph",
                  version: 1,
                  children: [
                    {
                      type: "text",
                      text: "If you are located in the EEA, you have the right to access, rectify, or erase your personal data, restrict or object to its processing, and the right to data portability. You also have the right to lodge a complaint with a supervisory authority.",
                    },
                  ],
                },
                {
                  type: "heading",
                  version: 1,
                  tag: "h2",
                  children: [{ type: "text", text: "5. Data Security" }],
                },
                {
                  type: "paragraph",
                  version: 1,
                  children: [
                    {
                      type: "text",
                      text: "We implement appropriate technical and organizational measures to protect your data.",
                    },
                  ],
                },
                {
                  type: "heading",
                  version: 1,
                  tag: "h2",
                  children: [{ type: "text", text: "6. Data Retention" }],
                },
                {
                  type: "paragraph",
                  version: 1,
                  children: [
                    {
                      type: "text",
                      text: "We retain your data only as long as necessary for the purposes described in this policy or as required by law.",
                    },
                  ],
                },
                {
                  type: "heading",
                  version: 1,
                  tag: "h2",
                  children: [{ type: "text", text: "7. Contact Us" }],
                },
                {
                  type: "paragraph",
                  version: 1,
                  children: [
                    {
                      type: "text",
                      text: "If you have any questions about this policy or your data rights, please contact us at info@synoem.com.",
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
