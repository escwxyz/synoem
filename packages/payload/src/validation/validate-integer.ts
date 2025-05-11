import type { NumberFieldValidation } from "payload";

export const validateInteger: NumberFieldValidation = (value, _options) => {
  if (typeof value !== "number") {
    return "This field must be a number";
  }

  if (!Number.isInteger(value)) {
    return "This field must be an integer";
  }

  return true;
};
