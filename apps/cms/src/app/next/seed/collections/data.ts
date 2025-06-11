import { RequiredDataFromCollectionSlug } from "payload";

import type { Page, SolarPanel } from "@synoem/types";

interface GetSolarPanelDataProps {
  industryId: string;
  productCategoryId: string;
  heroImageId: string;
  coverImageId: string;
  variants: {
    gallery: string[];
  };
}

export const getTOPConSolarPanelData = (
  props: GetSolarPanelDataProps,
): Omit<SolarPanel, "createdAt" | "id" | "updatedAt"> => {
  return {
    title: "N-Type Bifacial Full Black Solar Panel",
    slug: "n-type-bifacial-full-black-solar-panel",
    industry: props.industryId,
    productCategory: props.productCategoryId,
    excerpt: "A high-efficiency solar panel designed for maximum energy output.",
    heroImage: props.heroImageId,
    coverImage: props.coverImageId,
    modelName: "SKT425~460M10-108D6",
    description: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            version: 1,
            children: [
              {
                type: "text",
                text: "This solar panel is built for durability and high performance. It is designed to withstand extreme weather conditions and has a long product warranty.",
              },
            ],
          },
        ],
        direction: "ltr",
        version: 1,
        format: "left",
        indent: 0,
      },
    },
    features: [
      {
        blockType: "featureBlock",
        type: "number",
        number: 23,
        icon: "lucide:trending-up",
        description: "High efficiency",
        withPlus: true,
        opacity: 80,
      },
      {
        blockType: "featureBlock",
        type: "text",
        title: "Double Glass",
        description: "Withstands extreme weather conditions",
        icon: "lucide:cloud-lightning",
        opacity: 80,
      },
      {
        blockType: "featureBlock",
        type: "number",
        number: 30,
        icon: "lucide:shield-check",
        description: "Years Product Warranty",
        opacity: 80,
      },
      {
        blockType: "featureBlock",
        type: "text",
        title: "Fire Class A",
        description: "Fireproof",
        icon: "lucide:fire-extinguisher",
        opacity: 80,
      },
    ],
    dimensions: {
      h: 1762,
      w: 1134,
      d: 30,
      unit: "mm",
    },
    weight: {
      value: 21.5,
      unit: "kg",
    },
    cellDesc: "N-Type 16BB 182×94mm (2×54pcs)",
    cellLength: 182,
    cellWidth: 94,
    cellCount: 108,
    glassType: "bifacial",
    bifaciality: 70,
    glassDesc: "AR Coated 1.6+1.6 mm tempered glass",
    frameDesc: "Anodized aluminum alloy",
    junctionDesc: "IP68, 3 diodes",
    connDesc: "MC4 Compatible",
    connLength: 1200,
    temp: {
      min: -40,
      max: 85,
    },
    snow: 5400,
    wind: 2400,
    hail: 25,
    tolerance: {
      min: 0,
      max: 5,
    },
    power: {
      min: 425,
      max: 460,
      step: 5,
      points: [
        {
          pmax: 425,
          efficiency: 21.27,
          vmp: 31.94,
          imp: 13.31,
          voc: 38.3,
          isc: 14.06,
        },
        {
          pmax: 430,
          efficiency: 21.5,
          vmp: 32.12,
          imp: 13.39,
          voc: 38.5,
          isc: 14.14,
        },
        {
          pmax: 435,
          efficiency: 21.8,
          vmp: 32.29,
          imp: 13.47,
          voc: 38.7,
          isc: 14.23,
        },
        {
          pmax: 440,
          efficiency: 22.0,
          vmp: 32.47,
          imp: 13.55,
          voc: 38.9,
          isc: 14.31,
        },
        {
          pmax: 445,
          efficiency: 22.3,
          vmp: 32.65,
          imp: 13.63,
          voc: 39.1,
          isc: 14.4,
        },
        {
          pmax: 450,
          efficiency: 22.5,
          vmp: 32.82,
          imp: 13.71,
          voc: 39.3,
          isc: 14.48,
        },
        {
          pmax: 455,
          efficiency: 22.8,
          vmp: 33.0,
          imp: 13.79,
          voc: 39.5,
          isc: 14.56,
        },
        {
          pmax: 460,
          efficiency: 23.0,
          vmp: 33.17,
          imp: 13.87,
          voc: 39.7,
          isc: 14.64,
        },
      ],
    },
    tempCo: {
      pmax: -0.34,
      isc: 0.05,
      voc: -0.28,
      noct: 45,
    },
    ratings: {
      fuse: 30,
      voltage: "1500Vdc (IEC / UL)",
      fire: "Class A",
    },
    variants: [
      {
        sku: "SKT425M10-108D6-BLACK",
        gallery: [props.variants.gallery[0] ?? "", props.variants.gallery[1] ?? ""],
        options: [
          {
            label: "Frame Color",
            value: "#000000",
            type: "color",
          },
        ],
      },
      {
        sku: "SKT425M10-108D6-SILVER",
        gallery: [props.variants.gallery[2] ?? "", props.variants.gallery[3] ?? ""],
        options: [
          {
            label: "Frame Color",
            value: "#C0C0C0",
            type: "color",
          },
        ],
      },
    ],
  };
};

