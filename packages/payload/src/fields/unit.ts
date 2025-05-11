import type { GroupField, SelectField } from "payload";
import {
  lengthUnits,
  quantityUnits,
  type QuantityUnit,
  type WeightUnit,
  weightUnits,
  type LengthUnit,
  type UnitType,
  type UnitOption,
  durationUnits,
  type DurationUnit,
} from "@synoem/config";

type UnitSelectField<T extends UnitType> = {
  type: "select";
  name: string;
  hasMany: false;
  options: Array<UnitOption<T>>;
};

export const createUnitField = <T extends UnitType>(
  name: string,
  label: string,
  units: Array<UnitOption<T>>,
  options: Partial<Omit<SelectField, "options" | "type" | "name" | "hasMany">> = {},
): UnitSelectField<T> => ({
  name,
  type: "select",
  label,
  hasMany: false,
  options: units,
  ...options,
});

export const createLengthGroup = (
  name: string,
  label: string,
  overrides: Partial<GroupField> = {},
): GroupField => ({
  name,
  type: "group",
  label,
  fields: [
    {
      name: "value",
      type: "number",
      label: "Value",
      min: 0,
    },
    createUnitField<LengthUnit>("unit", "Unit", lengthUnits),
  ],
  ...overrides,
});

export const createWeightGroup = (
  name?: string,
  label?: string,
  overrides: Partial<GroupField> = {},
): GroupField => ({
  name: name || "weight",
  type: "group",
  label: label || "Weight",
  fields: [
    {
      name: "value",
      type: "number",
      label: "Value",
      min: 0,
    },
    createUnitField<WeightUnit>("unit", "Unit", weightUnits),
  ],
  ...overrides,
});

export const createQuantityGroup = (
  name?: string,
  label?: string,
  overrides: Partial<GroupField> = {},
): GroupField => ({
  name: name || "quantity",
  type: "group",
  label: label || "Quantity",
  fields: [
    {
      name: "value",
      type: "number",
      label: "Value",
      min: 0,
    },
    createUnitField<QuantityUnit>("unit", "Unit", quantityUnits),
  ],
  ...overrides,
});

export const createDurationGroup = (
  name: string,
  label: string,
  overrides: Partial<GroupField> = {},
): GroupField => ({
  name,
  type: "group",
  label,
  fields: [
    {
      name: "value",
      type: "number",
      label: "Value",
      min: 0,
    },
    createUnitField<DurationUnit>("unit", "Unit", durationUnits),
  ],
  ...overrides,
});
