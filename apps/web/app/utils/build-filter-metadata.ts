import type { DataFromCollectionSlug } from "@synoem/payload/types";

import type {
  SolarPanelFilterMetadata,
  PumpControllerFilterMetadata,
} from "~/types/product-filter-metadata";

import type { ProductTypeId, ProductTypePluralSlug, ProductTypeToSlugMap } from "@synoem/config";
import {
  calculateSolarPanelArea,
  extractSolarPanelEfficiencyValues,
  extractSolarPanelPowerValues,
} from "./product-data-processing";

export function buildProductFilterMetadata<T extends ProductTypeId>(
  products: DataFromCollectionSlug<ProductTypeToSlugMap[T]>[],
  productTypeId: ProductTypeId,
): T extends "solar-panels" ? SolarPanelFilterMetadata : PumpControllerFilterMetadata {
  switch (productTypeId) {
    case "solar-panel":
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      return buildSolarPanelMetadata(products as DataFromCollectionSlug<"solar-panels">[]) as any;
    case "pump-controller":
      return buildPumpControllerMetadata(
        products as DataFromCollectionSlug<"pump-controllers">[],
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      ) as any;
    default:
      throw new Error(`Unsupported product type: ${productTypeId}`);
  }
}

function buildSolarPanelMetadata<T extends "solar-panels">(
  products: DataFromCollectionSlug<T>[],
): SolarPanelFilterMetadata {
  const powerValues = extractSolarPanelPowerValues(products);

  const powerRange = getRangeFromArray(powerValues);

  const efficiencyValues = extractSolarPanelEfficiencyValues(products);

  const efficiencyRange = getRangeFromArray(efficiencyValues);

  const glassTypes = [
    ...new Set(
      products
        .filter((p) => p.glassType && typeof p.glassType === "string")
        .map((p) => p.glassType)
        .filter((type) => type !== undefined),
    ),
  ];

  const dimensionsValues = products
    .map((p) => {
      const dimensions = p.dimensions;
      if (!dimensions) return null;

      const height = Number(dimensions.h);
      const width = Number(dimensions.w);

      if (Number.isNaN(height) || Number.isNaN(width)) return null;

      const unit = dimensions.unit || "mm";
      const { area } = calculateSolarPanelArea({
        h: height,
        w: width,
        unit,
      });

      return { height, width, area, unit };
    })
    .filter((dim) => dim !== null);

  // 计算尺寸范围（可选）
  const dimensionsRange =
    dimensionsValues.length > 0
      ? {
          minArea: Math.min(...dimensionsValues.map((d) => d.area)),
          maxArea: Math.max(...dimensionsValues.map((d) => d.area)),
          // 如果需要，也可以包含长度和宽度的范围
        }
      : { minArea: 0, maxArea: 0 };

  return {
    types: extractTypes(products),
    powerRange,
    efficiencyRange,
    glassTypes,
    dimensionsRange,
  };
}

