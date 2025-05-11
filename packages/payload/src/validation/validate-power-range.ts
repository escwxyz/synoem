import type { Validate, GroupField } from "payload";

export const validatePowerRange: Validate<
  unknown,
  unknown,
  unknown,
  GroupField
> = (value, { data, siblingData }) => {
  if (!value || typeof value !== "object") {
    return "Invalid power range data";
  }

  const { min, max, step } = value as {
    min?: number;
    max?: number;
    step?: number;
  };

  if (min === undefined || max === undefined || step === undefined) {
    return "Min power, max power and step are required";
  }

  if (
    min < 0 ||
    max < 0 ||
    step < 0 ||
    min % 5 !== 0 ||
    max % 5 !== 0 ||
    step % 5 !== 0
  ) {
    return "Min power, max power and step must be positive and a multiple of 5";
  }

  if (min >= max) {
    return "Min power must be less than max power";
  }

  if ((max - min) % step !== 0) {
    return "The difference between max and min power must be divisible by step";
  }

  if (max > 800) {
    return "Max power cannot exceed 800W with current technology";
  }

  if (min < 200) {
    return "Min power cannot be less than 200W for commercial panels";
  }

  if (step > 10) {
    return "Step cannot be larger than 10W";
  }

  const pointsCount = Math.floor((max - min) / step) + 1;
  if (pointsCount > 20) {
    return "Too many power points. Please adjust the range or increase the step";
  }

  return true;
};
