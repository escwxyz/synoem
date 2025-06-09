import type { Locale } from "./locales";

export const PRODUCTS_PER_PAGE = 3;
export const PRODUCTS_CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * Product type ID, singular
 */
export type ProductTypeId = "solar-panel" | "pump-controller";

/**
 * Product type plural slug for routing and collection name
 */
export type ProductTypePluralSlug = "solar-panels" | "pump-controllers";

export type ProductTypeToSlugMap = {
  "solar-panel": "solar-panels";
  "pump-controller": "pump-controllers";
};

export type ProductTypeToCategorySlugMap = {
  "solar-panel": "solar-panel-categories";
  "pump-controller": "pump-controller-categories";
};

export type ColorCode = string;

export type LocalizedText = {
  [locale in Locale]: string;
};

export interface VariantOptionValue {
  /**
   * Actual value, used for internal system and SKU generation
   */
  value: string;
  /**
   * Display name, can be simple text or localized text
   */
  label: LocalizedText;
  /**
   * Color code, only used for color type options
   */
  color?: ColorCode;
}

export type VariantOptionType = "text" | "color";

export const getVariantOptionTypes = () => {
  return ["text", "color"];
};

export interface VariantOptionConfig {
  name: string;

  label: LocalizedText;

  type: VariantOptionType;

  values: VariantOptionValue[];
}

export interface ProductCategoryValue {
  label: string; // TODO: localized text
  value: string;
  children?: ProductCategoryValue[]; // TODO nested categories in the future
}

export interface ProductTypeConfig {
  id: ProductTypeId;
  slug: ProductTypePluralSlug;
  label: string;
  variantOptions: VariantOptionConfig[];
  categories: ProductCategoryValue[];
}

export const PRODUCT_TYPES: Record<ProductTypeId, ProductTypeConfig> = {
  "solar-panel": {
    id: "solar-panel",
    slug: "solar-panels",
    label: "Solar Panel",
    categories: [
      {
        label: "TOPCon",
        value: "topcon",
      },
      {
        label: "PERC",
        value: "perc",
      },
      {
        label: "HJT",
        value: "hjt",
      },
    ],
    variantOptions: [
      {
        name: "frameColor",
        label: {
          en: "Frame Color",
          de: "Rahmenfarbe",
        },
        type: "color",
        values: [
          {
            value: "black",
            label: {
              en: "Black",
              de: "Schwarz",
            },
            color: "#000000",
          },
          {
            value: "silver",
            label: {
              en: "Silver",
              de: "Silber",
            },
            color: "#C0C0C0",
          },
        ],
      },
    ],
  },
  "pump-controller": {
    id: "pump-controller",
    slug: "pump-controllers",
    label: "Pump Controller",
    categories: [
      {
        label: "Smart",
        value: "smart",
      },
      {
        label: "Standard",
        value: "standard",
      },
    ],
    variantOptions: [
      {
        name: "color",
        label: {
          en: "Color",
          de: "Farbe",
        },
        type: "color",
        values: [
          {
            value: "black",
            label: {
              en: "Black",
              de: "Schwarz",
            },
            color: "#000000",
          },
        ],
      },
    ],
  },
};

export const isValidProductType = (slug: string): slug is ProductTypeId => {
  return Object.values(PRODUCT_TYPES).some((type) => type.id === slug);
};

export const isValidProductCategory = (category: string) => {
  return Object.values(PRODUCT_TYPES).some((type) =>
    type.categories.some((cat) => cat.value === category),
  );
};

export const getProductTypeOptions = () => {
  return Object.entries(PRODUCT_TYPES).map(([typeId, config]) => ({
    label: config.label,
    value: typeId,
  }));
};

export const getProductCategoryOptions = (productTypeId: ProductTypeId) => {
  return PRODUCT_TYPES[productTypeId].categories.map((category) => ({
    label: category.label,
    value: category.value,
  }));
};

export function getProductVariantOptions(productTypeId: ProductTypeId): VariantOptionConfig[] {
  return PRODUCT_TYPES[productTypeId]?.variantOptions || [];
}

export function getProductTypeIdByCollection(collection: string): ProductTypeId | null {
  for (const [typeId, config] of Object.entries(PRODUCT_TYPES)) {
    if (config.slug === collection) {
      return typeId as ProductTypeId;
    }
  }
  return null;
}

export interface VariantCombination {
  [optionName: string]: VariantOptionValue;
}

export function getAllVariantCombinations(productTypeId: ProductTypeId): VariantCombination[] {
  const productConfig = PRODUCT_TYPES[productTypeId];
  if (!productConfig) return [];

  const { variantOptions } = productConfig;
  if (!variantOptions || variantOptions.length === 0) return [];

  const generateCombinations = (
    optionIndex: number,
    currentCombination: VariantCombination,
  ): VariantCombination[] => {
    if (optionIndex >= variantOptions.length) {
      return [currentCombination];
    }

    const currentOption = variantOptions[optionIndex];
    if (!currentOption) return [];
    const result: VariantCombination[] = [];

    for (const value of currentOption.values) {
      const newCombination = {
        ...currentCombination,
        [currentOption.name]: value,
      };

      result.push(...generateCombinations(optionIndex + 1, newCombination));
    }

    return result;
  };

  return generateCombinations(0, {});
}

export function getLocalizedString(text: LocalizedText, locale: Locale): string {
  if (text[locale]) {
    return text[locale];
  }

  return text.en;
}
