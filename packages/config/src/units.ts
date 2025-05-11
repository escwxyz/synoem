export type LengthUnit = "mm" | "cm" | "m";
export type WeightUnit = "g" | "kg";
export type QuantityUnit = "pcs" | "sets" | "plts" | "ctns";
export type DurationUnit = "days" | "weeks" | "months" | "years";

export type UnitType = LengthUnit | WeightUnit | QuantityUnit | DurationUnit;

export type UnitOption<T extends UnitType> = {
  label: string;
  value: T;
};

export const lengthUnits: Array<UnitOption<LengthUnit>> = [
  { label: "Millimeters", value: "mm" },
  { label: "Centimeters", value: "cm" },
  { label: "Meters", value: "m" },
];

export const weightUnits: Array<UnitOption<WeightUnit>> = [
  { label: "Grams", value: "g" },
  { label: "Kilograms", value: "kg" },
];

export const quantityUnits: Array<UnitOption<QuantityUnit>> = [
  { label: "Pieces", value: "pcs" },
  { label: "Sets", value: "sets" },
  { label: "Pallets", value: "plts" },
  { label: "Containers", value: "ctns" },
];

export const durationUnits: Array<UnitOption<DurationUnit>> = [
  { label: "Days", value: "days" },
  { label: "Weeks", value: "weeks" },
  { label: "Months", value: "months" },
  { label: "Years", value: "years" },
];
