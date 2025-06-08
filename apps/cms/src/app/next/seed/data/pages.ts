import type { Page } from "@synoem/types";

export const pages: Omit<Page, "createdAt" | "id" | "sizes" | "updatedAt">[] = [
  {
    title: "About Us",
    slug: "about-us",
    layout: [
      {
        blockType: "featuresBlock",
        title: "Some Facts",
        description: "Learn about our company through these key facts.",
        features: [
          {
            blockType: "featureBlock",
            type: "number",
            number: 5,
            icon: "lucide:factory",
            description: "GW of Solar Panels Produced Annually",
            withPlus: true,
          },
          {
            blockType: "featureBlock",
            type: "number",
            number: 1,
            icon: "lucide:zap",
            description: "GWH of Battery Storage Produced Annually",
            delay: 0.5,
            withPlus: true,
          },
          {
            blockType: "featureBlock",
            type: "number",
            number: 13,
            icon: "lucide:calendar",
            description: "Years of Experience",
            delay: 1,
          },
          {
            blockType: "featureBlock",
            type: "number",
            number: 850,
            icon: "lucide:users",
            description: "Employees Worldwide",
            delay: 1.5,
            withPlus: true,
          },
        ],
      },
      {
        blockType: "timelineBlock",
        title: "Our History",
        description: "Learn about our journey and our commitment to sustainability.",
        items: [
          {
            title: "Company Founded",
            date: new Date(2012, 1, 1).toISOString(),
            icon: "lucide:lightbulb",
            content: {
              root: {
                type: "root",
                children: [
                  {
                    type: "paragraph",
                    version: 1,
                    children: [
                      {
                        type: "text",
                        text: "Synoem was founded in 2012 by a group of dedicated professionals who are passionate about renewable energy and solar panel production.",
                      },
                    ],
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                version: 1,
              },
            },
          },
          {
            title: "3GW PV Module Production Capacity",
            date: new Date(2014, 1, 1).toISOString(),
            icon: "lucide:factory",
            content: {
              root: {
                type: "root",
                children: [
                  {
                    type: "paragraph",
                    version: 1,
                    children: [
                      {
                        type: "text",
                        text: "We expanded our production capacity to 3GW in 2014, enabling us to meet the growing demand for solar panels.",
                      },
                    ],
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                version: 1,
              },
            },
          },
          {
            title: "BIPV Production Center Launched",
            date: new Date(2019, 1, 1).toISOString(),
            icon: "lucide:house",
            content: {
              root: {
                type: "root",
                children: [
                  {
                    type: "paragraph",
                    version: 1,
                    children: [
                      {
                        type: "text",
                        text: "We launched our fist BIPV production center.",
                      },
                    ],
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                version: 1,
              },
            },
          },
          {
            title: "EU Warehouse Established",
            date: new Date(2020, 1, 1).toISOString(),
            icon: "lucide:warehouse",
            content: {
              root: {
                type: "root",
                children: [
                  {
                    type: "paragraph",
                    version: 1,
                    children: [
                      {
                        type: "text",
                        text: "The EU warehouse was established to serve our European customers.",
                      },
                    ],
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                version: 1,
              },
            },
          },
          {
            title: "BESS Production Center Established",
            date: new Date(2021, 1, 1).toISOString(),
            icon: "lucide:battery-charging",
            content: {
              root: {
                type: "root",
                children: [
                  {
                    type: "paragraph",
                    version: 1,
                    children: [
                      {
                        type: "text",
                        text: "We also won the China's Top 10 Distributed PV Brand Award.",
                      },
                    ],
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                version: 1,
              },
            },
          },
          {
            title: "Spain Factory Established",
            date: new Date(2022, 1, 1).toISOString(),
            icon: "lucide:badge-euro",
            content: {
              root: {
                type: "root",
                children: [
                  {
                    type: "paragraph",
                    version: 1,
                    children: [
                      {
                        type: "text",
                        text: "We established our first factory in Spain to serve our European customers.",
                      },
                    ],
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                version: 1,
              },
            },
          },
        ],
      },
    ],
  },
  {
    title: "Privacy Policy",
    slug: "privacy-policy",
    showLastUpdated: true,
    layout: [
      {
        blockType: "contentBlock",
      },
    ],
  },
];
