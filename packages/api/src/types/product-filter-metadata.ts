import type {
  SolarPanel,
  PumpController,
  SolarPanelsSelect,
  PumpControllersSelect,
} from "@synoem/payload/payload-types";
import type { ProductTypeId } from "@synoem/config";

export interface SolarPanelFilterMetadata {
  types: string[];
  powerRange: {
    min: number;
    max: number;
  };
  efficiencyRange: {
    min: number;
    max: number;
  };
  glassTypes: string[];
  dimensionsRange: {
    minArea: number;
    maxArea: number;
  };
}

export interface PumpControllerFilterMetadata {
  types: string[];
  voltageRange: {
    min: number;
    max: number;
  };
  maxCurrentRange: {
    min: number;
    max: number;
  };
  powerRange: {
    min: number;
    max: number;
  };
  startingPressureRange: {
    min: number;
    max: number;
  };
  maxPressureRange: {
    min: number;
    max: number;
  };
  maxWorkingPressureRange: {
    min: number;
    max: number;
  };
  temperatureRange: {
    min: number;
    max: number;
  };
  frequencyRange: {
    min: number;
    max: number;
  };
}

// 太阳能面板元数据所需字段
export const SOLAR_PANEL_FILTER_FIELDS = [
  "productCategory",
  "power", // 功率范围和功率点
  "dimensions", // 尺寸数据
  "glassType", // 玻璃类型
] as const satisfies readonly (keyof SolarPanel)[];

// 泵控制器元数据所需字段
export const PUMP_CONTROLLER_FILTER_FIELDS = [
  "productCategory",
  "wideAmplitudeVoltage", // 电压范围
  "maxCurrent", // 最大电流
  "maxPower", // 最大功率
  "startingPressureRange", // 起始压力范围
  "maxPressure", // 最大压力
  "maxWorkingPressure", // 最大工作压力
  "tempRange", // 温度范围
  "frequencyRange", // 频率范围
  "threadInterface", // 螺纹接口
] as const satisfies readonly (keyof PumpController)[];

type ProductTypeSelectObject = {
  [K in ProductTypeId]: K extends "solar-panel"
    ? SolarPanelsSelect<true>
    : K extends "pump-controller"
      ? PumpControllersSelect<true>
      : never;
};

export const PRODUCT_FILTER_METADATA_SELECT_OBJECT: ProductTypeSelectObject = {
  "solar-panel": createNestedSelectObject(SOLAR_PANEL_FILTER_FIELDS),
  "pump-controller": createNestedSelectObject(PUMP_CONTROLLER_FILTER_FIELDS),
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

export type SolarPanelFilterField = (typeof SOLAR_PANEL_FILTER_FIELDS)[number];
export type PumpControllerFilterField = (typeof PUMP_CONTROLLER_FILTER_FIELDS)[number];

export type ProductWithFilterMetadataFields<T extends ProductTypeId> = T extends "solar-panel"
  ? Pick<SolarPanel, SolarPanelFilterField>
  : T extends "pump-controller"
    ? Pick<PumpController, PumpControllerFilterField>
    : never;
