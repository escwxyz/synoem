import type { Footer } from "@synoem/types";

export const getFooterData = ({
  termsPageId,
  privacyPageId,
}: { termsPageId: string; privacyPageId: string }): Omit<
  Footer,
  "id" | "updatedAt" | "createdAt"
> => {
  return {
    columns: [
      {
        blockType: "linkGroup",
        linkGroup: {
          title: "Products",
          links: [
            {
              link: {
                type: "relative",
                label: "Solar Panels",
                relative: "/products/solar-panel",
              },
            },
            {
              link: {
                type: "relative",
                label: "Inverters",
                relative: "/products/inverter",
              },
            },
            {
              link: {
                type: "relative",
                label: "Battery Storage",
                relative: "/products/battery-storage",
              },
            },
            {
              link: {
                type: "relative",
                label: "Accessories",
                relative: "/products/accessories",
              },
            },
          ],
        },
      },

      {
        blockType: "linkGroup",
        linkGroup: {
          title: "Resources",
          links: [
            {
              link: {
                type: "relative",
                label: "Posts",
                relative: "/posts",
              },
            },
            {
              link: {
                type: "relative",
                label: "Case Studies",
                relative: "/case-studies",
              },
            },
            {
              link: {
                type: "relative",
                label: "Downlaods",
                relative: "/downloads",
              },
            },
            {
              link: {
                type: "relative",
                label: "FAQs",
                relative: "/faqs",
              },
            },
          ],
        },
      },
      {
        blockType: "linkGroup",
        linkGroup: {
          title: "Company",
          links: [
            {
              link: {
                type: "relative",
                label: "About Us",
                relative: "/company/about-us",
              },
            },
            {
              link: {
                type: "relative",
                label: "News & Events",
                relative: "/company/news",
              },
            },
            {
              link: {
                type: "relative",
                label: "Careers",
                relative: "/company/careers",
              },
            },
            {
              link: {
                type: "internal",
                internal: {
                  relationTo: "pages",
                  value: termsPageId,
                },
                label: "Terms of Service",
              },
            },
            {
              link: {
                type: "internal",
                internal: {
                  relationTo: "pages",
                  value: privacyPageId,
                },
                label: "Privacy Policy",
              },
            },
          ],
        },
      },
      {
        blockType: "contactInfo",
      },
    ],
    links: [],
    copyright: "All rights reserved",
  };
};
