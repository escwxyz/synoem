import type { SolarPanel, PumpController } from "@synoem/payload/payload-types";
import type { Product } from "~/types/product";

export const isSolarPanel = (product: Product): product is SolarPanel => {
  return Object.keys(product).includes("cell") && Object.keys(product).includes("facial");
};

export const isPumpController = (product: Product): product is PumpController => {
  return (
    Object.keys(product).includes("startingPressure") &&
    Object.keys(product).includes("maxPressure")
  );
};
