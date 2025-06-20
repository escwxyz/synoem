import { Footer, Header } from "@synoem/types";

export const getHeaderData = (
  imageOne: string,
  imageTwo: string,
  imageThree: string,
): Omit<Header, "id" | "updatedAt" | "createdAt"> => {
  return {
    items: [
      {
        type: "mega",
        text: "Products",
        megaItems: [
          {
            type: "links",
            linksSection: {
              title: "Solar Panels",
              items: [
                {
                  title: "TOPCon",
                  description: "Tunnel Oxide Passivated Contact",
                  link: {
                    type: "relative",
                    relative: "/products/solar-panel/topcon",
                  },
                },
                {
                  title: "HJT",
                  description: "Heterojunction",
                  link: {
                    type: "relative",
                    relative: "/products/solar-panel/hjt",
                  },
                },
              ],
            },
          },
          {
            type: "links",
            linksSection: {
              title: "Inverters",
              items: [
                {
                  title: "Hybrid Inverter",
                  description: "Hybrid Inverter",
                  link: {
                    type: "relative",
                    relative: "/products/inverter/hybrid",
                  },
                },
                {
                  title: "Micro Inverter",
                  description: "Micro Inverter",
                  link: {
                    type: "relative",
                    relative: "/products/inverter/micro",
                  },
                },
              ],
            },
          },
          {
            type: "links",
            linksSection: {
              title: "Battery Storage",
              items: [
                {
                  title: "High Voltage Battery",
                  link: {
                    type: "relative",
                    relative: "/products/battery-storage/high-voltage",
                  },
                },
                {
                  title: "Low Voltage Battery",
                  link: {
                    type: "relative",
                    relative: "/products/battery-storage/low-voltage",
                  },
                },
              ],
            },
          },
          {
            type: "links",
            linksSection: {
              title: "Accessories",
              items: [
                {
                  title: "Solar Mounting System",
                  link: {
                    type: "relative",
                    relative: "/products/accessories/solar-mounting-system",
                  },
                },
                {
                  title: "Solar Cable",
                  link: {
                    type: "relative",
                    relative: "/products/accessories/solar-cable",
                  },
                },
              ],
            },
          },
        ],
      },
      {
        type: "mega",
        text: "Solutions",
        megaItems: [
          {
            type: "banner",
            banner: {
              title: "Residential",
              description: "Residential solutions for your home.",
              media: {
                relationTo: "images",
                value: imageOne,
              },
              link: {
                type: "relative",
                relative: "/solutions/residential",
              },
            },
          },
          {
            type: "banner",
            banner: {
              title: "Commercial",
              description: "Commercial solutions for your business.",
              media: {
                relationTo: "images",
                value: imageTwo,
              },
              link: {
                type: "relative",
                relative: "/solutions#commercial",
              },
            },
          },
        ],
      },
      {
        type: "mega",
        text: "Downloads",
        megaItems: [
          {
            type: "links",
            linksSection: {
              title: "Brochures",
              items: [
                {
                  title: "Solar Panel Brochure",
                  link: {
                    type: "relative",
                    relative: "/downloads/brochures/solar-panel-brochure",
                  },
                },
                {
                  title: "Inverter Brochure",
                  link: {
                    type: "relative",
                    relative: "/downloads/brochures/inverter-brochure",
                  },
                },
                {
                  title: "Battery Storage Brochure",
                  link: {
                    type: "relative",
                    relative: "/downloads/brochures/battery-storage-brochure",
                  },
                },
              ],
            },
          },
          {
            type: "links",
            linksSection: {
              title: "Warranty & Installation Guides",
              items: [
                {
                  title: "Warranty Information",
                  link: {
                    type: "relative",
                    relative: "/downloads/warranty-information",
                  },
                },
                {
                  title: "Installation Guide",
                  link: {
                    type: "relative",
                    relative: "/downloads/installation-guides/installation-guide-1",
                  },
                },
              ],
            },
          },
        ],
      },
      {
        type: "mega",
        text: "Company",
        megaItems: [
          {
            type: "banner",
            banner: {
              title: "About Us",
              description: "Learn more about our company and our commitment to sustainability.",
              media: {
                relationTo: "images",
                value: imageThree,
              },
              link: {
                type: "relative",
                relative: "/company/about-us",
              },
            },
          },
          {
            type: "links",
            linksSection: {
              title: "Careers",
              items: [
                {
                  title: "Job Openings",
                  link: {
                    type: "relative",
                    relative: "/company/careers",
                  },
                },
              ],
            },
          },
          {
            type: "links",
            linksSection: {
              title: "News & Events",
              items: [
                {
                  title: "Latest News",
                  link: {
                    type: "relative",
                    relative: "/company/news-events",
                  },
                },
              ],
            },
          },
          {
            type: "links",
            linksSection: {
              title: "Media & Press",
              items: [
                {
                  title: "Press Releases",
                  link: {
                    type: "relative",
                    relative: "/company/media-press",
                  },
                },
              ],
            },
          },
          {
            type: "links",
            linksSection: {
              title: "Partnerships",
              items: [
                {
                  title: "Partner with Us",
                  link: {
                    type: "relative",
                    relative: "/company/partnerships",
                  },
                },
              ],
            },
          },
        ],
      },
      {
        type: "link",
        text: "Posts",
        link: {
          type: "relative",
          relative: "/posts",
        },
      },
      {
        type: "link",
        text: "Contact",
        link: {
          type: "relative",
          relative: "/contact",
        },
      },
    ],
  };
};

export const footerData: Omit<Footer, "id" | "updatedAt" | "createdAt"> = {
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
              label: "Downloads",
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
              type: "relative",
              label: "Terms of Service",
              relative: "/terms",
            },
          },
          {
            link: {
              type: "relative",
              label: "Privacy Policy",
              relative: "/privacy",
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
