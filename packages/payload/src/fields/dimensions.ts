import type { GroupField } from "payload";
import { lengthUnits, type LengthUnit } from "@synoem/config";
import { createUnitField } from "./unit";

export const createDimensionsGroup = (
  overrides?: Partial<GroupField>,
): GroupField => ({
  name: "dimensions",
  type: "group",
  label: "Dimensions",
  fields: [
    {
      name: "h",
      type: "number",
      label: "Height",
      min: 0,
    },
    {
      name: "w",
      type: "number",
      label: "Width",
      min: 0,
    },
    {
      name: "d",
      type: "number",
      label: "Depth",
      min: 0,
    },
    createUnitField<LengthUnit>("unit", "Unit", lengthUnits),
  ],
  ...overrides,
});