export const getHJTSolarPanelData = (
  props: GetSolarPanelDataProps,
): Omit<SolarPanel, "createdAt" | "id" | "updatedAt"> => {
  return {
    title: "All Black HJT Bifacial Solar Panel",
    slug: "all-black-hjt-bifacial-solar-panel",
    industry: props.industryId,
    productCategory: props.productCategoryId,
    excerpt: "A high-efficiency solar panel with output power ranging from 500 to 515Wp.",
    heroImage: props.heroImageId,
    coverImage: props.coverImageId,
    modelName: "SKT500~515M10-108D4",
    description: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            version: 1,
            children: [
              {
                type: "text",
                text: "This solar panel is built for durability and high performance. It is designed to withstand extreme weather conditions and has a long product warranty. This panel is extremely popular across our France market.",
              },
            ],
          },
        ],
        direction: "ltr",
        version: 1,
        format: "left",
        indent: 0,
      },
    },
    features: [
      {
        blockType: "featureBlock",
        type: "number",
        number: 23.17,
        icon: "lucide:trending-up",
        description: "High efficiency",
        withPlus: true,
        opacity: 80,
      },
      {
        blockType: "featureBlock",
        type: "text",
        title: "Double Glass",
        description: "Withstands extreme weather conditions",
        icon: "lucide:cloud-lightning",
        opacity: 80,
      },
      {
        blockType: "featureBlock",
        type: "number",
        number: 30,
        icon: "lucide:shield-check",
        description: "Years Product Warranty",
        opacity: 80,
      },
      {
        blockType: "featureBlock",
        type: "text",
        title: "Fire Class A",
        description: "Fireproof",
        icon: "lucide:fire-extinguisher",
        opacity: 80,
      },
    ],

    dimensions: {
      h: 1961,
      w: 1134,
      d: 30,
      unit: "mm",
    },
    weight: {
      value: 23.9,
      unit: "kg",
    },
    cellDesc: "HJT 18BB 182×105mm (2×54pcs)",
    cellLength: 182,
    cellWidth: 105,
    cellCount: 104,
    glassType: "bifacial",
    bifaciality: 70,
    glassDesc: "AR Coated 1.6+1.6 mm tempered glass",
    frameDesc: "Anodized aluminum alloy",
    junctionDesc: "IP68, 3 diodes",
    connDesc: "MC4 Compatible",
    connLength: 1200,
    temp: {
      min: -40,
      max: 85,
    },
    snow: 5400,
    wind: 2400,
    hail: 25,
    tolerance: {
      min: 0,
      max: 5,
    },
    power: {
      min: 500,
      max: 515,
      step: 5,
      points: [
        {
          pmax: 500,
          efficiency: 22.5,
          vmp: 34.36,
          imp: 14.56,
          voc: 41.67,
          isc: 15.42,
        },
        {
          pmax: 505,
          efficiency: 22.72,
          vmp: 34.28,
          imp: 14.74,
          voc: 38.5,
          isc: 14.14,
        },
        {
          pmax: 510,
          efficiency: 22.95,
          vmp: 34.46,
          imp: 14.82,
          voc: 38.7,
          isc: 14.23,
        },
        {
          pmax: 515,
          efficiency: 23.17,
          vmp: 34.64,
          imp: 14.9,
          voc: 38.9,
          isc: 14.31,
        },
      ],
    },
    tempCo: {
      pmax: -0.26,
      isc: 0.04,
      voc: -0.24,
      noct: 44,
    },
    ratings: {
      fuse: 30,
      voltage: "1500Vdc (IEC / UL)",
      fire: "Class A",
    },
    variants: [
      {
        sku: "SKT500M10-108D4-BLACK",
        gallery: [props.variants.gallery[0] ?? "", props.variants.gallery[1] ?? ""],
        options: [
          {
            label: "Frame Color",
            value: "#000000",
            type: "color",
          },
        ],
      },
      {
        sku: "SKT500M10-108D4-SILVER",
        gallery: [props.variants.gallery[2] ?? "", props.variants.gallery[3] ?? ""],
        options: [
          {
            label: "Frame Color",
            value: "#C0C0C0",
            type: "color",
          },
        ],
      },
    ],
  };
};

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

