import type { TextFieldValidation } from "payload";

const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

export const validateUrl: TextFieldValidation = (value) => {
  if (!value) return true;
  return urlRegex.test(value) ? true : "Invalid URL";
};
