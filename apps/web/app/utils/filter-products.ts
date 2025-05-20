import type {
  SolarPanelFilterValues,
  PumpControllerFilterValues,
} from "~/utils/product-filters-nuqs-state";
import { PRODUCTS_PER_PAGE, type ProductTypeId, type ProductTypeToSlugMap } from "@synoem/config";
import type { DataFromCollectionSlug } from "@synoem/payload/types";
import type { PaginatedDocs } from "@synoem/payload/types";
import { generatePagination } from "./generate-pagination";
import { calculateSolarPanelArea } from "./product-data-processing";

const isInRange = (
  value: number | undefined,
  min: number | undefined,
  max: number | undefined,
): boolean => {
  if (value === undefined) return false;
  if (min !== undefined && value < min) return false;
  if (max !== undefined && value > max) return false;
  return true;
};

const checkObjectRange = (
  obj: { min?: number; max?: number } | undefined,
  minFilter: number | undefined,
  maxFilter: number | undefined,
): boolean => {
  if (!obj) return false;

  if (obj.min !== undefined && obj.max !== undefined) {
    const objMin = Number(obj.min);
    const objMax = Number(obj.max);

    if (maxFilter !== undefined && objMin > maxFilter) return false;
    if (minFilter !== undefined && objMax < minFilter) return false;

    return true;
  }
  return false;
};

const filterSolarPanelProducts = (
  products: DataFromCollectionSlug<"solar-panels">[],
  filters: SolarPanelFilterValues,
): DataFromCollectionSlug<"solar-panels">[] => {
  return products.filter((product) => {
    if (filters.types && filters.types.length > 0) {
      const productCategory =
        typeof product.productCategory === "object" ? product.productCategory?.slug : null;
      if (!productCategory || !filters.types.includes(productCategory)) {
        return false;
      }
    }

    if (!checkObjectRange(product.power, filters.powerMin, filters.powerMax)) {
      return false;
    }

    if (Array.isArray(product.power.points) && product.power.points.length > 0) {
      return product.power.points.some((point) => {
        if (typeof point === "object" && "efficiency" in point) {
          const efficiency = Number(point.efficiency);
          return (
            !Number.isNaN(efficiency) &&
            isInRange(efficiency, filters.efficiencyMin, filters.efficiencyMax)
          );
        }
        return false;
      });
    }

    // 玻璃类型过滤
    if (filters.glassTypes && filters.glassTypes.length > 0) {
      if (!product.glassType || !filters.glassTypes.includes(product.glassType)) {
        return false;
      }
    }

    // Dimensions
    if (filters.dimensionsMin && filters.dimensionsMax) {
      const { dimensions } = product;

      if (!dimensions || !dimensions.h || !dimensions.w || !dimensions.unit) return false;

      const { area } = calculateSolarPanelArea({
        h: dimensions.h,
        w: dimensions.w,
        unit: dimensions.unit,
      });

      if (!isInRange(area, filters.dimensionsMin, filters.dimensionsMax)) {
        return false;
      }
    }

    return true;
  });
};

/**
 * 过滤水泵控制器产品
 */
const filterPumpControllerProducts = (
  products: DataFromCollectionSlug<"pump-controllers">[],
  filters: PumpControllerFilterValues,
): DataFromCollectionSlug<"pump-controllers">[] => {
  return products.filter((product) => {
    // 类型过滤
    if (filters.types && filters.types.length > 0) {
      const productCategory =
        typeof product.productCategory === "object" ? product.productCategory?.slug : null;
      if (!productCategory || !filters.types.includes(productCategory)) {
        return false;
      }
    }

    // 电压范围过滤
    if (!checkObjectRange(product.wideAmplitudeVoltage, filters.voltageMin, filters.voltageMax)) {
      return false;
    }

    // 电流范围过滤
    if (!isInRange(product.maxCurrent, filters.maxCurrentMin, filters.maxCurrentMax)) {
      return false;
    }

    // 功率范围过滤
    if (!isInRange(product.maxPower, filters.powerMin, filters.powerMax)) {
      return false;
    }

    // 起始压力范围过滤
    if (
      !checkObjectRange(
        product.startingPressureRange,
        filters.startingPressureMin,
        filters.startingPressureMax,
      )
    ) {
      return false;
    }

    // 最大压力范围过滤
    if (!isInRange(product.maxPressure, filters.maxPressureMin, filters.maxPressureMax)) {
      return false;
    }

    // 最大工作压力范围过滤
    if (
      !isInRange(
        product.maxWorkingPressure,
        filters.maxWorkingPressureMin,
        filters.maxWorkingPressureMax,
      )
    ) {
      return false;
    }

    // 温度范围过滤
    if (!checkObjectRange(product.tempRange, filters.temperatureMin, filters.temperatureMax)) {
      return false;
    }

    // 频率范围过滤
    if (!checkObjectRange(product.frequencyRange, filters.frequencyMin, filters.frequencyMax)) {
      return false;
    }

    return true;
  });
};

/**
 * 通用产品过滤函数
 */
export function filterProducts<T extends ProductTypeId>(
  products: DataFromCollectionSlug<ProductTypeToSlugMap[T]>[],
  filters: T extends "solar-panel" ? SolarPanelFilterValues : PumpControllerFilterValues,
  productTypeId: T,
  page = 1,
): PaginatedDocs<DataFromCollectionSlug<ProductTypeToSlugMap[T]>> {
  // 根据产品类型进行过滤
  let filteredProducts: DataFromCollectionSlug<ProductTypeToSlugMap[T]>[] = [];

  console.log("filtering products with filters", filters);

  if (productTypeId === "solar-panel") {
    filteredProducts = filterSolarPanelProducts(
      products as DataFromCollectionSlug<"solar-panels">[],
      filters as SolarPanelFilterValues,
    ) as DataFromCollectionSlug<ProductTypeToSlugMap[T]>[];
  } else if (productTypeId === "pump-controller") {
    filteredProducts = filterPumpControllerProducts(
      products as DataFromCollectionSlug<"pump-controllers">[],
      filters as PumpControllerFilterValues,
    ) as DataFromCollectionSlug<ProductTypeToSlugMap[T]>[];
  }

  const pagination = generatePagination(filteredProducts, page);

  return {
    docs: pagination.items,
    totalDocs: pagination.totalItems,
    limit: PRODUCTS_PER_PAGE,
    totalPages: pagination.totalPages,
    page: pagination.currentPage,
    pagingCounter: (pagination.currentPage - 1) * PRODUCTS_PER_PAGE + 1,
    hasPrevPage: pagination.hasPrevPage,
    hasNextPage: pagination.hasNextPage,
    prevPage: pagination.prevPage,
    nextPage: pagination.nextPage,
  };
}
