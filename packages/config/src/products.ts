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

// TODO: make it more flexible
export const PRODUCT_CATEGORIES = {
  pumpController: "Pump Controller",
  solarPanel: "Solar Panel",
} as const;

export type ProductCategory =
  (typeof PRODUCT_CATEGORIES)[keyof typeof PRODUCT_CATEGORIES];
