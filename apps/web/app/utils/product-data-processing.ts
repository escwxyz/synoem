import type { SolarPanel } from "@synoem/types";

export function extractSolarPanelPowerValues(solarPanels: SolarPanel[]): {
  min: number;
  max: number;
}[] {
  return solarPanels
    .map((p) => {
      const power = p.power;
      const { min, max } = power;
      return !Number.isNaN(min) && !Number.isNaN(max) ? { min, max } : null;
    })
    .filter((range): range is { min: number; max: number } => range !== null);
}

export function extractSolarPanelEfficiencyValues(solarPanels: SolarPanel[]): number[] {
  return solarPanels
    .filter((p) => p.power && Array.isArray(p.power.points))
    .flatMap((p) =>
      (p.power?.points || [])
        .map((point) => {
          const value = Number(point.efficiency);
          return Number.isNaN(value) ? null : value;
        })
        .filter((val): val is number => val !== null),
    );
}

export function calculateSolarPanelArea(dimensions: { h: number; w: number; unit: string }): {
  area: number;
  unit: string;
} {
  const unit = dimensions.unit || "mm";
  let area: number;

  switch (unit) {
    case "m":
      area = dimensions.h * dimensions.w;
      break;
    case "cm":
      area = (dimensions.h / 100) * (dimensions.w / 100);
      break;
    default: // mm
      area = (dimensions.h / 1000) * (dimensions.w / 1000);
      break;
  }

  return { area, unit };
}
