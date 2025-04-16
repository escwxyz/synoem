import type { SolarPanel } from "@synoem/payload/payload-types";

interface Props {
  powerPoints: SolarPanel["powerRange"]["points"];
}

export const getPowerRange = ({ powerPoints }: Props) => {
  if (!powerPoints) return null;

  const min = Math.min(...powerPoints.map((point) => point.pmax ?? 0));
  const max = Math.max(...powerPoints.map((point) => point.pmax ?? 0));

  return { min, max };
};
