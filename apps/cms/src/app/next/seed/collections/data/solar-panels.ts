import { SolarPanel } from "@synoem/types";

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
        sku: "SKT425-460M10-108D6-BLACK",
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
        sku: "SKT425-460M10-108D6-SILVER",
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
          vmp: 34.49,
          imp: 14.65,
          voc: 41.82,
          isc: 15.47,
        },
        {
          pmax: 510,
          efficiency: 22.95,
          vmp: 34.61,
          imp: 14.74,
          voc: 41.97,
          isc: 15.52,
        },
        {
          pmax: 515,
          efficiency: 23.17,
          vmp: 34.74,
          imp: 14.83,
          voc: 42.12,
          isc: 15.57,
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
        sku: "SKT500-515M10-108D4-BLACK",
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
        sku: "SKT500-515M10-108D4-SILVER",
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
