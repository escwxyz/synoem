export const PRODUCTS_PER_PAGE = 4;

export const PRODUCTS_CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export type ProductCategoryId = "solar-panel" | "pump-controller";

export type ProductCategoryPlural = "solar-panels" | "pump-controllers";

export interface ProductCategory {
  id: ProductCategoryId;
  name: string;
  slug: string;
  kebabCase: string;
  camelCase: string;
  snakeCase: string;
  pascalCase: string;
  pluralSlug: ProductCategoryPlural;
  icon?: string;
}

export const PRODUCT_CATEGORIES = {
  solarPanel: {
    id: "solar-panel" as const,
    name: "Solar Panel",
    slug: "solar-panel",
    kebabCase: "solar-panel",
    camelCase: "solarPanel",
    snakeCase: "solar_panel",
    pascalCase: "SolarPanel",
    pluralSlug: "solar-panels" as const,
    icon: "Sun",
  },
  pumpController: {
    id: "pump-controller" as const,
    name: "Pump Controller",
    slug: "pump-controller",
    kebabCase: "pump-controller",
    camelCase: "pumpController",
    snakeCase: "pump_controller",
    pascalCase: "PumpController",
    pluralSlug: "pump-controllers" as const,
    icon: "Zap",
  },
} as const;

export type ProductCategoryKey = keyof typeof PRODUCT_CATEGORIES;

export type ProductCategoryPluralSlug =
  (typeof PRODUCT_CATEGORIES)[ProductCategoryKey]["pluralSlug"];

export type ProductCategoryIdType = (typeof PRODUCT_CATEGORIES)[ProductCategoryKey]["id"];

export const getCategoryById = (id: ProductCategoryId): ProductCategory | undefined =>
  Object.values(PRODUCT_CATEGORIES).find((cat) => cat.id === id);

export const getCategoryByPluralSlug = (
  pluralSlug: ProductCategoryPlural,
): ProductCategory | undefined =>
  Object.values(PRODUCT_CATEGORIES).find((cat) => cat.pluralSlug === pluralSlug);

export const PLURAL_TO_SINGULAR: Record<ProductCategoryPlural, ProductCategoryId> = {
  "solar-panels": "solar-panel",
  "pump-controllers": "pump-controller",
};

export const SINGULAR_TO_PLURAL: Record<ProductCategoryId, ProductCategoryPlural> = {
  "solar-panel": "solar-panels",
  "pump-controller": "pump-controllers",
};

export const ALL_PRODUCT_CATEGORIES = Object.values(PRODUCT_CATEGORIES);

export const getProductCategoryOptions = () => {
  return Object.values(PRODUCT_CATEGORIES).map((category) => ({
    label: category.name,
    value: category.id,
  }));
};

const PUMP_CONTROLLER_VARIANTS = {
  color: {
    label: "Color",
    options: [
      { label: "Purple", value: "purple" },
      { label: "Blue", value: "blue" },
      { label: "Green", value: "green" },
      { label: "Yellow", value: "yellow" },
      { label: "Orange", value: "orange" },
    ],
  },
};

const SOLAR_PANEL_VARIANTS = {
  panelColor: {
    label: "Panel Color",
    options: [
      { label: "All Black", value: "all-black" },
      { label: "Full Transparent", value: "transparent" },
      { label: "Full Black", value: "full-black" },
    ],
  },
  frameColor: {
    label: "Frame Color",
    options: [
      { label: "Black", value: "black" },
      { label: "Silver", value: "silver" },
    ],
  },
};

export const PRODUCT_VARIANTS = {
  pumpController: PUMP_CONTROLLER_VARIANTS,
  solarPanel: SOLAR_PANEL_VARIANTS,
} as const;
