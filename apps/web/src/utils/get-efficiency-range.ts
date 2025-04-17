import type { SolarPanel } from "@synoem/payload/payload-types";

export const getEfficiencyRange = (powerPoints: SolarPanel["powerRange"]["points"]) => {
  if (!powerPoints) return null;

  const min = Math.min(...powerPoints.map((point) => point.efficiency ?? 0));
  const max = Math.max(...powerPoints.map((point) => point.efficiency ?? 0));

  return { min, max };
};