export const faqs: RequiredDataFromCollectionSlug<"faqs">[] = [
  {
    type: "general",
    question: "How long does it take to receive a response after making an inquiry?",
    answer: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            type: "paragraph",
            format: "",
            indent: 0,
            version: 1,
            children: [
              {
                mode: "normal",
                text: "We will respond to your inquiry within 24 hours.",
                type: "text",
                style: "",
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
          },
        ],
        direction: "ltr",
      },
    },
  },
  {
    type: "general",
    question: "What payment methods do you accept?",
    answer: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            type: "paragraph",
            format: "",
            indent: 0,
            version: 1,
            children: [
              {
                mode: "normal",
                text: "Currently we accept bank transfers.",
                type: "text",
                style: "",
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
          },
        ],
        direction: "ltr",
      },
    },
  },
  {
    type: "general",
    question: "What are your payment terms?",
    answer: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            type: "paragraph",
            format: "",
            indent: 0,
            version: 1,
            children: [
              {
                mode: "normal",
                text: "Generally we accept 30% deposit and 70% balance before shipment.",
                type: "text",
                style: "",
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
          },
        ],
        direction: "ltr",
      },
    },
  },
  {
    type: "general",
    question: "How long is the lead time?",
    answer: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            type: "paragraph",
            format: "",
            indent: 0,
            version: 1,
            children: [
              {
                mode: "normal",
                text: "Generally for made-to-order products, it takes 2-4 weeks for the production and 1-2 weeks for the shipping.",
                type: "text",
                style: "",
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
          },
        ],
        direction: "ltr",
      },
    },
  },
  {
    type: "solar-panel",
    question: "What is the difference between TOPCon and HJT solar panels?",
    answer: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            type: "paragraph",
            format: "",
            indent: 0,
            version: 1,
            children: [
              {
                mode: "normal",
                text: "TOPCon and HJT are two different types of solar cell technologies. TOPCon uses a tunnel oxide passivated contact, while HJT uses a heterojunction structure. TOPCon is more mainstream and comes at lower cost, but HJT has better bifaciality and higher efficiency.",
                type: "text",
                style: "",
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
          },
        ],
        direction: "ltr",
      },
    },
  },
  {
    type: "solar-panel",
    question: "How long do solar panels typically last?",
    answer: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            type: "paragraph",
            format: "",
            indent: 0,
            version: 1,
            children: [
              {
                mode: "normal",
                text: "Most solar panels have a lifespan of 25 to 30 years, but they can continue to generate electricity at reduced efficiency beyond that period.",
                type: "text",
                style: "",
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
          },
        ],
        direction: "ltr",
      },
    },
  },
  {
    type: "solar-panel",
    question: "What maintenance do solar panels require?",
    answer: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            type: "paragraph",
            format: "",
            indent: 0,
            version: 1,
            children: [
              {
                mode: "normal",
                text: "Solar panels require very little maintenance. It is recommended to keep them clean and free of debris to ensure optimal performance.",
                type: "text",
                style: "",
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
          },
        ],
        direction: "ltr",
      },
    },
  },
  {
    type: "solar-panel",
    question: "What is your MOQ for solar panels?",
    answer: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            type: "paragraph",
            format: "",
            indent: 0,
            version: 1,
            children: [
              {
                mode: "normal",
                text: "Generally we accept 2 pallets for EU stock products and 1 container for made-to-order products. You can check the details in the product page, or contact us for more information.",
                type: "text",
                style: "",
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
          },
        ],
        direction: "ltr",
      },
    },
  },
];

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
  title: "Privacy Policy",
  slug: "privacy-policy",
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
                  tag: "h2",
                  version: 1,
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
