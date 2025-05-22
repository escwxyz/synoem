import { PRODUCT_TYPES, type ProductTypeId } from "@synoem/config";
import {
  parseAsArrayOf,
  parseAsFloat,
  parseAsStringLiteral,
  type UseQueryStatesKeysMap,
} from "nuqs";

import type {
  PumpControllerFilterMetadata,
  SolarPanelFilterMetadata,
} from "~/types/product-filter-metadata";

export type SolarPanelFilterValues = {
  types: string[];
  powerMin: number;
  powerMax: number;
  efficiencyMin: number;
  efficiencyMax: number;
  glassTypes: string[];
  dimensionsMin: number;
  dimensionsMax: number;
};

export type PumpControllerFilterValues = {
  types: string[];
  voltageMin: number;
  voltageMax: number;
  maxCurrentMin: number;
  maxCurrentMax: number;
  powerMin: number;
  powerMax: number;
  startingPressureMin: number;
  startingPressureMax: number;
  maxPressureMin: number;
  maxPressureMax: number;
  maxWorkingPressureMin: number;
  maxWorkingPressureMax: number;
  temperatureMin: number;
  temperatureMax: number;
  frequencyMin: number;
  frequencyMax: number;
};

export type SolarPanelNuqsFilterValues = UseQueryStatesKeysMap<SolarPanelFilterValues>;

export type PumpControllerNuqsFilterValues = UseQueryStatesKeysMap<PumpControllerFilterValues>;

export const createFilterSchema = <T extends ProductTypeId>(
  initialMetadata: SolarPanelFilterMetadata | PumpControllerFilterMetadata,
  productTypeId: T,
  // disableTypes = false,
): SolarPanelNuqsFilterValues | PumpControllerNuqsFilterValues => {
  if (productTypeId === "solar-panel") {
    const values = convertMetadataToValues(
      initialMetadata as SolarPanelFilterMetadata,
      "solar-panel",
    );

    return {
      types: parseAsArrayOf(
        parseAsStringLiteral(PRODUCT_TYPES["solar-panel"].categories.map((c) => c.value)),
      ).withDefault(values.types),
      powerMin: parseAsFloat.withDefault(values.powerMin),
      powerMax: parseAsFloat.withDefault(values.powerMax),
      efficiencyMin: parseAsFloat.withDefault(values.efficiencyMin),
      efficiencyMax: parseAsFloat.withDefault(values.efficiencyMax),
      glassTypes: parseAsArrayOf(parseAsStringLiteral(["monofacial", "bifacial"])).withDefault(
        values.glassTypes,
      ),
      dimensionsMin: parseAsFloat.withDefault(values.dimensionsMin),
      dimensionsMax: parseAsFloat.withDefault(values.dimensionsMax),
    };
  }

  if (productTypeId === "pump-controller") {
    const values = convertMetadataToValues(
      initialMetadata as PumpControllerFilterMetadata,
      "pump-controller",
    );

    return {
      types: parseAsArrayOf(
        parseAsStringLiteral(PRODUCT_TYPES["pump-controller"].categories.map((c) => c.value)),
      ).withDefault(values.types),
      voltageMin: parseAsFloat.withDefault(values.voltageMin),
      voltageMax: parseAsFloat.withDefault(values.voltageMax),
      maxCurrentMin: parseAsFloat.withDefault(values.maxCurrentMin),
      maxCurrentMax: parseAsFloat.withDefault(values.maxCurrentMax),
      powerMin: parseAsFloat.withDefault(values.powerMin),
      powerMax: parseAsFloat.withDefault(values.powerMax),
      startingPressureMin: parseAsFloat.withDefault(values.startingPressureMin),
      startingPressureMax: parseAsFloat.withDefault(values.startingPressureMax),
      maxPressureMin: parseAsFloat.withDefault(values.maxPressureMin),
      maxPressureMax: parseAsFloat.withDefault(values.maxPressureMax),
      maxWorkingPressureMin: parseAsFloat.withDefault(values.maxWorkingPressureMin),
      maxWorkingPressureMax: parseAsFloat.withDefault(values.maxWorkingPressureMax),
      temperatureMin: parseAsFloat.withDefault(values.temperatureMin),
      temperatureMax: parseAsFloat.withDefault(values.temperatureMax),
      frequencyMin: parseAsFloat.withDefault(values.frequencyMin),
      frequencyMax: parseAsFloat.withDefault(values.frequencyMax),
    };
  }

  throw new Error(`Unsupported product type: ${productTypeId}`);
};

