import type { SolarPanel } from "@synoem/types";

export const getEfficiencyRange = (powerPoints: SolarPanel["power"]["points"]) => {
  if (!powerPoints) return null;

  const min = Math.min(...powerPoints.map((point) => point.efficiency ?? 0));
  const max = Math.max(...powerPoints.map((point) => point.efficiency ?? 0));

  return { min, max };
};
