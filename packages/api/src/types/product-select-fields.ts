import type { ProductTypeId } from "@synoem/config";
import type {
  SolarPanel,
  PumpController,
  SolarPanelsSelect,
  PumpControllersSelect,
} from "@synoem/types";

export const PRODUCT_BASE_FIELDS = [] as const satisfies readonly (
  | keyof SolarPanel
  | keyof PumpController
)[];

export const SOLAR_PANEL_SELECT_FIELDS = [
  "modelName",
  "productCategory",
  "coverImage",
  "title",
  "slug",
  "three",
  "excerpt",
  "variants",
  "power",
  "glassType",
] satisfies readonly (keyof SolarPanel)[];

export const PUMP_CONTROLLER_SELECT_FIELDS = [
  "modelName",
  "productCategory",
  "coverImage",
  "title",
  "slug",
  "three",
  "excerpt",
  "variants",
  "wideAmplitudeVoltage",
  "maxCurrent",
  "maxPower",
] as const satisfies readonly (keyof PumpController)[];

export const createProductSelectObject = <T extends ProductTypeId>(productTypeId: T) => {
  const baseSelectObject = PRODUCT_BASE_FIELDS.reduce(
    (obj, field) => {
      obj[field] = true;
      return obj;
    },
    {} as Record<string, boolean | Record<string, boolean | Record<string, boolean>>>,
  );

  if (productTypeId === "solar-panel") {
    for (const field of SOLAR_PANEL_SELECT_FIELDS) {
      baseSelectObject[field] = true;
    }
  }

  if (productTypeId === "pump-controller") {
    for (const field of PUMP_CONTROLLER_SELECT_FIELDS) {
      baseSelectObject[field] = true;
    }
  }

  baseSelectObject.variants = {
    sku: true,
    options: {
      label: true,
    },
  };

  return baseSelectObject;
};

type ProductSelectObject = {
  [K in ProductTypeId]: K extends "solar-panel"
    ? SolarPanelsSelect<true>
    : K extends "pump-controller"
      ? PumpControllersSelect<true>
      : never;
};

export const PRODUCT_SELECT_OBJECT: ProductSelectObject = {
  "solar-panel": createNestedSelectObject(SOLAR_PANEL_SELECT_FIELDS),
  "pump-controller": createNestedSelectObject(PUMP_CONTROLLER_SELECT_FIELDS),
};

function createNestedSelectObject<T extends readonly string[]>(
  fields: T,
): SolarPanelsSelect<true> | PumpControllersSelect<true> {
  const result = fields.reduce(
    (obj, field) => {
      obj[field] = true;
      return obj;
    },
    {} as Record<string, true>,
  );

  return result;
}

export type SolarPanelSpecsSelectField = (typeof SOLAR_PANEL_SELECT_FIELDS)[number];
export type PumpControllerSpecsSelectField = (typeof PUMP_CONTROLLER_SELECT_FIELDS)[number];

export type ProductWithSelectFields<T extends ProductTypeId> = T extends "solar-panel"
  ? Pick<SolarPanel, SolarPanelSpecsSelectField>
  : T extends "pump-controller"
    ? Pick<PumpController, PumpControllerSpecsSelectField>
    : never;