export function convertMetadataToValues<T extends ProductTypeId>(
  initialMetadata: SolarPanelFilterMetadata | PumpControllerFilterMetadata,
  productTypeId: T,
): T extends "solar-panel" ? SolarPanelFilterValues : PumpControllerFilterValues {
  if (productTypeId === "solar-panel") {
    const metadata = initialMetadata as SolarPanelFilterMetadata;
    return {
      types: metadata.types,
      powerMin: metadata.powerRange.min,
      powerMax: metadata.powerRange.max,
      efficiencyMin: metadata.efficiencyRange.min,
      efficiencyMax: metadata.efficiencyRange.max,
      glassTypes: metadata.glassTypes,
      dimensionsMin: metadata.dimensionsRange.minArea,
      dimensionsMax: metadata.dimensionsRange.maxArea,
    } as T extends "solar-panel" ? SolarPanelFilterValues : PumpControllerFilterValues; // 临时使用any
  }

  if (productTypeId === "pump-controller") {
    const metadata = initialMetadata as PumpControllerFilterMetadata;
    return {
      types: metadata.types,
      voltageMin: metadata.voltageRange.min,
      voltageMax: metadata.voltageRange.max,
      maxCurrentMin: metadata.maxCurrentRange.min,
      maxCurrentMax: metadata.maxCurrentRange.max,
      powerMin: metadata.powerRange.min,
      powerMax: metadata.powerRange.max,
      startingPressureMin: metadata.startingPressureRange.min,
      startingPressureMax: metadata.startingPressureRange.max,
      maxPressureMin: metadata.maxPressureRange.min,
      maxPressureMax: metadata.maxPressureRange.max,
      maxWorkingPressureMin: metadata.maxWorkingPressureRange.min,
      maxWorkingPressureMax: metadata.maxWorkingPressureRange.max,
      temperatureMin: metadata.temperatureRange.min,
      temperatureMax: metadata.temperatureRange.max,
      frequencyMin: metadata.frequencyRange.min,
      frequencyMax: metadata.frequencyRange.max,
    } as T extends "solar-panel" ? SolarPanelFilterValues : PumpControllerFilterValues; // 临时使用any
  }

  throw new Error(`Unsupported product type: ${productTypeId}`);
}

// export function convertMetadataToValues(
//   initialMetadata: SolarPanelFilterMetadata,
//   productTypeId: "solar-panel",
// ): SolarPanelFilterValues;
// export function convertMetadataToValues(
//   initialMetadata: PumpControllerFilterMetadata,
//   productTypeId: "pump-controller",
// ): PumpControllerFilterValues;
// export function convertMetadataToValues(
//   initialMetadata: SolarPanelFilterMetadata | PumpControllerFilterMetadata,
//   productTypeId: ProductTypeId,
// ): SolarPanelFilterValues | PumpControllerFilterValues {
//   if (productTypeId === "solar-panel") {
//     const metadata = initialMetadata as SolarPanelFilterMetadata;
//     return {
//       types: metadata.types,
//       powerMin: metadata.powerRange.min,
//       powerMax: metadata.powerRange.max,
//       efficiencyMin: metadata.efficiencyRange.min,
//       efficiencyMax: metadata.efficiencyRange.max,
//       glassTypes: metadata.glassTypes,
//       dimensionsMin: metadata.dimensionsRange.minArea,
//       dimensionsMax: metadata.dimensionsRange.maxArea,
//     };
//   }

//   if (productTypeId === "pump-controller") {
//     const metadata = initialMetadata as PumpControllerFilterMetadata;
//     return {
//       types: metadata.types,
//       voltageMin: metadata.voltageRange.min,
//       voltageMax: metadata.voltageRange.max,
//       maxCurrentMin: metadata.maxCurrentRange.min,
//       maxCurrentMax: metadata.maxCurrentRange.max,
//       powerMin: metadata.powerRange.min,
//       powerMax: metadata.powerRange.max,
//       startingPressureMin: metadata.startingPressureRange.min,
//       startingPressureMax: metadata.startingPressureRange.max,
//       maxPressureMin: metadata.maxPressureRange.min,
//       maxPressureMax: metadata.maxPressureRange.max,
//       maxWorkingPressureMin: metadata.maxWorkingPressureRange.min,
//       maxWorkingPressureMax: metadata.maxWorkingPressureRange.max,
//       temperatureMin: metadata.temperatureRange.min,
//       temperatureMax: metadata.temperatureRange.max,
//       frequencyMin: metadata.frequencyRange.min,
//       frequencyMax: metadata.frequencyRange.max,
//     };
//   }

//   throw new Error(`Unsupported product type: ${productTypeId}`);
// }
