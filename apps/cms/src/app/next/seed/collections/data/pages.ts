import { Page } from "@synoem/types";

interface GetHomeDataProps {
  logos: {
    ce: string;
    mcs: string;
    ul: string;
  };
  heros: string[];
  faqs: string[];
}

export const getHomeData = ({
  logos,
  heros,
  faqs,
}: GetHomeDataProps): Omit<Page, "createdAt" | "id" | "sizes" | "updatedAt"> => ({
  title: "Home",
  slug: "home",
  layout: [
    {
      blockType: "heroBlock",
      title: "Synergize for a better future",
      subtitle: "Your trusted provider in sustainable energy solutions",
      description: "Get a quote today or explore our products",
      rows: [
        {
          contents: [
            {
              title: "Solar Panels",
              description: "Residential, Commercial and Industrial, BIPV and Agricultural PV",
              image: heros[0] || "",
              link: {
                type: "relative",
                relative: "/products/solar-panel",
              },
            },
            {
              title: "Inverters",
              description: "3-phase and single-phase inverters",
              image: heros[1] || "",
              link: {
                type: "relative",
                relative: "/products/inverter",
              },
            },
            {
              title: "Batteries",
              description: "LFP and NMC batteries",
              image: heros[2] || "",
              link: {
                type: "relative",
                relative: "/products/battery",
              },
            },
          ],
        },
        {
          contents: [
            {
              title: "Solar Farm Projects",
              description: "Large-scale solar farms",
              image: heros[3] || "",
              link: {
                type: "relative",
                relative: "/projects",
              },
            },
            {
              title: "BIPV Projects",
              description: "Innovative BIPV solutions",
              image: heros[4] || "",
              link: {
                type: "relative",
                relative: "/projects",
              },
            },
            {
              title: "Agricultural PV",
              description: "Sustainable energy for agriculture",
              image: heros[5] || "",
              link: {
                type: "relative",
                relative: "/projects",
              },
            },
          ],
        },
      ],
      quoteButton: true,
      ctaSecondary: {
        type: "relative",
        relative: "/products",
        label: "Explore Products",
      },
    },
    {
      blockType: "carbonCalculatorBlock",
      title: "Learn How Much You Can Contribute",
      description:
        "Discover how much you can contribute to the environment with our solar energy calculator.",
      subtitle: "Calculate Your Carbon Footprint",
      subDescription:
        "Enter your energy usage to see how much you can reduce your carbon emissions.",
      projectCapacity: 1,
      treeEmission: 22,
      treeLifetime: 25,
      carEmission: 4.6,
      presets: [
        {
          name: "Global Average",
          value: 0.5,
        },
        {
          name: "China",
          value: 0.65,
        },
        {
          name: "India",
          value: 0.82,
        },
        {
          name: "USA",
          value: 0.4,
        },
        {
          name: "EU Average",
          value: 0.3,
        },
        {
          name: "Australia",
          value: 0.7,
        },
      ],
    },
    {
      blockType: "inquiryBlock",
      title: "Ready to Transform Your Energy Future?",
      description:
        "Join thousands of business entities who have revolutionized their energy consumption with our innovative solar solutions. Our team of experts is ready to design a custom solution for your specific needs.",
      ctaPrimary: {
        type: "relative",
        relative: "/contact",
        label: "Get a Quote",
      },
      ctaSecondary: {
        type: "relative",
        relative: "/products",
        label: "Learn More",
      },
    },
    {
      blockType: "faqBlock",
      title: "Frequently Asked Questions",
      description: "Find answers to common questions about our products and services.",
      type: "general",
      style: "accordion",
      content: [faqs[0] || "", faqs[1] || "", faqs[2] || ""],
    },
    {
      blockType: "logoCloudBlock",
      title: "Certified by",
      logos: [logos.ce, logos.mcs, logos.ul],
    },
  ],
});

export const getAboutUsData = (
  companyPageId: string,
): Omit<Page, "createdAt" | "id" | "sizes" | "updatedAt"> => ({
  title: "About Us",
  slug: "about-us",
  parent: companyPageId,
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
                      text: "We launched our first BIPV production center.",
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
});
