import { PRODUCT_TYPES } from "@synoem/config";

export const isSolarPanel = (slug: string) => {
  return slug === PRODUCT_TYPES["solar-panel"].slug;
};

export const isPumpController = (slug: string) => {
  return slug === PRODUCT_TYPES["pump-controller"].slug;
};
