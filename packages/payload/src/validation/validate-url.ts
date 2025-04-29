import type { TextFieldValidation } from "payload";

export const absoluteUrlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
export const relativeUrlRegex =
  /^\/([a-zA-Z0-9_-]+)(\/[a-zA-Z0-9_-]+)*\/?(\?[a-zA-Z0-9_&=.-]+)?(#[a-zA-Z0-9_-]+)?$/;

export const validateRelativeLink: TextFieldValidation = (value, { siblingData }) => {
  if (!value) {
    // @ts-expect-error
    if (siblingData?.type === "relative") {
      return "Relative link is required";
    }
    return true;
  }

  if (!value?.startsWith("/")) {
    return "Relative link must start with a slash";
  }

  return relativeUrlRegex.test(value) ? true : "Invalid URL";
};

export const validateExternalLink: TextFieldValidation = (value, { siblingData }) => {
  if (!value) {
    // @ts-expect-error
    if (siblingData?.type === "external") {
      return "External link is required";
    }
    return true;
  }

  return absoluteUrlRegex.test(value) ? true : "Invalid URL";
};
