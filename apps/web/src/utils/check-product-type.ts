import type { SolarPanel, PumpController } from "@synoem/payload/payload-types";

export const isSolarPanel = (
  product: SolarPanel | PumpController,
): product is SolarPanel => {
  return (
    Object.keys(product).includes("cell") &&
    Object.keys(product).includes("facial")
  );
};

export const isPumpController = (
  product: SolarPanel | PumpController,
): product is PumpController => {
  return (
    Object.keys(product).includes("startingPressure") &&
    Object.keys(product).includes("maxPressure")
  );
};