function buildPumpControllerMetadata(
  products: DataFromCollectionSlug<"pump-controllers">[],
): PumpControllerFilterMetadata {
  // 提取电压范围
  const voltageRanges = products
    .map((p) => {
      const voltage = p.wideAmplitudeVoltage;
      if (!voltage || voltage.min === undefined || voltage.max === undefined) {
        return null;
      }
      const min = Number(voltage.min);
      const max = Number(voltage.max);
      return !Number.isNaN(min) && !Number.isNaN(max) ? { min, max } : null;
    })
    .filter((range): range is { min: number; max: number } => range !== null);

  // 计算电压的最小值和最大值
  const voltageRange = getRangeFromArray(voltageRanges);

  // 提取电流范围
  const maxCurrentValues = products
    .map((p) => {
      const current = Number(p.maxCurrent);
      return !Number.isNaN(current) ? current : null;
    })
    .filter((val): val is number => val !== null);

  // 计算电流的最小值和最大值
  const maxCurrentRange = getRangeFromArray(maxCurrentValues);

  // 提取功率范围
  const powerValues = products
    .map((p) => {
      const power = Number(p.maxPower);
      return !Number.isNaN(power) ? power : null;
    })
    .filter((val): val is number => val !== null);

  // 计算功率的最小值和最大值
  const powerRange = getRangeFromArray(powerValues);

  // 提取起始压力范围
  const startingPressureRanges = products
    .map((p) => {
      const pressure = p.startingPressureRange;
      if (!pressure || pressure.min === undefined || pressure.max === undefined) {
        return null;
      }
      const min = Number(pressure.min);
      const max = Number(pressure.max);
      return !Number.isNaN(min) && !Number.isNaN(max) ? { min, max } : null;
    })
    .filter((range): range is { min: number; max: number } => range !== null);

  // 计算起始压力的最小值和最大值
  const startingPressureRange =
    startingPressureRanges.length > 0
      ? getRangeFromArray(startingPressureRanges)
      : { min: 0, max: 0 };

  // 提取最大压力值
  const maxPressureValues = products
    .map((p) => {
      const pressure = Number(p.maxPressure);
      return !Number.isNaN(pressure) ? pressure : null;
    })
    .filter((val): val is number => val !== null);

  // 计算最大压力的最小值和最大值
  const maxPressureRange = getRangeFromArray(maxPressureValues);

  // 提取最大工作压力值
  const maxWorkingPressureValues = products
    .map((p) => {
      const pressure = Number(p.maxWorkingPressure);
      return !Number.isNaN(pressure) ? pressure : null;
    })
    .filter((val): val is number => val !== null);

  // 计算最大工作压力的最小值和最大值
  const maxWorkingPressureRange = getRangeFromArray(maxWorkingPressureValues);

  const temperatureRanges = products
    .map((p) => {
      const temp = p.tempRange;
      if (!temp || temp.min === undefined || temp.max === undefined) {
        return null;
      }
      const min = Number(temp.min);
      const max = Number(temp.max);
      return !Number.isNaN(min) && !Number.isNaN(max) ? { min, max } : null;
    })
    .filter((range): range is { min: number; max: number } => range !== null);

  const temperatureRange = getRangeFromArray(temperatureRanges);

  // 提取频率范围
  const frequencyRanges = products
    .map((p) => {
      const freq = p.frequencyRange;
      if (!freq || freq.min === undefined || freq.max === undefined) {
        return null;
      }
      const min = Number(freq.min);
      const max = Number(freq.max);
      return !Number.isNaN(min) && !Number.isNaN(max) ? { min, max } : null;
    })
    .filter((range): range is { min: number; max: number } => range !== null);

  const frequencyRange = getRangeFromArray(frequencyRanges);

  return {
    types: extractTypes(products),
    voltageRange,
    maxCurrentRange,
    powerRange,
    startingPressureRange,
    maxPressureRange,
    maxWorkingPressureRange,
    temperatureRange,
    frequencyRange,
    // protectionGrades,
    // threadInterfaces,
  };
}

function extractTypes<T extends ProductTypePluralSlug>(
  products: DataFromCollectionSlug<T>[],
): string[] {
  return [
    ...new Set(
      products
        .map((p) => (typeof p.productCategory === "object" ? p.productCategory.slug : null))
        .filter(Boolean) as string[],
    ),
  ];
}

function getRangeFromArray(numbers: number[]): { min: number; max: number };
function getRangeFromArray(numbers: { min: number; max: number }[]): { min: number; max: number };
function getRangeFromArray(numbers: number[] | { min: number; max: number }[]): {
  min: number;
  max: number;
} {
  if (numbers.length === 0) {
    return { min: 0, max: 0 };
  }

  if (numbers.some((item) => typeof item === "object" && "min" in item && "max" in item)) {
    return {
      min: Math.min(...numbers.map((item) => (item as { min: number; max: number }).min)),
      max: Math.max(...numbers.map((item) => (item as { min: number; max: number }).max)),
    };
  }

  return {
    min: Math.min(...numbers.map((item) => item as number)),
    max: Math.max(...numbers.map((item) => item as number)),
  };
}
